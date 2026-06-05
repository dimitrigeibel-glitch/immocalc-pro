import { useReducer, useCallback, useRef } from 'react';
import * as GmailService from '@services/GmailService';
import * as ClaudeService from '@services/ClaudeService';
import * as SpeechService from '@services/SpeechService';
import * as Haptics from '@services/HapticsService';
import { getValidToken } from '@services/TokenService';

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
  emailCount: 0,
  currentSummary: null,
  pendingReply: null,
  error: null,
  authError: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_STATE':
      return { ...state, voiceState: action.state, error: null };
    case 'SET_EMAILS':
      return { ...state, emails: action.emails, currentIndex: 0, emailCount: action.emails.length };
    case 'SET_INDEX':
      return { ...state, currentIndex: action.index };
    case 'SET_SUMMARY':
      return { ...state, currentSummary: action.summary };
    case 'SET_REPLY':
      return { ...state, pendingReply: action.reply };
    case 'SET_ERROR':
      return { ...state, voiceState: VOICE_STATE.ERROR, error: action.error, authError: !!action.authError };
    case 'RESET':
      return INITIAL;
    default:
      return state;
  }
}

export function useVoiceFlow() {
  const [state, dispatch] = useReducer(reducer, INITIAL);
  const sessionRef = useRef(0);

  const setState = (s) => dispatch({ type: 'SET_STATE', state: s });

  const stopFlow = useCallback(() => {
    sessionRef.current++;
    SpeechService.stopSpeaking();
    dispatch({ type: 'SET_STATE', state: VOICE_STATE.IDLE });
  }, []);

  // Voice-driven start: asks user what filter to apply
  const startFlow = useCallback(async () => {
    const sessionId = ++sessionRef.current;
    const alive = () => sessionRef.current === sessionId;
    await _runFlow(null, sessionId, alive, dispatch, setState);
  }, []);

  // Tap-driven start: skips the listening step with preset filters
  const quickStart = useCallback(async (filters) => {
    const sessionId = ++sessionRef.current;
    const alive = () => sessionRef.current === sessionId;
    await _runFlow(filters, sessionId, alive, dispatch, setState);
  }, []);

  const reset = useCallback(() => {
    sessionRef.current++;
    dispatch({ type: 'RESET' });
  }, []);

  return { state, startFlow, quickStart, stopFlow, reset };
}

// ─── Private flow runner ──────────────────────────────────────────────────────

async function _runFlow(presetFilters, sessionId, alive, dispatch, setState) {
  try {
    let filters = presetFilters;

    if (!filters) {
      // Voice filter mode
      setState(VOICE_STATE.LISTENING);
      await SpeechService.speak('Welche Mails möchtest du hören?');
      if (!alive()) return;

      const transcript = await SpeechService.listenOnce('de-AT', 10000);
      if (!alive()) return;

      const cmd = SpeechService.parseVoiceCommand(transcript);
      if (cmd.intent !== 'FILTER' && cmd.intent !== 'CONFIRM') {
        await SpeechService.speak('Das habe ich nicht verstanden. Sag zum Beispiel: Mails von heute.');
        if (alive()) setState(VOICE_STATE.IDLE);
        return;
      }
      filters = cmd.filters ?? {};
    }

    setState(VOICE_STATE.LOADING);
    const filterLabel = _filterLabel(filters);
    await SpeechService.speak(`Ich lade ${filterLabel}…`);
    if (!alive()) return;

    let token;
    try {
      token = await getValidToken();
    } catch {
      if (!alive()) return;
      dispatch({ type: 'SET_ERROR', error: 'Anmeldung abgelaufen. Bitte erneut anmelden.', authError: true });
      Haptics.hapticError();
      SpeechService.speak('Deine Anmeldung ist abgelaufen. Bitte melde dich erneut an.').catch(() => {});
      return;
    }
    if (!alive()) return;

    const emails = await GmailService.fetchEmails(token, filters);
    if (!alive()) return;

    dispatch({ type: 'SET_EMAILS', emails });

    if (!emails.length) {
      await SpeechService.speak('Ich habe keine passenden Mails gefunden.');
      if (alive()) setState(VOICE_STATE.IDLE);
      return;
    }

    const count = emails.length;
    Haptics.hapticSelect();
    await SpeechService.speak(`${count} Mail${count > 1 ? 's' : ''} gefunden.`);
    if (!alive()) return;

    await iterateEmails(emails, 0, dispatch, setState, alive);
  } catch (err) {
    if (!alive()) return;
    const msg = err.message === 'TIMEOUT' ? 'Zeitüberschreitung. Bitte erneut versuchen.' : err.message;
    dispatch({ type: 'SET_ERROR', error: msg });
    Haptics.hapticError();
    SpeechService.speak('Es ist ein Fehler aufgetreten. Bitte erneut versuchen.').catch(() => {});
  }
}

