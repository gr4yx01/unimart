import { View, Text, FlatList } from 'react-native'
import React from 'react'
import BookCard from '@/components/BookCard'

const books = [
  {
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
  },
  {
    title: 'Use of Library',
    imgUrl: 'https://i.pinimg.com/236x/e8/fd/64/e8fd642f026f7ca3c889d0eea95b0b1c.jpg',
    price: 2850,
    order_mode: 'Instant delivery',
    course_code: 'GSP101',
    delivery: 'Instant Delivery',
    has_ca: {
      ca_price: 850,
      filling_price: 200
    },
    vendor: {
      name: 'Vera world',
    },
  },
  {
    title: 'Principle of Statistics',
    imgUrl: 'https://i.pinimg.com/236x/e8/fd/64/e8fd642f026f7ca3c889d0eea95b0b1c.jpg',
    price: 2850,
    order_mode: 'Instant delivery',
    course_code: 'STA131',
    delivery: 'Instant Delivery',
    vendor: {
      name: 'Vera world',
    },
  },
  {
    title: 'Physics for Physical Science',
    imgUrl: 'https://i.pinimg.com/236x/e8/fd/64/e8fd642f026f7ca3c889d0eea95b0b1c.jpg',
    price: 2850,
    order_mode: 'Preorder',
    course_code: 'PHY135',
    delivery: 'Instant Delivery',
    vendor: {
      name: 'Vera world',
    },
  },
  {
    title: 'General Biology',
    imgUrl: 'https://i.pinimg.com/236x/e8/fd/64/e8fd642f026f7ca3c889d0eea95b0b1c.jpg',
    price: 2850,
    order_mode: 'Instant delivery',
    course_code: 'BIO151',
    delivery: 'Instant Delivery',
    vendor: {
      name: 'Vera world',
    },
  },
]

const Home = () => {
  return (
    <View className='p-5 pt-0'>
      <FlatList 
        data={['All', 'Book','Perfume', 'Food', 'Laptops', 'Clothings', 'Phones', 'Room items']}
        renderItem={({ item }) => (
          <View className='bg-white p-2 px-5 flex justify-center items-center rounded-full'>
            <Text className='font-JakartaSemiBold text-md'>{item}</Text>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, paddingVertical: 5 }}
        ListFooterComponent={() => <View className='pb-10'/>}
      />
      <FlatList 
        data={books}
        contentContainerStyle={{  gap: 20, paddingBottom: 140, padding: 5 }}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <BookCard book={item}/>}
        numColumns={2}
        columnWrapperStyle={{ gap: 5 }}
      />
    </View>
  )
}

export default Home