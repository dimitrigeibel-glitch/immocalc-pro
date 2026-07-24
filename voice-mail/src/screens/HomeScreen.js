import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import * as Linking from 'expo-linking';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Constants from 'expo-constants';
import { useVoiceFlow, VOICE_STATE } from '@hooks/useVoiceFlow';
import { useAudioSession } from '@hooks/useAudioSession';
import VoiceButton from '@components/VoiceButton';
import StatusBanner from '@components/StatusBanner';
import QuickFilters from '@components/QuickFilters';
import { isConfigured, getProvider, PROVIDERS } from '@services/KeysService';
import { COLORS } from '@constants/colors';

function _filterLabel(f) {
  if (!f) return '';
  if (f.unreadOnly && f.timeFilter === 'heute') return 'Ungelesen von heute';
  if (f.unreadOnly) return 'Ungelesene Mails';
  if (f.timeFilter === 'heute') return 'Mails von heute';
  if (f.timeFilter === 'gestern') return 'Mails von gestern';
  if (f.sender) return `Mails von ${f.sender}`;
  if (f.keyword) return `Mails: ${f.keyword}`;
  return 'Alle Mails';
}

export default function HomeScreen({ navigation }) {
  useKeepAwake();
  useAudioSession();

  const [userEmail, setUserEmail] = useState(null);
  const { state, startFlow, quickStart, stopFlow, triggerStopRecording, reset } = useVoiceFlow();

  const isRecording = state.voiceState === VOICE_STATE.RECORDING;
  const isIdle =
    state.voiceState === VOICE_STATE.IDLE ||
    state.voiceState === VOICE_STATE.DONE ||
    state.voiceState === VOICE_STATE.ERROR;
  const isActive = !isIdle;

  // On first launch: if no AI key configured, show onboarding
  useEffect(() => {
    isConfigured().then((configured) => {
      if (!configured) navigation.replace('Onboarding');
    });
  }, [navigation]);

  // If a token auth error occurs, sign the user out
  useEffect(() => {
    if (state.authError) {
      GoogleSignin.signOut().catch(() => {});
      setUserEmail(null);
      reset();
    }
  }, [state.authError, reset]);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Constants.expoConfig.extra.GOOGLE_WEB_CLIENT_ID,
      iosClientId: Constants.expoConfig.extra.GOOGLE_IOS_CLIENT_ID,
      scopes: [
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/gmail.send',
        'https://www.googleapis.com/auth/gmail.modify',
      ],
      offlineAccess: false,
    });

    GoogleSignin.signInSilently()
      .then((user) => setUserEmail(user.user.email))
      .catch(() => {});
  }, []);

  // Deep link: voicemail://start → auto-start flow
  // Create an iOS Shortcut: "URL öffnen: voicemail://start" → Siri-Befehl "Mails vorlesen"
  useEffect(() => {
    const handleUrl = ({ url }) => {
      if (url?.includes('start') && userEmail && isIdle) startFlow();
    };
    Linking.getInitialURL().then((url) => {
      if (url?.includes('start') && userEmail && isIdle) startFlow();
    });
    const sub = Linking.addEventListener('url', handleUrl);
    return () => sub.remove();
  }, [userEmail, isIdle, startFlow]);

  const handleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: false });
      const userInfo = await GoogleSignin.signIn();
      setUserEmail(userInfo.user.email);
    } catch (err) {
      if (err.code !== statusCodes.SIGN_IN_CANCELLED) {
        console.error('Sign-in error:', err);
      }
    }
  };

  const handleSignOut = async () => {
    await GoogleSignin.signOut();
    setUserEmail(null);
    reset();
  };

  if (!userEmail) {
    return (
      <View style={styles.container}>
        <View style={styles.loginBox}>
          <Text style={styles.title}>VoiceMail</Text>
          <Text style={styles.subtitle}>Gmail freihändig — fürs Auto</Text>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={handleSignIn}
            style={styles.signInButton}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.accountText} numberOfLines={1}>{userEmail}</Text>
        <TouchableOpacity onPress={handleSignOut}>
          <Text style={styles.signOutText}>Abmelden</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.main}>
        <StatusBanner
          voiceState={state.voiceState}
          error={state.error}
          currentIndex={state.currentIndex}
          emailCount={state.emailCount}
        />

        <VoiceButton
          onPress={isRecording ? triggerStopRecording : isActive ? stopFlow : startFlow}
          isActive={isActive}
          isRecording={isRecording}
        />

        {isIdle ? (
          <View style={styles.idleArea}>
            <QuickFilters onFilter={quickStart} disabled={false} />
            {state.lastFilter && (
              <TouchableOpacity
                style={styles.lastFilterBtn}
                onPress={() => quickStart(state.lastFilter)}
              >
                <Text style={styles.lastFilterLabel}>Zuletzt:</Text>
                <Text style={styles.lastFilterText}>{_filterLabel(state.lastFilter)}</Text>
              </TouchableOpacity>
            )}
            <View style={styles.hints}>
              <Text style={styles.hintTitle}>Oder per Sprache</Text>
              <Text style={styles.hintText}>„Mails von heute"</Text>
              <Text style={styles.hintText}>„Mails von Peter"</Text>
              <Text style={styles.hintText}>„Schneller" / „Langsamer"</Text>
            </View>
          </View>
        ) : (
          {isRecording ? (
            <Text style={styles.stopHint}>Tippen zum Beenden der Aufnahme</Text>
          ) : (
            <Text style={styles.stopHint}>Tippen zum Stoppen</Text>
          )}
        )}
      </View>

      {state.emails.length > 0 && (
        <TouchableOpacity
          style={styles.listButton}
          onPress={() =>
            navigation.navigate('EmailList', {
              emails: state.emails,
              currentIndex: state.currentIndex,
            })
          }
        >
          <Text style={styles.listButtonText}>
            {state.emailCount} Mails anzeigen
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loginBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 40,
  },
  title: {
    color: COLORS.text,
    fontSize: 44,
    fontWeight: '700',
    letterSpacing: -1,
  },
  subtitle: {
    color: COLORS.subtext,
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
  },
  signInButton: {
    width: 240,
    height: 56,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 12,
  },
  accountText: {
    color: COLORS.subtext,
    fontSize: 14,
    flex: 1,
    marginRight: 12,
  },
  signOutText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 44,
  },
  idleArea: {
    alignItems: 'center',
    gap: 24,
  },
  hints: {
    alignItems: 'center',
    gap: 6,
  },
  hintTitle: {
    color: COLORS.subtext,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  hintText: {
    color: COLORS.subtext,
    fontSize: 15,
    fontStyle: 'italic',
  },
  stopHint: {
    color: COLORS.subtext,
    fontSize: 13,
  },
  lastFilterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.surfaceHigh,
    borderRadius: 20,
  },
  lastFilterLabel: {
    color: COLORS.subtext,
    fontSize: 13,
  },
  lastFilterText: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '600',
  },
  listButton: {
    marginHorizontal: 20,
    marginBottom: 40,
    paddingVertical: 14,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    alignItems: 'center',
  },
  listButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '500',
  },
});
