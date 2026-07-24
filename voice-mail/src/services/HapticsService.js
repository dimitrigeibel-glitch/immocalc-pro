import * as Haptics from 'expo-haptics';

export function hapticConfirm() {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
}

export function hapticSelect() {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
}

export function hapticError() {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
}

export function hapticSent() {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), 180);
}
