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

const PROGRESS_STATES = new Set([
  VOICE_STATE.ANNOUNCING,
  VOICE_STATE.CONFIRMING,
  VOICE_STATE.SUMMARIZING,
  VOICE_STATE.READING,
  VOICE_STATE.REPLY_PROMPT,
  VOICE_STATE.RECORDING,
  VOICE_STATE.CLEANING,
  VOICE_STATE.REVIEW,
  VOICE_STATE.SENDING,
]);

export default function StatusBanner({ voiceState, error, currentIndex, emailCount }) {
  const label = error ?? STRINGS[voiceState] ?? voiceState;
  const color = STATE_COLOR[voiceState] ?? COLORS.subtext;
  const isRecording = voiceState === VOICE_STATE.RECORDING;
  const showProgress = PROGRESS_STATES.has(voiceState) && emailCount > 1;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {isRecording && <View style={styles.recordDot} />}
        <Text style={[styles.text, { color }]}>{label}</Text>
      </View>
      {showProgress && (
        <Text style={styles.progress}>
          Mail {currentIndex + 1} / {emailCount}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    marginHorizontal: 20,
    gap: 4,
    minWidth: 260,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  recordDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF2244',
  },
  progress: {
    color: COLORS.subtext,
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});
