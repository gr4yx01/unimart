import '@walletconnect/react-native-compat'
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
import { createAppKit, defaultConfig, AppKit } from '@reown/appkit-ethers-react-native'

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

  const projectId = '2f09950592df2d0c63dc071bb4e01656'

  const metadata = {
    name: 'Unimart',
    description: 'Make your payment sharp',
    url: 'https://reown.com/appkit',
    icons: ['https://avatars.githubusercontent.com/u/179229932'],
    redirect: {
      native: 'unimart://'
    }
  }

  const mainnet = {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com'
  }
  
  const polygon = {
    chainId: 137,
    name: 'Polygon',
    currency: 'MATIC',
    explorerUrl: 'https://polygonscan.com',
    rpcUrl: 'https://polygon-rpc.com'
  }

  const lisk = {
    chainId: 4202,
    name: 'lisk-sepolia',
    currency: 'LSK',
    explorerUrl: 'https://sepolia-blockscout.lisk.com',
    rpcUrl: 'https://sepolia-blockscout.lisk.com/api'
  }

  const chains = [lisk, polygon, mainnet]

  const config = defaultConfig({ metadata })

  createAppKit({
    projectId,
    chains,
    config,
    enableAnalytics: true
  })

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
    <>
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
      <AppKit />
    </>
  );
}
