import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

const Index = () => {
  const { isSignedIn } = useAuth()
  
  if (isSignedIn) {
    // return <Redirect href={'/(root)/(tabs)/home'} />
    return <Redirect href={`/(auth)/setup-profile`} />
  } else {
    return <Redirect href='/(auth)/welcome' />
  }

}

export default Index
