import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, ApolloLink  } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
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

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      );
    }
    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });
  
  const httpLink = new HttpLink({
    uri: 'http://192.168.1.187:4000/graphql',
  });

  const client = new ApolloClient({
    uri: 'http://192.168.1.187:4000/graphql', 
    link: ApolloLink.from([errorLink, httpLink]),
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
