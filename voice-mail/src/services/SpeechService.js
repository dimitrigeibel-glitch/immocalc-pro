import * as Speech from 'expo-speech';
import { ExpoSpeechRecognitionModule } from 'expo-speech-recognition';
import { Audio } from 'expo-av';

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
      rate: 0.9,
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

  const heuteMatch = /heute|heutig/.test(t);
  const gesternMatch = /gestern|gestrig/.test(t);
  const vonMatch = t.match(/von\s+([a-zäöüß\s]+?)(?:\s+(?:betreff|über|wegen|mit|zum)|$)/i);
  const betreffMatch = t.match(/(?:betreff|über|wegen|zum thema|mit betreff)\s+([a-zäöüß\s]+?)$/i);
  const mailsMatch = /mails?|e-?mails?/.test(t);

  if (heuteMatch || gesternMatch || vonMatch || betreffMatch || mailsMatch) {
    return {
      intent: 'FILTER',
      filters: {
        timeFilter: heuteMatch ? 'heute' : gesternMatch ? 'gestern' : null,
        sender: vonMatch?.[1]?.trim() ?? null,
        keyword: betreffMatch?.[1]?.trim() ?? null,
      },
    };
  }

  return { intent: 'UNKNOWN', raw: transcript };
}
