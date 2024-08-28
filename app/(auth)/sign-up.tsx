import { View, Text } from 'react-native'
import React from 'react'
import InputField from '@/components/InputField'
import { icons } from '@/constants/icons'
import UniButton from '@/components/UniButton'
import { router } from 'expo-router'

const SignUp = () => {
  return (
    <View className='flex justify-center items-center h-screen w-full'>
      <View className='w-full px-4'>
        <View className='flex flex-col justify-center items-center p-5'>
          <View className='mb-10 flex'>
            <Text className='text-[50px] text-primary-500 font-JakartaExtraBold'>Unimart</Text>
            <Text className='text-lg font-JakartaMedium'>Create your account</Text>
          </View>
          <InputField placeholderText='Email' label="Email" icon={icons.email}/>
          <InputField placeholderText='Password' label="Password" icon={icons.lock} secureTextEntry={true}/>
        </View>
          <UniButton title='Sign In' onPress={() => router.push('/(root)/(tabs)/home')}/>
      </View>
    </View>
  )
}

export default SignUp