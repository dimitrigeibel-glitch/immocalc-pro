import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { COLORS } from '@constants/colors';

export default function VoiceButton({ onPress, isActive, isRecording }) {
  const pulse = useRef(new Animated.Value(1)).current;
  const animation = useRef(null);

  useEffect(() => {
    if (isActive) {
      animation.current = Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1.1, duration: 600, useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 1, duration: 600, useNativeDriver: true }),
        ])
      );
      animation.current.start();
    } else {
      animation.current?.stop();
      Animated.timing(pulse, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    }
  }, [isActive, pulse]);

  const icon = isRecording ? '🔴' : isActive ? '⏹' : '▶';
  const bgColor = isRecording ? COLORS.error : isActive ? COLORS.primaryDim : COLORS.primary;

  return (
    <Animated.View style={{ transform: [{ scale: pulse }] }}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: bgColor }]}
        onPress={onPress}
        activeOpacity={0.75}
      >
        <Animated.Text style={styles.icon}>{icon}</Animated.Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 8,
  },
  icon: {
    fontSize: 52,
  },
});
