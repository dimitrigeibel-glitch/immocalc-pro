import 'react-native-gesture-handler';
import { Buffer } from 'buffer';
global.Buffer = Buffer;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import EmailListScreen from './src/screens/EmailListScreen';
import EmailDetailScreen from './src/screens/EmailDetailScreen';
import ApiKeysScreen from './src/screens/ApiKeysScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="EmailList" component={EmailListScreen} />
          <Stack.Screen name="EmailDetail" component={EmailDetailScreen} />
          <Stack.Screen name="ApiKeys" component={ApiKeysScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
