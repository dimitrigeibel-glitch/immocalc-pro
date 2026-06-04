import { useReducer, useCallback } from 'react';
import * as GmailService from '@services/GmailService';
import * as ClaudeService from '@services/ClaudeService';
import * as SpeechService from '@services/SpeechService';

export const VOICE_STATE = {
  IDLE: 'IDLE',
  LISTENING: 'LISTENING',
  LOADING: 'LOADING',
  ANNOUNCING: 'ANNOUNCING',
  CONFIRMING: 'CONFIRMING',
  SUMMARIZING: 'SUMMARIZING',
  READING: 'READING',
  REPLY_PROMPT: 'REPLY_PROMPT',
  RECORDING: 'RECORDING',
  CLEANING: 'CLEANING',
  REVIEW: 'REVIEW',
  SENDING: 'SENDING',
  DONE: 'DONE',
  ERROR: 'ERROR',
};

const INITIAL = {
  voiceState: VOICE_STATE.IDLE,
  emails: [],
  currentIndex: 0,
  currentSummary: null,
  pendingReply: null,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_STATE':
      return { ...state, voiceState: action.state, error: null };
    case 'SET_EMAILS':
      return { ...state, emails: action.emails, currentIndex: 0 };
    case 'SET_INDEX':
      return { ...state, currentIndex: action.index };
    case 'SET_SUMMARY':
      return { ...state, currentSummary: action.summary };
    case 'SET_REPLY':
      return { ...state, pendingReply: action.reply };
    case 'SET_ERROR':
      return { ...state, voiceState: VOICE_STATE.ERROR, error: action.error };
    case 'RESET':
      return INITIAL;
    default:
      return state;
  }
}

export function useVoiceFlow(accessToken) {
  const [state, dispatch] = useReducer(reducer, INITIAL);

  const setState = (s) => dispatch({ type: 'SET_STATE', state: s });

  const startFlow = useCallback(async () => {
    if (!accessToken) {
      await SpeechService.speak('Bitte zuerst mit Google anmelden.');
      return;
    }

    try {
      setState(VOICE_STATE.LISTENING);
      await SpeechService.speak('Welche Mails möchtest du hören?');
      const transcript = await SpeechService.listenOnce('de-AT', 10000);
      const { intent, filters } = SpeechService.parseVoiceCommand(transcript);

      if (intent !== 'FILTER' && intent !== 'CONFIRM') {
        await SpeechService.speak(
          'Das habe ich nicht verstanden. Sag zum Beispiel: Mails von heute.'
        );
        setState(VOICE_STATE.IDLE);
        return;
      }

      setState(VOICE_STATE.LOADING);
      await SpeechService.speak('Einen Moment, ich lade deine Mails…');
      const emails = await GmailService.fetchEmails(accessToken, filters ?? {});
      dispatch({ type: 'SET_EMAILS', emails });

      if (!emails.length) {
        await SpeechService.speak('Ich habe keine passenden Mails gefunden.');
        setState(VOICE_STATE.IDLE);
        return;
      }

      const count = emails.length;
      await SpeechService.speak(
        `Ich habe ${count} Mail${count > 1 ? 's' : ''} gefunden.`
      );

      await iterateEmails(emails, 0, accessToken, dispatch, setState);
    } catch (err) {
      const msg = err.message === 'TIMEOUT' ? 'Zeitüberschreitung.' : err.message;
      dispatch({ type: 'SET_ERROR', error: msg });
      await SpeechService.speak('Es ist ein Fehler aufgetreten. Bitte erneut versuchen.').catch(
        () => {}
      );
    }
  }, [accessToken]);

  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return { state, startFlow, reset };
}

async function iterateEmails(emails, index, accessToken, dispatch, setState) {
  if (index >= emails.length) {
    await SpeechService.speak('Das waren alle Mails. Auf Wiederhören!');
    setState(VOICE_STATE.DONE);
    return;
  }

  const email = emails[index];
  dispatch({ type: 'SET_INDEX', index });
  setState(VOICE_STATE.ANNOUNCING);

  const sender = GmailService.extractSenderName(email.from);
  await SpeechService.speak(`Von ${sender}, Betreff: ${email.subject}. Vorlesen?`);

  setState(VOICE_STATE.CONFIRMING);

  let response, command;
  try {
    response = await SpeechService.listenOnce('de-AT', 7000);
    command = SpeechService.parseVoiceCommand(response);
  } catch {
    await SpeechService.speak('Ich habe dich nicht verstanden. Weiter zur nächsten Mail.');
    await iterateEmails(emails, index + 1, accessToken, dispatch, setState);
    return;
  }

  if (command.intent === 'CONFIRM') {
    await handleReadEmail(emails, index, email, accessToken, dispatch, setState);
  } else if (command.intent === 'NEXT') {
    await iterateEmails(emails, index + 1, accessToken, dispatch, setState);
  } else if (command.intent === 'STOP') {
    await SpeechService.speak('Okay, ich beende. Auf Wiederhören!');
    setState(VOICE_STATE.DONE);
  } else {
    await SpeechService.speak('Vorlesen, weiter, oder fertig?');
    await iterateEmails(emails, index, accessToken, dispatch, setState);
  }
}