// ─── Email iterator ───────────────────────────────────────────────────────────

async function iterateEmails(emails, index, dispatch, setState, alive) {
  if (!alive()) return;

  if (index >= emails.length) {
    await SpeechService.speak('Das waren alle Mails. Auf Wiederhören!');
    if (alive()) setState(VOICE_STATE.DONE);
    return;
  }

  const email = emails[index];
  dispatch({ type: 'SET_INDEX', index });
  setState(VOICE_STATE.ANNOUNCING);

  const sender = GmailService.extractSenderName(email.from);
  const position = emails.length > 1 ? `Mail ${index + 1} von ${emails.length}: ` : '';
  await SpeechService.speak(`${position}Von ${sender}, Betreff: ${email.subject}. Vorlesen?`);
  if (!alive()) return;

  setState(VOICE_STATE.CONFIRMING);

  let command;
  try {
    const response = await SpeechService.listenOnce('de-AT', 7000);
    if (!alive()) return;
    command = SpeechService.parseVoiceCommand(response);
  } catch {
    if (!alive()) return;
    // Retry once
    await SpeechService.speak('Nochmal: Vorlesen?');
    try {
      const retry = await SpeechService.listenOnce('de-AT', 6000);
      if (!alive()) return;
      command = SpeechService.parseVoiceCommand(retry);
    } catch {
      if (!alive()) return;
      await SpeechService.speak('Okay, weiter.');
      await iterateEmails(emails, index + 1, dispatch, setState, alive);
      return;
    }
  }

  if (command.intent === 'CONFIRM') {
    Haptics.hapticSelect();
    await handleReadEmail(emails, index, email, dispatch, setState, alive);
  } else if (command.intent === 'NEXT') {
    await iterateEmails(emails, index + 1, dispatch, setState, alive);
  } else if (command.intent === 'STOP') {
    await SpeechService.speak('Okay, ich beende. Auf Wiederhören!');
    if (alive()) setState(VOICE_STATE.DONE);
  } else {
    await SpeechService.speak('Vorlesen, weiter, oder fertig?');
    await iterateEmails(emails, index, dispatch, setState, alive);
  }
}

// ─── Read + reply handlers ────────────────────────────────────────────────────

