import { Stack } from 'expo-router'
import React from 'react'

const Layout = () => {
  return (
    <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
        <Stack.Screen name="product_detail" options={{ headerShown: false }}/>
        <Stack.Screen name="order_detail" options={{ title: 'Order detail', headerShown: false }}/>
        <Stack.Screen name="cart" options={{ title: 'Cart', headerShown: false }}/>
        <Stack.Screen name="payment" options={{ title: 'Payment', headerShown: false }}/>
    </Stack>
  )
}

export default Layout