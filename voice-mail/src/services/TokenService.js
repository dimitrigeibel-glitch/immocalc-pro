import { GoogleSignin } from '@react-native-google-signin/google-signin';

export async function getValidToken() {
  const { accessToken } = await GoogleSignin.getTokens();
  return accessToken;
}
