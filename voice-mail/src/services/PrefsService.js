import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  SPEECH_RATE: 'prefs_speech_rate',
  LAST_FILTER: 'prefs_last_filter',
};

export async function getSpeechRate() {
  const raw = await AsyncStorage.getItem(KEYS.SPEECH_RATE);
  return raw ? parseFloat(raw) : 0.9;
}

export async function saveSpeechRate(rate) {
  await AsyncStorage.setItem(KEYS.SPEECH_RATE, String(rate));
}

export async function getLastFilter() {
  const raw = await AsyncStorage.getItem(KEYS.LAST_FILTER);
  return raw ? JSON.parse(raw) : null;
}

export async function saveLastFilter(filters) {
  await AsyncStorage.setItem(KEYS.LAST_FILTER, JSON.stringify(filters));
}
