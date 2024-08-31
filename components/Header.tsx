import { View, Text, TextInput, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '@/constants/icons'
import { Feather } from '@expo/vector-icons'

const Header = () => {
  return (
    <SafeAreaView>
      <View className='p-4 gap-4'>
        <View className='flex flex-row justify-between'>
            <Text className='font-JakartaExtraBold '>Welcome back 👋</Text>
            <View className='relative'>
              <View className='absolute text-[8px] -right-1 -top-2 w-4 h-4 flex flex-row justify-center items-center rounded-full bg-primary-500'>
                <Text className='text-white text-xs'>1</Text>
              </View>
              <Feather name="shopping-cart" size={24} color="black" />
            </View>
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