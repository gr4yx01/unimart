import Header from '@/components/Header'
import { icons } from '@/constants/icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { View, Text, Image, ImageSourcePropType } from 'react-native'

const Layout = () => {

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