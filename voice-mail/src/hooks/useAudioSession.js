import { useEffect } from 'react';
import { configureAudioSession } from '@services/SpeechService';

export function useAudioSession() {
  useEffect(() => {
    configureAudioSession().catch(console.error);
  }, []);
}
