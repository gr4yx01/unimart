import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo';
import tokenCache from '@/utils/cache';
import * as Linking from 'expo-linking';
import { Alert } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    JakartaBold: require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
    JakartaExtraBold: require('../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
    JakartaLight: require('../assets/fonts/PlusJakartaSans-Light.ttf'),
    JakartaExtraLight: require('../assets/fonts/PlusJakartaSans-ExtraLight.ttf'),
    JakartaMedium: require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
    JakartaRegular: require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
    JakartaSemiBold: require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
  });

  useEffect(() => {
    // This will handle the deep link when the app is already open
    const handleDeepLink = (event: any) => {
      const url = event.url;
      const parsedData = Linking.parse(url);
      console.log('Parsed deep link:', parsedData);

      // Check for specific path and query parameters
      if (parsedData.path === 'payment-success') {
        const transactionReference = parsedData.queryParams?.reference;
        Alert.alert('Payment Success', `Transaction Reference: ${transactionReference}`);
        // Now verify the payment with your backend using this reference
      }
    };

    // This listens for URL events when the app is already open
    Linking.addEventListener('url', handleDeepLink);

    // Handle deep links when the app is launched from a URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        const parsedData = Linking.parse(url);
        console.log('Parsed initial deep link:', parsedData);

        if (parsedData.path === 'payment-success') {
          const transactionReference = parsedData.queryParams?.reference;
          Alert.alert('Payment Success', `Transaction Reference: ${transactionReference}`);
          // Verify the payment with your backend here
        }
      }
    });

  }, []);

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

  if (!publishableKey) {
    throw new Error(
      'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
    )
  }

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const client = new ApolloClient({
    uri: 'http://192.168.1.187:4000/graphql',  
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <ClerkLoaded>
          <Stack initialRouteName='index'>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(root)" options={{ headerShown: false }} />
          </Stack>
        </ClerkLoaded>
      </ClerkProvider>
    </ApolloProvider>
  );
}
