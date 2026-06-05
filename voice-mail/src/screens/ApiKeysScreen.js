import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Linking,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  PROVIDERS,
  getProvider,
  setProvider,
  getApiKey,
  saveApiKey,
  deleteApiKey,
} from '@services/KeysService';
import { COLORS } from '@constants/colors';

export default function ApiKeysScreen({ navigation }) {
  const [selectedProvider, setSelectedProvider] = useState('claude');
  const [keys, setKeys] = useState({ claude: '', openai: '', gemini: '' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(null);
  const [showKey, setShowKey] = useState({});

  useEffect(() => {
    (async () => {
      const provider = await getProvider();
      setSelectedProvider(provider);

      const loaded = {};
      for (const id of Object.keys(PROVIDERS)) {
        loaded[id] = (await getApiKey(id)) ?? '';
      }
      setKeys(loaded);
    })();
  }, []);

  const handleSave = async (providerId) => {
    setSaving(true);
    setSaved(null);
    try {
      await setProvider(providerId);
      setSelectedProvider(providerId);
      if (keys[providerId]) {
        await saveApiKey(providerId, keys[providerId]);
      } else {
        await deleteApiKey(providerId);
      }
      setSaved(providerId);
      setTimeout(() => setSaved(null), 2000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Zurück</Text>
        </TouchableOpacity>
        <Text style={styles.title}>KI-Anbieter</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.intro}>
          Trage deinen eigenen API-Key ein. Dein Key wird verschlüsselt auf deinem
          iPhone gespeichert — nie auf unseren Servern.
        </Text>

        {Object.values(PROVIDERS).map((provider) => {
          const isActive = selectedProvider === provider.id;
          const hasKey = keys[provider.id]?.length > 10;
          const isSaved = saved === provider.id;

          return (
            <View
              key={provider.id}
              style={[styles.card, isActive && styles.cardActive]}
            >
              <View style={styles.cardHeader}>
                <View style={styles.cardTitleRow}>
                  <Text style={styles.providerName}>{provider.name}</Text>
                  <Text style={styles.providerCompany}>{provider.company}</Text>
                </View>
                {hasKey && <View style={styles.dot} />}
              </View>

              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  value={showKey[provider.id] ? keys[provider.id] : _mask(keys[provider.id])}
                  onChangeText={(v) => setKeys((prev) => ({ ...prev, [provider.id]: v }))}
                  onFocus={() => setShowKey((prev) => ({ ...prev, [provider.id]: true }))}
                  onBlur={() => setShowKey((prev) => ({ ...prev, [provider.id]: false }))}
                  placeholder={provider.placeholder}
                  placeholderTextColor={COLORS.subtext}
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={false}
                />
              </View>

              <View style={styles.cardFooter}>
                <TouchableOpacity
                  onPress={() => Linking.openURL(provider.keyUrl)}
                >
                  <Text style={styles.linkText}>Key holen →</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.saveBtn,
                    isActive && styles.saveBtnActive,
                    isSaved && styles.saveBtnSaved,
                  ]}
                  onPress={() => handleSave(provider.id)}
                  disabled={saving}
                >
                  {saving && isActive ? (
                    <ActivityIndicator color={COLORS.background} size="small" />
                  ) : (
                    <Text style={styles.saveBtnText}>
                      {isSaved ? '✓ Gespeichert' : isActive ? 'Aktiv' : 'Aktivieren'}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          );
        })}

        <View style={styles.costBox}>
          <Text style={styles.costTitle}>Geschätzte Kosten pro Monat</Text>
          {[
            { name: 'Claude Sonnet', cost: '~€2', note: 'bei ~20 Mails/Tag' },
            { name: 'ChatGPT (gpt-4o-mini)', cost: '~€0.50', note: 'günstigstes Modell' },
            { name: 'Gemini 1.5 Flash', cost: '~€0.20', note: 'sehr günstig' },
          ].map((item) => (
            <View key={item.name} style={styles.costRow}>
              <Text style={styles.costName}>{item.name}</Text>
              <View style={styles.costRight}>
                <Text style={styles.costValue}>{item.cost}</Text>
                <Text style={styles.costNote}>{item.note}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function _mask(key) {
  if (!key || key.length < 8) return key;
  return key.slice(0, 6) + '••••••••' + key.slice(-4);
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    gap: 16,
  },
  back: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: '700',
  },
  scroll: { flex: 1 },
  content: {
    padding: 20,
    paddingBottom: 60,
    gap: 16,
  },
  intro: {
    color: COLORS.subtext,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 16,
    gap: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardActive: {
    borderColor: COLORS.primary,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitleRow: { gap: 2 },
  providerName: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: '700',
  },
  providerCompany: {
    color: COLORS.subtext,
    fontSize: 13,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.success,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.surfaceHigh,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: COLORS.text,
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  saveBtn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceHigh,
    borderWidth: 1,
    borderColor: COLORS.subtext,
    minWidth: 100,
    alignItems: 'center',
  },
  saveBtnActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  saveBtnSaved: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  saveBtnText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
  },
  costBox: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 16,
    gap: 10,
    marginTop: 8,
  },
  costTitle: {
    color: COLORS.subtext,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  costName: {
    color: COLORS.text,
    fontSize: 14,
    flex: 1,
  },
  costRight: { alignItems: 'flex-end' },
  costValue: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '700',
  },
  costNote: {
    color: COLORS.subtext,
    fontSize: 11,
  },
});
