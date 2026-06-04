import 'dotenv/config';

export default {
  name: 'VoiceMail',
  slug: 'voice-mail',
  version: '1.0.0',
  orientation: 'portrait',
  scheme: 'voicemail',
  ios: {
    bundleIdentifier: 'com.dimitrigeibel.voicemail',
    supportsTablet: false,
    infoPlist: {
      UIBackgroundModes: ['audio'],
      NSSpeechRecognitionUsageDescription:
        'VoiceMail benötigt Spracherkennung, um deine E-Mails per Stimme zu steuern.',
      NSMicrophoneUsageDescription:
        'VoiceMail benötigt das Mikrofon, um deine Antworten aufzunehmen.',
      // Enables "Add to Siri" / Shortcuts integration via voicemail://start URL
      CFBundleURLTypes: [
        {
          CFBundleURLSchemes: ['voicemail'],
          CFBundleURLName: 'com.dimitrigeibel.voicemail',
        },
      ],
    },
  },
  plugins: [
    'expo-speech-recognition',
    '@react-native-google-signin/google-signin',
    [
      'expo-av',
      { microphonePermission: 'VoiceMail benötigt das Mikrofon für Sprachaufnahmen.' },
    ],
  ],
  extra: {
    GOOGLE_WEB_CLIENT_ID: process.env.GOOGLE_WEB_CLIENT_ID,
    GOOGLE_IOS_CLIENT_ID: process.env.GOOGLE_IOS_CLIENT_ID,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    eas: { projectId: process.env.EAS_PROJECT_ID },
  },
};
