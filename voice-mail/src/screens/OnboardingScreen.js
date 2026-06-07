import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Linking,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { saveApiKey, setProvider } from '@services/KeysService';
import { COLORS } from '@constants/colors';

const STEPS = [
  {
    title: 'Willkommen bei VoiceMail',
    subtitle: 'Deine Mails vorlesen lassen — freihändig im Auto.',
    body: 'Für die beste Diktat-Qualität nutzt die App OpenAI Whisper und ChatGPT. Du brauchst einmalig einen kostenlosen OpenAI-Account.',
    cta: 'Los geht\'s',
  },
  {
    title: 'OpenAI-Account erstellen',
    subtitle: 'Einmalig — dauert 2 Minuten',
    body: '1. Tippe auf „Zu OpenAI" unten\n2. Registriere dich (auch mit Google möglich)\n3. Gehe zu „API Keys" → „Create new secret key"\n4. Kopiere den Key\n\nNeue Accounts bekommen 5 $ Gratisguthaben — reicht für Monate.',
    link: { label: 'Zu OpenAI →', url: 'https://platform.openai.com/api-keys' },
    cta: 'Ich habe meinen Key',
  },
  {
    title: 'Key eintragen',
    subtitle: 'Wird verschlüsselt auf deinem iPhone gespeichert',
    body: null,
    cta: 'Speichern & starten',
  },
];

export default function OnboardingScreen({ navigation }) {
  const [step, setStep] = useState(0);
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const current = STEPS[step];
  const isLastStep = step === STEPS.length - 1;

  const handleNext = async () => {
    if (!isLastStep) {
      setStep((s) => s + 1);
      return;
    }

    // Save key
    if (!key.startsWith('sk-') || key.length < 20) {
      setError('Bitte einen gültigen OpenAI-Key eingeben (beginnt mit sk-)');
      return;
    }

    setSaving(true);
    try {
      await setProvider('openai');
      await saveApiKey('openai', key);
      navigation.replace('Home');
    } catch {
      setError('Speichern fehlgeschlagen. Bitte erneut versuchen.');
    } finally {
      setSaving(false);
    }
  };

  const handleSkip = () => navigation.replace('Home');

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {/* Step dots */}
        <View style={styles.dots}>
          {STEPS.map((_, i) => (
            <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
          ))}
        </View>

        <Text style={styles.title}>{current.title}</Text>
        <Text style={styles.subtitle}>{current.subtitle}</Text>

        {current.body && <Text style={styles.body}>{current.body}</Text>}

        {current.link && (
          <TouchableOpacity
            style={styles.linkBtn}
            onPress={() => Linking.openURL(current.link.url)}
          >
            <Text style={styles.linkBtnText}>{current.link.label}</Text>
          </TouchableOpacity>
        )}

        {isLastStep && (
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              value={key}
              onChangeText={(v) => { setKey(v); setError(''); }}
              placeholder="sk-proj-..."
              placeholderTextColor={COLORS.subtext}
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Text style={styles.inputHint}>
              Dein Key wird verschlüsselt auf deinem iPhone gespeichert.{'\n'}
              E-Mail-Texte und Diktate werden zur Verarbeitung an OpenAI-Server übertragen.
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.cta, saving && styles.ctaDisabled]}
          onPress={handleNext}
          disabled={saving}
        >
          <Text style={styles.ctaText}>
            {saving ? 'Speichern…' : current.cta}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skip} onPress={handleSkip}>
          <Text style={styles.skipText}>
            {step === 0 ? 'Überspringen' : 'Später einrichten'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 32,
    gap: 20,
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.surfaceHigh,
  },
  dotActive: {
    backgroundColor: COLORS.primary,
    width: 24,
  },
  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  body: {
    color: COLORS.subtext,
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'left',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
  },
  linkBtn: {
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  linkBtnText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  inputBox: {
    gap: 8,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    color: COLORS.text,
    fontSize: 15,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  error: {
    color: COLORS.error,
    fontSize: 13,
  },
  inputHint: {
    color: COLORS.subtext,
    fontSize: 12,
    textAlign: 'center',
  },
  cta: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 8,
  },
  ctaDisabled: {
    opacity: 0.6,
  },
  ctaText: {
    color: COLORS.background,
    fontSize: 17,
    fontWeight: '700',
  },
  skip: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  skipText: {
    color: COLORS.subtext,
    fontSize: 14,
  },
});
