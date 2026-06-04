import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
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
import { COLORS } from '@constants/colors';

export default function HomeScreen({ navigation }) {
  useKeepAwake();
  useAudioSession();

  const [accessToken, setAccessToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const { state, startFlow, reset } = useVoiceFlow(accessToken);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Constants.expoConfig.extra.GOOGLE_WEB_CLIENT_ID,
      iosClientId: Constants.expoConfig.extra.GOOGLE_IOS_CLIENT_ID,
      scopes: [
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/gmail.send',
      ],
      offlineAccess: false,
    });

    // Try silent sign-in on app start
    GoogleSignin.signInSilently()
      .then(async (user) => {
        const tokens = await GoogleSignin.getTokens();
        setAccessToken(tokens.accessToken);
        setUserEmail(user.user.email);
      })
      .catch(() => {});
  }, []);

  const handleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: false });
      const userInfo = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();
      setAccessToken(tokens.accessToken);
      setUserEmail(userInfo.user.email);
    } catch (err) {
      if (err.code !== statusCodes.SIGN_IN_CANCELLED) {
        console.error('Sign-in error:', err);
      }
    }
  };

  const handleSignOut = async () => {
    await GoogleSignin.signOut();
    setAccessToken(null);
    setUserEmail(null);
    reset();
  };

  const isActive =
    accessToken &&
    state.voiceState !== VOICE_STATE.IDLE &&
    state.voiceState !== VOICE_STATE.DONE &&
    state.voiceState !== VOICE_STATE.ERROR;

  if (!accessToken) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>VoiceMail</Text>
        <Text style={styles.subtitle}>Gmail per Stimme – freihändig</Text>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={handleSignIn}
          style={styles.signInButton}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.accountText} numberOfLines={1}>
          {userEmail}
        </Text>
        <TouchableOpacity onPress={handleSignOut}>
          <Text style={styles.signOutText}>Abmelden</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.main}>
        <StatusBanner voiceState={state.voiceState} error={state.error} />

        <View style={styles.buttonArea}>
          <VoiceButton onPress={state.voiceState === VOICE_STATE.IDLE || state.voiceState === VOICE_STATE.DONE || state.voiceState === VOICE_STATE.ERROR ? startFlow : () => {}} isActive={!!isActive} />
        </View>

        <View style={styles.hints}>
          <Text style={styles.hintText}>„Mails von heute"</Text>
          <Text style={styles.hintText}>„Mails von gestern"</Text>
          <Text style={styles.hintText}>„Mails von Peter"</Text>
        </View>
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
            {state.emails.length} Mails anzeigen
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
    gap: 40,
  },
  title: {
    color: COLORS.text,
    fontSize: 42,
    fontWeight: '700',
    letterSpacing: -1,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.subtext,
    fontSize: 16,
    marginBottom: 48,
    textAlign: 'center',
  },
  signInButton: {
    width: 240,
    height: 56,
  },
  buttonArea: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
  },
  hints: {
    gap: 8,
    alignItems: 'center',
  },
  hintText: {
    color: COLORS.subtext,
    fontSize: 14,
    fontStyle: 'italic',
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
