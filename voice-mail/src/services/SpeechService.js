import * as Speech from 'expo-speech';
import { ExpoSpeechRecognitionModule } from 'expo-speech-recognition';
import { Audio } from 'expo-av';

// Module-level rate — persisted externally via PrefsService
let _rate = 0.9;

export function getSpeechRate() {
  return _rate;
}

export function setSpeechRate(rate) {
  _rate = Math.max(0.5, Math.min(1.8, rate));
}

export function adjustSpeechRate(delta) {
  setSpeechRate(_rate + delta);
}

export async function configureAudioSession() {
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    playsInSilentModeIOS: true,
    staysActiveInBackground: true,
    // duckOthers: lowers Spotify/Maps volume while speaking, restores after
    interruptionModeIOS: 'duckOthers',
    shouldDuckAndroid: true,
  });
}

export function speak(text, options = {}) {
  return new Promise((resolve, reject) => {
    Speech.speak(text, {
      language: 'de-AT',
      pitch: 1.0,
      rate: _rate,
      onDone: resolve,
      onError: reject,
      onStopped: resolve,
      ...options,
    });
  });
}

export function stopSpeaking() {
  Speech.stop();
}

export function listenOnce(locale = 'de-AT', timeoutMs = 8000) {
  // Barge-in: stop any ongoing TTS before opening microphone
  Speech.stop();
  return new Promise((resolve, reject) => {
    let resolved = false;

    const finish = (fn, value) => {
      if (resolved) return;
      resolved = true;
      clearTimeout(timer);
      resultSub?.remove();
      errorSub?.remove();
      fn(value);
    };

    const timer = setTimeout(() => {
      ExpoSpeechRecognitionModule.stop();
      finish(reject, new Error('TIMEOUT'));
    }, timeoutMs);

    const resultSub = ExpoSpeechRecognitionModule.addListener('result', (event) => {
      if (event.isFinal) {
        finish(resolve, event.results[0]?.transcript ?? '');
      }
    });

    const errorSub = ExpoSpeechRecognitionModule.addListener('error', (event) => {
      finish(reject, new Error(event.error ?? 'STT_ERROR'));
    });

    ExpoSpeechRecognitionModule.start({
      lang: locale,
      interimResults: false,
      continuous: false,
    });
  });
}

export function parseVoiceCommand(transcript) {
  const t = (transcript ?? '').toLowerCase().trim();

  // REJECT checked first — "bitte nicht senden" must never fall through to CONFIRM
  if (/^(nein|nö|nope|abbrechen|nicht|na$|na passt|nix|passt ned|passt nicht|lösch das|lösch|vergiss|vergiss das|bitte nicht|bitte stopp|bitte nein|auf keinen fall)/.test(t)) {
    return { intent: 'REJECT' };
  }
  // CONFIRM: "bitte" removed as standalone — keeps "ja bitte" but "bitte nicht" now hits REJECT above
  if (/^(ja|okay|ok|ja bitte|jep|genau|stimmt|richtig|sicher|jo|jö|passt|passt scho|passt eh|na klar|stimmt eh|ja eh|freilich|eh klar|natürlich)/.test(t)) {
    return { intent: 'CONFIRM' };
  }
  // STOP: checked before NEXT so "stopp" doesn't fall through
  if (/^stopp$|fertig|beenden|aufhören|schluss|hör auf|bin fertig/.test(t)) {
    return { intent: 'STOP' };
  }
  if (/weiter|nächste|next|überspringen|skip|geh weiter|hup/.test(t)) {
    return { intent: 'NEXT' };
  }
  if (/zurück|vorherige|vorige/.test(t)) {
    return { intent: 'PREV' };
  }
  if (/vollständig|ganzen|alles|komplett|ganz|ganze mail|ganz vorlesen/.test(t)) {
    return { intent: 'READ_FULL' };
  }
  if (/antw|reply|schreib|diktier|antworten/.test(t)) {
    return { intent: 'REPLY' };
  }
  if (/absenden|senden|abschicken|verschicken|schick's|schick das|schicks ab|abschicken/.test(t)) {
    return { intent: 'SEND' };
  }
  if (/nochmal|wiederholen|wiederhole|nochmals/.test(t)) {
    return { intent: 'REPEAT' };
  }
  if (/hilfe|help|befehle|was kann|was geht/.test(t)) {
    return { intent: 'HELP' };
  }
  if (/schneller|schnell|faster/.test(t)) {
    return { intent: 'FASTER' };
  }
  if (/langsamer|langsam|slower/.test(t)) {
    return { intent: 'SLOWER' };
  }

  const heuteMatch = /heute|heutig/.test(t);
  const gesternMatch = /gestern|gestrig/.test(t);
  const unreadMatch = /ungelesen|unread/.test(t);
  const vonMatch = t.match(/von\s+([a-zäöüß\s]+?)(?:\s+(?:betreff|über|wegen|mit|zum)|$)/i);
  const betreffMatch = t.match(/(?:betreff|über|wegen|zum thema|mit betreff)\s+([a-zäöüß\s]+?)$/i);
  const mailsMatch = /mails?|e-?mails?/.test(t);

  if (heuteMatch || gesternMatch || unreadMatch || vonMatch || betreffMatch || mailsMatch) {
    return {
      intent: 'FILTER',
      filters: {
        timeFilter: heuteMatch ? 'heute' : gesternMatch ? 'gestern' : null,
        unreadOnly: unreadMatch || undefined,
        sender: vonMatch?.[1]?.trim() ?? null,
        keyword: betreffMatch?.[1]?.trim() ?? null,
      },
    };
  }

  return { intent: 'UNKNOWN', raw: transcript };
}
