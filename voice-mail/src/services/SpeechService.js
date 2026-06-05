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
    interruptionModeIOS: 'doNotMix',
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

  if (/^(ja|okay|ok|ja bitte|jep|genau|stimmt|richtig|sicher|bitte)/.test(t)) {
    return { intent: 'CONFIRM' };
  }
  if (/^(nein|nö|nope|stopp|abbrechen|nicht)/.test(t)) {
    return { intent: 'REJECT' };
  }
  if (/weiter|nächste|next|überspringen/.test(t)) {
    return { intent: 'NEXT' };
  }
  if (/zurück|vorherige/.test(t)) {
    return { intent: 'PREV' };
  }
  if (/vollständig|ganzen|alles|komplett|ganz/.test(t)) {
    return { intent: 'READ_FULL' };
  }
  if (/antw|reply|schreib|diktier/.test(t)) {
    return { intent: 'REPLY' };
  }
  if (/absenden|senden|abschicken|verschicken/.test(t)) {
    return { intent: 'SEND' };
  }
  if (/nochmal|wiederholen|wiederhole/.test(t)) {
    return { intent: 'REPEAT' };
  }
  if (/fertig|beenden|aufhören|schluss/.test(t)) {
    return { intent: 'STOP' };
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
