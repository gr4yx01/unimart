import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import UniButton from '@/components/UniButton'
import { useQuery } from '@apollo/client'
import { USER_PROFILE } from '@/graphql/queries/user'
import { useAuth } from '@clerk/clerk-expo'
import * as SecureStore from 'expo-secure-store'
import { useUserStore } from '@/store/user'

const Profile = () => {
  const { signOut } = useAuth()
  const [loading, setLoading] = useState(false);
  const userId = useUserStore((state) => state.userId)

  console.log(userId)

  const { data } = useQuery(USER_PROFILE, {
    variables: {
      userId
    }
  })

  const logout = async () => {
    try {
      setLoading(true)
      await signOut()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <SafeAreaView>
      <View>
        <View className='flex flex-row justify-center'>
          <Text className='font-JakartaBold text-lg'>Profile</Text>
        </View>
        <View className='flex flex-col justify-center items-center space-y-5 pt-10'>
          <View className='p-1 border-primary-500 border-2 rounded-full'>
            <Image source={{ uri: 'https://i.pinimg.com/236x/5a/b4/cf/5ab4cf713b80d87fe46a5517c1b983da.jpg' }}  resizeMode='cover' className='w-32 h-32 rounded-full'/>
          </View>
          <Text className='font-JakartaSemiBold text-lg'>{data?.user?.name}</Text>
        </View>
        <View className='h-[2px] bg-gray-200 mt-10'/>
        <View className='p-8 space-y-4'>
           <View className='flex flex-row justify-between items-center'>
              <Text className='text-md font-JakartaSemiBold'>University</Text>
              <Text className='text-md font-JakartaMedium'>{data?.user?.university?.name}</Text>
           </View>
           <View className='flex flex-row justify-between items-center'>
              {/* <Text className='text-md font-JakartaSemiBold'>Department</Text> */}
              {/* <Text className='text-md font-JakartaMedium'>Computer Science</Text> */}
           </View>
           <View className='flex flex-row justify-between items-center'>
              <Text className='text-md font-JakartaSemiBold'>Academic Level</Text>
              <Text className='text-md font-JakartaMedium'>{data?.user?.level}</Text>
           </View>
           <View className='flex flex-row justify-between items-center'>
              <Text className='text-md font-JakartaSemiBold'>Phone Number</Text>
              <Text className='text-md font-JakartaMedium'>{data?.user?.phone_no}</Text>
           </View>
           <View className='flex flex-row justify-between items-center'>
              <Text className='text-md font-JakartaSemiBold'>Get some rest</Text>
              <TouchableOpacity onPress={logout} className='font-JakartaMedium'>
                {
                  loading ? (
                    <ActivityIndicator />
                  ): (
                    <Text className='font-JakartaSemiBold text-md text-red-500'>Log out</Text>
                  )
                }
              </TouchableOpacity>
           </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Profile