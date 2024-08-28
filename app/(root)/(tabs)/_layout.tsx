import { icons } from '@/constants/icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { View, Text, Image } from 'react-native'

const Layout = () => {

  const TabIcon = ({ source, focused }) => {
    return (
      <View>
        <Image source={source} resizeMode='contain' className={`w-12 h-12 ${focused ? 'bg-primary-400'}`}/>
      </View>
    )
  }
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#0286FF',
          borderRadius: 50,
          padding: 10,
          height: 70,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 20,
          marginBottom: 30
        }
      }}
    >
      <Tabs.Screen name='home' options={{ headerShown: false, tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.home}/> }}/>
      <Tabs.Screen name='order' options={{ headerShown: false, tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.list} /> }}/>
      <Tabs.Screen name='profile' options={{ headerShown: false, tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.profile} />  }}/>
    </Tabs>
  )
}

export default Layout