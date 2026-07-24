// Kept for backwards compatibility — delegates to AIService which supports
// Claude, OpenAI and Gemini depending on the user's configured key.
export { summarizeEmail, cleanupDictation } from '@services/AIService';
