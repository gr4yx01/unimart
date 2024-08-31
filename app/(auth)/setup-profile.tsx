import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import InputField from '@/components/InputField'
import { icons } from '@/constants/icons'
import UniButton from '@/components/UniButton'
import { router } from 'expo-router'

const ProfileSetup = () => {
  return (
    <SafeAreaView className='h-screen p-5'>
        <Text className='font-JakartaMedium text-center'>Kindly setup your profile</Text>
      <View className='my-5'>
        <InputField label='Department' placeholderText='Department' icon={icons.backpack} />
        <InputField label='Phone number' placeholderText='Phone number' icon={icons.telephone} />
        <InputField label='Location' placeholderText='Location' icon={icons.pin} />
        <InputField label='Level' placeholderText='Academic Level' icon={icons.level} />
      </View>
      <UniButton title='Complete' onPress={() => router.push('/(root)/(tabs)/home')}/>
    </SafeAreaView>
  )
}

export default ProfileSetup