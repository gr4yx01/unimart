import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import InputField from '@/components/InputField'
import { icons } from '@/constants/icons'
import UniButton from '@/components/UniButton'
import { router } from 'expo-router'
import { ReactNativeModal } from "react-native-modal";

const SignUp = () => {
  const [verified, setVerified] = useState(false);
  const [OTPModal, setOTPModal] = useState(false);
  const handleVerify = async () => {
    setVerified(true);
  }

  const verifyOTP = () => {
    setOTPModal(true);
  }

  return (
    <View className='flex justify-center items-center h-screen w-full'>
      <View className='w-full px-8'>
        <View className='flex flex-col justify-center items-center p-5'>
          <View className='mb-10 flex justify-center items-center space-y-3'>
            <Text className='text-[50px] text-primary-500 font-JakartaExtraBold'>Unimart</Text>
            <Text className='text-lg font-JakartaMedium text-primary-500'>One Time Registration</Text>
          </View>
          <InputField placeholderText='Email' label="Email" icon={icons.email}/>
          <InputField placeholderText='Password' label="Password" icon={icons.lock} secureTextEntry={true}/>
        </View>
          <UniButton title='Sign In' onPress={verifyOTP}/>
      </View>
      <ReactNativeModal
          isVisible={OTPModal}
          // onBackdropPress={() =>
          //   setVerification({ ...verification, state: "default" })
          // }
          // onModalHide={() => {
          //   if (verification.state === "success") {
          //     setShowSuccessModal(true);
          //   }
          // }}
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
            />
            {/* {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {verification.error}
              </Text> */}
            <UniButton
              title="Verify Email"
              onPress={handleVerify}
              className="mt-5 bg-success-500"
            />
          </View>
        </ReactNativeModal>
        <ReactNativeModal isVisible={verified}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
           
            <Text className="text-3xl font-JakartaBold text-center">
              Verified
            </Text>
            <Text className="text-base text-gray-400 font-JakartaMedium text-center mt-2">
              You have successfully verified your account.
            </Text>
            <UniButton
              title="Browse Home"
              onPress={() => router.push(`/(auth)/setup-profile`)}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
    </View>
  )
}

export default SignUp