async function handleReadEmail(emails, index, email, accessToken, dispatch, setState) {
  setState(VOICE_STATE.SUMMARIZING);
  await SpeechService.speak('Ich fasse zusammen…');

  const summary = await ClaudeService.summarizeEmail(email.body, email.from, email.subject);
  dispatch({ type: 'SET_SUMMARY', summary });

  setState(VOICE_STATE.READING);
  await SpeechService.speak(summary);
  await SpeechService.speak('Vollständig vorlesen, antworten, oder weiter?');

  setState(VOICE_STATE.CONFIRMING);

  let action, command;
  try {
    action = await SpeechService.listenOnce('de-AT', 7000);
    command = SpeechService.parseVoiceCommand(action);
  } catch {
    await iterateEmails(emails, index + 1, accessToken, dispatch, setState);
    return;
  }

  if (command.intent === 'READ_FULL') {
    setState(VOICE_STATE.READING);
    await SpeechService.speak(email.body);
    await SpeechService.speak('Antworten oder weiter?');
    setState(VOICE_STATE.CONFIRMING);
    try {
      const next = await SpeechService.listenOnce('de-AT', 7000);
      const nextCmd = SpeechService.parseVoiceCommand(next);
      if (nextCmd.intent === 'REPLY') {
        await handleReply(emails, index, email, accessToken, dispatch, setState);
        return;
      }
    } catch {}
    await iterateEmails(emails, index + 1, accessToken, dispatch, setState);
  } else if (command.intent === 'REPLY') {
    await handleReply(emails, index, email, accessToken, dispatch, setState);
  } else {
    await iterateEmails(emails, index + 1, accessToken, dispatch, setState);
  }
}

async function handleReply(emails, index, email, accessToken, dispatch, setState) {
  setState(VOICE_STATE.REPLY_PROMPT);
  await SpeechService.speak('Okay, ich nehme deine Antwort auf. Bitte sprich jetzt.');

  setState(VOICE_STATE.RECORDING);
  let rawDictation;
  try {
    rawDictation = await SpeechService.listenOnce('de-AT', 30000);
  } catch {
    await SpeechService.speak('Aufnahme fehlgeschlagen. Ich überspringe diese Mail.');
    await iterateEmails(emails, index + 1, accessToken, dispatch, setState);
    return;
  }

  setState(VOICE_STATE.CLEANING);
  await SpeechService.speak('Ich verbessere deine Antwort…');
  const cleanReply = await ClaudeService.cleanupDictation(rawDictation);
  dispatch({ type: 'SET_REPLY', reply: cleanReply });

  setState(VOICE_STATE.REVIEW);
  await SpeechService.speak('So klingt deine Antwort:');
  await SpeechService.speak(cleanReply);
  await SpeechService.speak('Absenden?');

  setState(VOICE_STATE.CONFIRMING);
  let confirm, confirmCmd;
  try {
    confirm = await SpeechService.listenOnce('de-AT', 7000);
    confirmCmd = SpeechService.parseVoiceCommand(confirm);
  } catch {
    await SpeechService.speak('Antwort verworfen.');
    await iterateEmails(emails, index + 1, accessToken, dispatch, setState);
    return;
  }

  if (confirmCmd.intent === 'SEND' || confirmCmd.intent === 'CONFIRM') {
    setState(VOICE_STATE.SENDING);
    await GmailService.sendReply(accessToken, {
      threadId: email.threadId,
      to: email.from,
      subject: email.subject,
      body: cleanReply,
    });
    await SpeechService.speak('Antwort wurde gesendet.');
  } else {
    await SpeechService.speak('Antwort verworfen.');
  }

  await iterateEmails(emails, index + 1, accessToken, dispatch, setState);
}
