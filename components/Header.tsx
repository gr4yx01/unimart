import { View, Text, TextInput, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '@/constants/icons'

const Header = () => {
  return (
    <SafeAreaView>
      <View className='p-4 gap-4'>
        <View>
            <Text className='font-JakartaExtraBold '>Welcome back 👋</Text>
        </View>
        <View className='flex flex-row bg-white p-2 rounded-full items-center'>
            <Image source={icons.search} className='w-6 h-6 ml-2'/>
            <TextInput className='flex-1 ml-2 font-JakartaSemiBold' placeholder='Search by name'/>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Header