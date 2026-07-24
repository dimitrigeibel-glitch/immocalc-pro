import { Audio } from 'expo-av';
import { getApiKey } from '@services/KeysService';

let _recording = null;

export async function startRecording() {
  // Ensure we're not already recording
  if (_recording) await cancelRecording();

  await Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    playsInSilentModeIOS: true,
    staysActiveInBackground: true,
  });

  const { recording } = await Audio.Recording.createAsync(
    Audio.RecordingOptionsPresets.HIGH_QUALITY
  );
  _recording = recording;
}

export async function stopAndTranscribe() {
  if (!_recording) throw new Error('Keine aktive Aufnahme.');

  // Guard: if recording is < 800ms it's almost certainly silence or an accidental tap
  const status = await _recording.getStatusAsync();
  if ((status.durationMillis ?? 0) < 800) {
    await _recording.stopAndUnloadAsync().catch(() => {});
    _recording = null;
    throw new Error('KURZE_AUFNAHME');
  }

  await _recording.stopAndUnloadAsync();
  const uri = _recording.getURI();
  _recording = null;

  // Restore audio session for TTS
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    playsInSilentModeIOS: true,
    staysActiveInBackground: true,
  });

  const apiKey = await getApiKey('openai');
  if (!apiKey) throw new Error('Kein OpenAI-Key konfiguriert.');

  return _transcribeWithRetry(uri, apiKey);
}

// Retry up to 2 times with exponential backoff — audio file stays on disk between attempts
async function _transcribeWithRetry(uri, apiKey, maxRetries = 2) {
  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    if (attempt > 0) {
      await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, attempt - 1)));
    }
    try {
      const formData = new FormData();
      formData.append('file', { uri, type: 'audio/m4a', name: 'recording.m4a' });
      formData.append('model', 'whisper-1');
      formData.append('language', 'de');
      formData.append('prompt', 'Österreichisches Deutsch. E-Mail-Diktat. Ähm, halt, also, na ja.');

      const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}` },
        body: formData,
      });

      if (!res.ok) {
        const errText = await res.text();
        if (res.status === 429) {
          let errData;
          try { errData = JSON.parse(errText); } catch {}
          if (errData?.error?.code === 'insufficient_quota') throw new Error('QUOTA_EXCEEDED');
          throw new Error('Zu viele Anfragen. Bitte warte kurz.');
        }
        throw new Error(`Whisper ${res.status}: ${errText}`);
      }

      const data = await res.json();
      const text = data.text?.trim();
      if (!text) throw new Error('Whisper hat nichts erkannt.');
      return text;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

export async function cancelRecording() {
  if (_recording) {
    await _recording.stopAndUnloadAsync().catch(() => {});
    _recording = null;
  }
}

export function isRecording() {
  return _recording !== null;
}
