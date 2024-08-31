import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import UniButton from '@/components/UniButton'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const book = {
    title: 'Elementary Mathematics I',
    imgUrl: 'https://i.pinimg.com/236x/3a/dc/ff/3adcff7a670cde2ea2bb8ceadb6cceac.jpg',
    description: 'MTH 121 | Integration | Differentiation | Computer Based | Page 132 | Hard Cover | 2023 Edition',
    price: 4500,
    order_mode: 'Preorder',
    course_code: 'MTH121',
    delivery: 'Preorder',
    stock: 5,
    has_ca: {
      ca_price: 1700,
      filling_price: 800
    },
    vendor: {
      name: 'Vera world',
    },
  }

const BookDetail = () => {
  return (
    <View className='relative h-screen'>
            <View className='relative'>
                <Image source={{ uri: book.imgUrl }} resizeMode='cover' className='h-72 w-full'/>
                <TouchableOpacity className='absolute top-10 left-5 bg-gray-500 p-2 rounded-full' onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
            </View>
      <View className='p-3 gap-2'>
        <View className='flex flex-col '>
          <Text className='font-JakartaExtraBold text-xl'>{book.title}</Text>
        </View>
        <View className='bg-white p-3 rounded-lg'>
            <Text className='font-JakartaMedium tracking-wider leading-6'>{book.description}</Text>
        </View>
        <View className='bg-white rounded-lg p-4 space-y-4'>
          <View className='flex flex-row justify-between items-center'>
            <Text className='text-md font-JakartaMedium'>Stock</Text>
            <Text className='text-md font-JakartaBold tracking-wider'>{book.stock}</Text>
          </View>
            <View className='h-[1px] bg-black'/>
          <View className='flex flex-row justify-between items-center'>
            <Text className='text-md font-JakartaMedium'>Delivery</Text>
            <Text className='text-md font-JakartaBold tracking-wider'>{book.delivery}</Text>
          </View>
          <View className='h-[1px]  bg-black'/>
          <View className='flex flex-row justify-between items-center'>
            <Text className='text-md font-JakartaMedium'>Price</Text>
            <Text className='text-md font-JakartaBold tracking-wider'>N {book.price}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity className='absolute bottom-0 w-16 h-16 rounded-full p-3 right-4 bg-blue-500 flex justify-center items-center'>
         <Ionicons name="add-sharp" size={30} color="white" />
      </TouchableOpacity>
    </View>
  )
}

export default BookDetail