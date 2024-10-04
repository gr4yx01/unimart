import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import { router } from 'expo-router'
import { ReactNativeModal } from "react-native-modal";
import { useSignIn } from '@clerk/clerk-expo'
import InputField from '@/components/InputField';
import UniButton from '@/components/UniButton';
import { icons } from '@/constants/icons';

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn()
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const onSignInPress = useCallback(async () => {
    setLoading(true)
    if (!isLoaded) {
      return
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        setLoading(false)
        router.replace('/(root)/(tabs)/home')
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
    setLoading(false);
  }, [isLoaded, form.email, form.password])

  return (
    <View className='flex justify-center items-center h-screen w-full'>
      <View className='w-full px-8 space-y-5'>
        <View className='flex flex-col justify-center items-center p-5'>
          <View className='mb-10 flex justify-center items-center space-y-3'>
            <View className='flex flex-row items-end'>
              <Text className='text-[50px] text-primary-500 font-JakartaExtraBold'>Unimart</Text>
              <Text className='text-xs text-primary-500 font-JakartaExtraBold'>Vendor</Text>
            </View>
            <Text className='text-xl font-JakartaSemiBold text-primary-500'>Sign in</Text>
          </View>
          <InputField placeholderText='Email' label="Email" icon={icons.email} onChangeText={(value) => setForm({...form, email: value})}/>
          <InputField placeholderText='Password' label="Password" icon={icons.lock} secureTextEntry={true} onChangeText={(value) => setForm({ ...form, password: value })}/>
        </View>
        <View className='flex gap-2 justify-center items-center'>
          <UniButton title='Sign In' onPress={onSignInPress} loading={loading} />
          <View className='flex flex-row gap-1 items-center'>
            <Text className='font-JakartaMedium'>Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/sign-up')}>
              <Text className='font-JakartaSemiBold text-primary-500'>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
          <View className='flex flex-row items-center gap-2'>
            <View className='h-[1px] flex-1 bg-gray-300' />
            <Text className='font-JakartaMedium text-lg'>Or</Text>
            <View className='h-[1px] flex-1 bg-gray-300' />
          </View>
          <UniButton title='Sign in with Google' onPress={() => {}} bgVariant='outline' textVariant='primary' />
      </View>
    </View>
  )
}

export default SignIn