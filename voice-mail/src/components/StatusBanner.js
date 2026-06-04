import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@constants/colors';
import { STRINGS } from '@constants/strings';
import { VOICE_STATE } from '@hooks/useVoiceFlow';

const STATE_COLOR = {
  [VOICE_STATE.IDLE]: COLORS.subtext,
  [VOICE_STATE.LISTENING]: COLORS.primary,
  [VOICE_STATE.LOADING]: COLORS.warning,
  [VOICE_STATE.ANNOUNCING]: COLORS.text,
  [VOICE_STATE.CONFIRMING]: COLORS.primary,
  [VOICE_STATE.SUMMARIZING]: COLORS.warning,
  [VOICE_STATE.READING]: COLORS.text,
  [VOICE_STATE.REPLY_PROMPT]: COLORS.primary,
  [VOICE_STATE.RECORDING]: '#FF2244',
  [VOICE_STATE.CLEANING]: COLORS.warning,
  [VOICE_STATE.REVIEW]: COLORS.text,
  [VOICE_STATE.SENDING]: COLORS.warning,
  [VOICE_STATE.DONE]: COLORS.success,
  [VOICE_STATE.ERROR]: COLORS.error,
};

export default function StatusBanner({ voiceState, error }) {
  const label = error ?? STRINGS[voiceState] ?? voiceState;
  const color = STATE_COLOR[voiceState] ?? COLORS.subtext;

  const isRecording = voiceState === VOICE_STATE.RECORDING;

  return (
    <View style={styles.container}>
      {isRecording && <View style={styles.recordDot} />}
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    marginHorizontal: 20,
    gap: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  recordDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF2244',
  },
});