async function handleReadEmail(emails, index, email, dispatch, setState, alive) {
  if (!alive()) return;

  setState(VOICE_STATE.SUMMARIZING);
  await SpeechService.speak('Ich fasse zusammen…');
  if (!alive()) return;

  const summary = await ClaudeService.summarizeEmail(email.body, email.from, email.subject);
  if (!alive()) return;

  dispatch({ type: 'SET_SUMMARY', summary });
  setState(VOICE_STATE.READING);
  await SpeechService.speak(summary);
  if (!alive()) return;

  await SpeechService.speak('Vollständig vorlesen, antworten, oder weiter?');
  if (!alive()) return;

  setState(VOICE_STATE.CONFIRMING);
  let command;
  try {
    const action = await SpeechService.listenOnce('de-AT', 7000);
    if (!alive()) return;
    command = SpeechService.parseVoiceCommand(action);
  } catch {
    if (!alive()) return;
    await iterateEmails(emails, index + 1, dispatch, setState, alive);
    return;
  }

  if (command.intent === 'READ_FULL') {
    setState(VOICE_STATE.READING);
    await SpeechService.speak(email.body);
    if (!alive()) return;
    await SpeechService.speak('Antworten oder weiter?');
    if (!alive()) return;
    setState(VOICE_STATE.CONFIRMING);
    try {
      const next = await SpeechService.listenOnce('de-AT', 7000);
      if (!alive()) return;
      if (SpeechService.parseVoiceCommand(next).intent === 'REPLY') {
        await handleReply(emails, index, email, dispatch, setState, alive);
        return;
      }
    } catch {}
    await iterateEmails(emails, index + 1, dispatch, setState, alive);
  } else if (command.intent === 'REPLY') {
    await handleReply(emails, index, email, dispatch, setState, alive);
  } else {
    await iterateEmails(emails, index + 1, dispatch, setState, alive);
  }
}

async function handleReply(emails, index, email, dispatch, setState, alive) {
  if (!alive()) return;

  setState(VOICE_STATE.REPLY_PROMPT);
  await SpeechService.speak('Okay, ich nehme deine Antwort auf. Bitte sprich jetzt.');
  Haptics.hapticConfirm();
  if (!alive()) return;

  setState(VOICE_STATE.RECORDING);
  let rawDictation;
  try {
    rawDictation = await SpeechService.listenOnce('de-AT', 30000);
    if (!alive()) return;
  } catch {
    if (!alive()) return;
    Haptics.hapticError();
    await SpeechService.speak('Aufnahme fehlgeschlagen. Ich überspringe diese Mail.');
    await iterateEmails(emails, index + 1, dispatch, setState, alive);
    return;
  }

  setState(VOICE_STATE.CLEANING);
  await SpeechService.speak('Ich verbessere deine Antwort…');
  if (!alive()) return;

  const cleanReply = await ClaudeService.cleanupDictation(rawDictation);
  if (!alive()) return;

  dispatch({ type: 'SET_REPLY', reply: cleanReply });
  setState(VOICE_STATE.REVIEW);
  await SpeechService.speak('So klingt deine Antwort:');
  if (!alive()) return;
  await SpeechService.speak(cleanReply);
  if (!alive()) return;
  await SpeechService.speak('Absenden?');
  if (!alive()) return;

  setState(VOICE_STATE.CONFIRMING);
  let confirmCmd;
  try {
    const confirm = await SpeechService.listenOnce('de-AT', 7000);
    if (!alive()) return;
    confirmCmd = SpeechService.parseVoiceCommand(confirm);
  } catch {
    if (!alive()) return;
    await SpeechService.speak('Antwort verworfen.');
    await iterateEmails(emails, index + 1, dispatch, setState, alive);
    return;
  }

  if (confirmCmd.intent === 'SEND' || confirmCmd.intent === 'CONFIRM') {
    setState(VOICE_STATE.SENDING);
    const token = await getValidToken();
    if (!alive()) return;
    await GmailService.sendReply(token, {
      threadId: email.threadId,
      to: email.from,
      subject: email.subject,
      body: cleanReply,
    });
    if (!alive()) return;
    Haptics.hapticSent();
    await SpeechService.speak('Antwort wurde gesendet.');
  } else {
    await SpeechService.speak('Antwort verworfen.');
  }

  if (!alive()) return;
  await iterateEmails(emails, index + 1, dispatch, setState, alive);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function _filterLabel(filters) {
  if (filters.timeFilter === 'heute') return 'Mails von heute';
  if (filters.timeFilter === 'gestern') return 'Mails von gestern';
  if (filters.sender) return `Mails von ${filters.sender}`;
  if (filters.keyword) return `Mails zum Thema ${filters.keyword}`;
  return 'alle Mails';
}
