import UniButton from '@/components/UniButton'
import { OnboardingOne } from '@/constants/images'
import { onboarding } from '@/constants/onboarding'
import { router } from 'expo-router'
import React, { useRef, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Swiper from 'react-native-swiper'

const Onboarding = () => {
    const swiperRef = useRef<Swiper>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const isLastSlide = activeIndex === onboarding.length - 1;

    console.log(activeIndex);
  return (
    <SafeAreaView className='flex h-full justify-between items-center bg-white'>
        <TouchableOpacity onPress={() => router.push('/(auth)/sign-up')} className='flex justify-end items-end w-full p-5'>
            <Text className='font-JakartaExtraBold text-md text-general-100'>Skip</Text>
        </TouchableOpacity>
    <Swiper 
    ref={swiperRef}
    loop={false}
    dot={
      <View className="w-[8px] h-[8px] mx-1 bg-[#E2E8F0] rounded-full" />
    }
    activeDot={
      <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
    }
    onIndexChanged={(value) => setActiveIndex(value)}
    >
         {onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center p-5">
            <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="flex flex-row items-center justify-center w-full mt-10">
              <Text className="text-black text-3xl font-bold mx-10 text-center">
                {item.title}
              </Text>
            </View>
            <Text className="text-md font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <UniButton 
        title={isLastSlide ? "Get Started" : "Next"} 
        className="w-11/12 mt-2 mb-5"
        onPress={() => {
            isLastSlide ? router.push('/(auth)/sign-up') : swiperRef.current?.scrollBy(1)
        }}
      />
    </SafeAreaView>
  )
}

export default Onboarding