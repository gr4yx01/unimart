import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { BookCardProp } from '@/types'
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'

const BookCard = ({ book: { title, imgUrl, course_code, price, delivery, has_ca }}: BookCardProp ) => {
  return (
    <TouchableOpacity onPress={() => router.push('/(root)/book_detail')} className='bg-white h-fit w-[50%] rounded-tl-lg rounded-tr-lg'>
        <Image source={{ uri: imgUrl }} resizeMode='cover' className='h-40 rounded-tl-lg rounded-tr-lg'/>
        <View className='p-3 gap-2'>
            <View className='flex flex-row'>
                <Text className='font-JakartaBold text-lg'>{title}</Text>
            </View>
              <View className='space-y-3'>
              <View className='flex flex-row justify-between items-center'>
              {/* <MaterialCommunityIcons name="book-open" size={24} color="black" /> */}
              <Text className='font-JakartaMedium'>Course code</Text>
                <Text className='text-md font-JakartaExtraBold'>{course_code}</Text>
                </View>
                <View className='flex flex-row justify-between items-center'>
                <Text className='font-JakartaMedium'>Price</Text>
                  <Text className='text-md font-JakartaExtraBold'>N {price}</Text>
                </View>
                <View className='flex flex-row justify-between items-center'>
                  <Text className='font-JakartaMedium'>Has CA</Text>
                  <Text className='text-md font-JakartaExtraBold'>{ has_ca ? "Yes" : "No"}</Text>
                </View>
              </View> 
        </View>
    </TouchableOpacity>
  )
}

export default BookCard