import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ProductCardProp } from '@/types'
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useProductStore } from '@/store/product'

const ProductCard = ({ product: { id, name, thumbnail, price, rating, stock, vendor, description }}: ProductCardProp ) => {
  const setProduct = useProductStore((state) => state.setProduct)
  const routeToDetail = () => {
    setProduct({
      id,
      name,
      thumbnail,
      description,
      price,
      rating,
      stock,
      vendor
    })
    router.push('/(root)/product_detail')
  }

  return (
    <TouchableOpacity onPress={routeToDetail} className='bg-white h-fit w-[50%] rounded-tl-lg rounded-tr-lg'>
        <Image source={{ uri: thumbnail }} resizeMode='cover' className='h-40 rounded-tl-lg rounded-tr-lg'/>
        <View className='p-3 gap-2'>
            <View className='flex flex-col'>
                <Text className='font-JakartaBold text-lg'>{name}</Text>
                <View className='flex flex-row items-center'>
                  {/* <Text className='font-JakartaMedium'>Vendor</Text> */}
                    <Text className='text-xs font-JakartaBold'>{vendor?.name}</Text>
                    <Image source={{ uri: vendor?.image }} resizeMode="contain" className="h-8 w-8 rounded-full"/>
                </View>
            </View>
              <View className='space-y-1'>
                {/* <View className='flex flex-row justify-between items-center'>
                  <Text className='font-JakartaMedium'>Rating</Text>
                  <View className="flex flex-row items-center space-x-1">
                    <Text className='text-md font-JakartaExtraBold'>{rating}</Text>
                    <Ionicons name="star" size={18} color="gold" />
                  </View>
                </View> */}
                <View className='flex flex-row justify-between items-center'>
                  <Text className='font-JakartaMedium'>Stock</Text>
                  <View className="flex flex-row items-center space-x-1">
                    <Text className='text-md font-JakartaExtraBold'>{stock}</Text>
                  </View>
                </View>
                <View className='flex flex-row justify-between items-center'>
                  <Text className='font-JakartaMedium'>Price</Text>
                  <View className="flex flex-row items-center space-x-1">
                    <Text className='text-md font-JakartaExtraBold'>N{price}</Text>
                  </View>
                </View>
              </View> 
        </View>
    </TouchableOpacity>
  )
}

export default ProductCard