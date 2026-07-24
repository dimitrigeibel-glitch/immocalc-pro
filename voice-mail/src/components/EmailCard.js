import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { COLORS } from '@constants/colors';
import { extractSenderName } from '@services/GmailService';

export default function EmailCard({ email, onPress, isActive }) {
  const sender = extractSenderName(email.from);
  const date = new Date(email.date).toLocaleTimeString('de-AT', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <TouchableOpacity
      style={[styles.card, isActive && styles.active]}
      onPress={() => onPress(email)}
      activeOpacity={0.75}
    >
      <View style={styles.row}>
        <Text style={styles.sender} numberOfLines={1}>
          {sender}
        </Text>
        <Text style={styles.time}>{date}</Text>
      </View>
      <Text style={styles.subject} numberOfLines={1}>
        {email.subject}
      </Text>
      <Text style={styles.snippet} numberOfLines={2}>
        {email.snippet}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    gap: 4,
  },
  active: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sender: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  time: {
    color: COLORS.subtext,
    fontSize: 13,
    marginLeft: 8,
  },
  subject: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '400',
  },
  snippet: {
    color: COLORS.subtext,
    fontSize: 13,
    lineHeight: 18,
  },
});
