import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '@/constants/icons'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useCartStore } from '@/store/cart'

const Header = () => {
  const cart = useCartStore((state) => state.products)
  return (
    <SafeAreaView>
      <View className='p-4 gap-4'>
        <View className='flex flex-row justify-between'>
            <Text className='font-JakartaExtraBold '>Welcome back 👋</Text>
            <TouchableOpacity onPress={() => router.push('/(root)/cart')} className='relative'>
              <View className='absolute text-[8px] -right-1 -top-2 w-4 h-4 flex flex-row justify-center items-center rounded-full bg-primary-500'>
                <Text className='text-white text-xs'>{cart?.length}</Text>
              </View>
              <Feather name="shopping-cart" size={24} color="black" />
            </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => router.push('/(root)/search')} className='flex flex-row bg-white p-2 rounded-full items-center'>
            <Image source={icons.search} className='w-6 h-6 ml-2'/>
            <Text className='font-JakartaSemiBold ml-2 text-gray-400'>Search by name</Text>
            {/* <TextInput className='flex-1 ml-2 font-JakartaSemiBold' placeholder='Search by name' onChange={() => router.push('/(root)/search')}/> */}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Header