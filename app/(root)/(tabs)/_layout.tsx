import Header from '@/components/Header'
import { icons } from '@/constants/icons'
import { GET_ORDERS } from '@/graphql/queries/order'
import { GET_PRODUCTS } from '@/graphql/queries/products'
import { useCartStore } from '@/store/cart'
import { useOrderState } from '@/store/order'
import { useAvailableProductsStore } from '@/store/products'
import { useQuery } from '@apollo/client'
import { Tabs } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View, Image, ImageSourcePropType } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { useUserStore } from '@/store/user'

const Layout = () => {
  const { data: fetchedProducts } = useQuery(GET_PRODUCTS)
  // const { data: allOrders } = useQuery(GET_ORDERS)
  const setProducts = useAvailableProductsStore((state) => state.setProducts)
  const setUserId = useUserStore((state) => state.setUserId)
  // const setOrders = useOrderState((state) => state.setOrders)

  useEffect(() => {
    const getUserId = async () => {
      const userId = await SecureStore.getItemAsync('userId');
      if (userId) {
        const formattedUserId = userId.replace(/"/g, '')
        setUserId(formattedUserId)
      }
    }
  
  getUserId()
}, [])

  useEffect(() => {
    setProducts(fetchedProducts?.availableProducts)
    // setOrders(allOrders?.orders)
  }, [fetchedProducts])

  const TabIcon = ({
    source,
    focused,
  }: {
    source: ImageSourcePropType;
    focused: boolean;
  }) => (
    <View
      className={`flex flex-row justify-center items-center rounded-full ${focused ? "bg-general-300" : ""}`}
    >
      <View
        className={`rounded-full w-14 h-14 items-center justify-center ${focused ? "bg-primary-400" : ""}`}
      >
        <Image
          source={source}
          tintColor="white"
          resizeMode="contain"
          className="w-7 h-7"
        />
      </View>
    </View>
  );
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: "#0286FF",
          borderRadius: 50,
          paddingBottom: 0, // ios only
          overflow: "hidden",
          marginHorizontal: 20,
          marginBottom: 20,
          height: 78,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
        },
        tabBarShowLabel: false
      }}
    >
      <Tabs.Screen name='home' options={{ headerShown: true, header: () => <Header />, tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.home}/> }}/>
      <Tabs.Screen name='order' options={{ headerShown: false, tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.list} /> }}/>
      <Tabs.Screen name='profile' options={{ headerShown: false, tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.profile} />  }}/>
    </Tabs>
  )
}

export default Layout