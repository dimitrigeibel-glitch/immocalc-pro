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

  const formData = new FormData();
  formData.append('file', { uri, type: 'audio/m4a', name: 'recording.m4a' });
  formData.append('model', 'whisper-1');
  formData.append('language', 'de');
  // Prompt hint helps Whisper handle Austrian German and filler words correctly
  formData.append('prompt', 'Österreichisches Deutsch. E-Mail-Diktat. Ähm, halt, also, na ja.');

  const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}` },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Whisper ${res.status}: ${err}`);
  }

  const data = await res.json();
  const text = data.text?.trim();
  if (!text) throw new Error('Whisper hat nichts erkannt.');
  return text;
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
