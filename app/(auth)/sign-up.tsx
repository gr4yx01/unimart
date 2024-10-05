import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import InputField from '@/components/InputField'
import UniButton from '@/components/UniButton'
import { ReactNativeModal } from "react-native-modal";
import { icons } from '@/constants/icons'
import { useSignUp } from '@clerk/clerk-expo'
import { router } from 'expo-router'
import { check } from '@/constants/images';

const SignUp = () => {
  const [verified, setVerified] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { isLoaded, signUp, setActive } = useSignUp()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      setLoading(true)
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setPendingVerification(true)
    } catch (err: any) {
      Alert.alert(JSON.stringify(err, null, 2))
    }
    setLoading(false)
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      setVerifyLoading(true)
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }

    setVerified(true);
    setVerifyLoading(false)
    setPendingVerification(false)
    setVerified(true)
  }

  const TogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  }

  return (
    <View className='flex justify-center items-center h-screen w-full'>
      <View className='w-full px-8 space-y-5'>
        <View className='flex flex-col justify-center items-center p-5'>
          <View className='mb-10 flex justify-center items-center space-y-3'>
            <View className='flex flex-row items-end'>
              <Text className='text-[50px] text-primary-500 font-JakartaExtraBold'>Unimart</Text>
            </View>
            <Text className='text-xl font-JakartaSemiBold text-primary-500'>Registration</Text>
          </View>
          <InputField placeholderText='Email' label="Email" icon={icons.email} onChangeText={(value) => setForm({...form, email: value})}/>
          <InputField placeholderText='Password' label="Password" icon={icons.lock} togglePasswordVisibility={TogglePasswordVisibility} secureTextEntry={!showPassword} onChangeText={(value) => setForm({ ...form, password: value })} password />
        </View>
        <View className='flex gap-2 justify-center items-center'>
          <UniButton title='Sign Up' onPress={onSignUpPress} loading={loading}/>
          <View className='flex flex-row gap-1 items-center'>
            <Text className='font-JakartaMedium'>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/sign-up')}>
              <Text className='font-JakartaSemiBold text-primary-500'>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
          <View className='flex flex-row items-center gap-2'>
            <View className='h-[1px] flex-1 bg-gray-300' />
            <Text className='font-JakartaMedium text-lg'>Or</Text>
            <View className='h-[1px] flex-1 bg-gray-300' />
          </View>
          <UniButton title='Sign up with Google' onPress={onSignUpPress} bgVariant='outline' textVariant='primary'/>
      </View>
      <ReactNativeModal
          isVisible={pendingVerification}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="font-JakartaExtraBold text-2xl mb-2">
              Verification
            </Text>
            <Text className="font-JakartaLight mb-5">
              We've sent a verification code to You.
            </Text>
            <InputField
              label="Code"
              icon={icons.lock}
              placeholderText='12345'
              onChangeText={(value) => setCode(value)}
            />
         
            <UniButton
              title="Verify Email"
              onPress={onPressVerify}
              className="mt-5 bg-success-500"
              loading={verifyLoading}
            />
          </View>
        </ReactNativeModal>
        <ReactNativeModal isVisible={verified}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image source={check} className="w-20 h-20 mx-auto mb-5" />
            <Text className="text-3xl font-JakartaBold text-center">
              Verified
            </Text>
            <Text className="text-base text-gray-400 font-JakartaMedium text-center mt-2">
              You have successfully verified your account.
            </Text>
            <UniButton
              title="Account Setup"
              onPress={() =>  {
                setVerified(false)
                router.push('/(auth)/setup-profile')
              }}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
    </View>
  )
}

export default SignUp
