import { View, Text, Image } from 'react-native'
import React from 'react'
import { BookCardProp } from '@/types'
import { Entypo } from '@expo/vector-icons'

const BookCard = ({ book: { title, imgUrl, course_code }}: BookCardProp ) => {
  return (
    <View className='bg-white h-fit w-50'>
        <Image source={{ uri: imgUrl }} resizeMode='cover' className=' h-40'/>
        <View className='p-4'>
            <View className='flex flex-row justify-between items-center'>
                <Text numberOfLines={2} className='font-JakartaSemiBold text-lg'>{title}</Text>
            </View>
                <Text className='font-JakartaBold text-lg'>{course_code}</Text>
        </View>
    </View>
  )
}

export default BookCard