import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import UniButton from '@/components/UniButton'
import { Ionicons } from '@expo/vector-icons'

const book = {
    title: 'Elementary Mathematics I',
    imgUrl: 'https://i.pinimg.com/236x/3a/dc/ff/3adcff7a670cde2ea2bb8ceadb6cceac.jpg',
    price: 4500,
    order_mode: 'Preorder',
    course_code: 'MTH121',
    delivery: 'Preorder',
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
        <View>
            <TouchableOpacity className='bg-white'>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Image source={{ uri: book.imgUrl }} resizeMode='cover' className='h-72 w-full'/>
        </View>
      <View className='p-3 gap-2'>
        <Text className='font-JakartaExtraBold text-xl'>{book.title}</Text>
        <View className=' h-32'>
            <Text>Price</Text>
            <Text>{book.price}</Text>
        </View>
      </View>
      <TouchableOpacity className='absolute bottom-0 w-16 h-16 rounded-full p-3 right-4 bg-blue-500 flex justify-center items-center'>
         <Ionicons name="add-sharp" size={30} color="white" />
      </TouchableOpacity>
    </View>
  )
}

export default BookDetail