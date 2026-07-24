import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import * as Speech from 'expo-speech';
import { summarizeEmail } from '@services/ClaudeService';
import { extractSenderName } from '@services/GmailService';
import { COLORS } from '@constants/colors';

export default function EmailDetailScreen({ route, navigation }) {
  const { email } = route.params;
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reading, setReading] = useState(false);

  const sender = extractSenderName(email.from);
  const date = new Date(email.date).toLocaleString('de-AT');

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const text = await summarizeEmail(email.body, email.from, email.subject);
      setSummary(text);
      setReading(true);
      await Speech.speak(text, {
        language: 'de-AT',
        rate: 0.9,
        onDone: () => setReading(false),
        onStopped: () => setReading(false),
      });
    } catch (e) {
      setSummary('Fehler beim Zusammenfassen: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReadFull = async () => {
    setReading(true);
    await Speech.speak(email.body, {
      language: 'de-AT',
      rate: 0.9,
      onDone: () => setReading(false),
      onStopped: () => setReading(false),
    });
  };

  const handleStop = () => {
    Speech.stop();
    setReading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Zurück</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.subject}>{email.subject}</Text>
        <Text style={styles.meta}>
          {sender} · {date}
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.btn}
            onPress={loading ? undefined : handleSummarize}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.primary} />
            ) : (
              <Text style={styles.btnText}>Zusammenfassen</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, reading && styles.btnActive]}
            onPress={reading ? handleStop : handleReadFull}
          >
            <Text style={styles.btnText}>{reading ? 'Stopp' : 'Vorlesen'}</Text>
          </TouchableOpacity>
        </View>

        {summary && (
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>Zusammenfassung</Text>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
        )}

        <Text style={styles.body}>{email.body}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 12,
  },
  back: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 60,
  },
  subject: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 30,
    marginBottom: 8,
  },
  meta: {
    color: COLORS.subtext,
    fontSize: 14,
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  btn: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  btnActive: {
    backgroundColor: COLORS.primaryDim,
  },
  btnText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '600',
  },
  summaryBox: {
    backgroundColor: COLORS.surfaceHigh,
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  summaryLabel: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  summaryText: {
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 22,
  },
  body: {
    color: COLORS.subtext,
    fontSize: 14,
    lineHeight: 22,
  },
});
