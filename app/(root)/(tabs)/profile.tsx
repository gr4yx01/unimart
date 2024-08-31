import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import UniButton from '@/components/UniButton'

const Profile = () => {
  return (
    <SafeAreaView>
      <View>
        <View className='flex flex-row justify-center'>
          <Text className='font-JakartaBold text-lg'>Profile</Text>
        </View>
        <View className='flex flex-col justify-center items-center space-y-5 pt-10'>
          <View className='p-1 border-primary-500 border-2 rounded-full'>
            <Image source={{ uri: 'https://i.pinimg.com/originals/9b/64/0c/9b640c3fc338d09964406ff200319b01.jpg' }}  resizeMode='cover' className='w-32 h-32 rounded-full'/>
          </View>
          <Text className='font-JakartaSemiBold text-lg'>Henry Nnamani</Text>
          <UniButton title="Edit Profile" className='w-32'/>
        </View>
        <View className='h-[2px] bg-gray-200 mt-10'/>
        <View className='p-8 space-y-4'>
           <View className='flex flex-row justify-between items-center'>
              <Text className='text-md font-JakartaSemiBold'>University</Text>
              <Text className='text-md font-JakartaMedium'>University of Nigeria</Text>
           </View>
           <View className='flex flex-row justify-between items-center'>
              <Text className='text-md font-JakartaSemiBold'>Department</Text>
              <Text className='text-md font-JakartaMedium'>Computer Science</Text>
           </View>
           <View className='flex flex-row justify-between items-center'>
              <Text className='text-md font-JakartaSemiBold'>Academic Level</Text>
              <Text className='text-md font-JakartaMedium'>300</Text>
           </View>
           <View className='flex flex-row justify-between items-center'>
              <Text className='text-md font-JakartaSemiBold'>Phone Number</Text>
              <Text className='text-md font-JakartaMedium'>+234 7052899465</Text>
           </View>
           <View className='flex flex-row justify-between items-center'>
              <Text className='text-md font-JakartaSemiBold'>Location</Text>
              <Text className='text-md font-JakartaMedium'>Hilltop</Text>
           </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Profile