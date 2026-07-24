import * as SecureStore from 'expo-secure-store';

const KEYS = {
  PROVIDER: 'ai_provider',
  CLAUDE_KEY: 'ai_key_claude',
  OPENAI_KEY: 'ai_key_openai',
  GEMINI_KEY: 'ai_key_gemini',
};

export const PROVIDERS = {
  claude: {
    id: 'claude',
    name: 'Claude',
    company: 'Anthropic',
    keyUrl: 'https://console.anthropic.com',
    keyPrefix: 'sk-ant-',
    placeholder: 'sk-ant-api03-...',
  },
  openai: {
    id: 'openai',
    name: 'ChatGPT',
    company: 'OpenAI',
    keyUrl: 'https://platform.openai.com/api-keys',
    keyPrefix: 'sk-',
    placeholder: 'sk-proj-...',
  },
  gemini: {
    id: 'gemini',
    name: 'Gemini',
    company: 'Google',
    keyUrl: 'https://aistudio.google.com/app/apikey',
    keyPrefix: 'AIza',
    placeholder: 'AIzaSy...',
  },
};

export async function getProvider() {
  return (await SecureStore.getItemAsync(KEYS.PROVIDER)) ?? 'openai';
}

export async function setProvider(providerId) {
  await SecureStore.setItemAsync(KEYS.PROVIDER, providerId);
}

export async function getApiKey(providerId) {
  return SecureStore.getItemAsync(KEYS[`${providerId.toUpperCase()}_KEY`]);
}

export async function saveApiKey(providerId, key) {
  await SecureStore.setItemAsync(KEYS[`${providerId.toUpperCase()}_KEY`], key.trim());
}

export async function deleteApiKey(providerId) {
  await SecureStore.deleteItemAsync(KEYS[`${providerId.toUpperCase()}_KEY`]);
}

export async function getActiveKey() {
  const provider = await getProvider();
  return getApiKey(provider);
}

export async function isConfigured() {
  const key = await getActiveKey();
  return !!key && key.length > 10;
}
