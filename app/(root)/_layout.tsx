import { Stack } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'

const Layout = () => {
  return (
    <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
        <Stack.Screen name="book_detail" options={{ headerShown: false }}/>
    </Stack>
  )
}

export default Layout