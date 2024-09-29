import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import UniButton from '@/components/UniButton'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useProductStore } from '@/store/product'
import ReactNativeModal from 'react-native-modal'
import { icons } from '@/constants/icons'
import InputField from '@/components/InputField'
import { useCartStore } from '@/store/cart'

const ProductDetail = () => {
  const productDetail = useProductStore((state) => state.product)
  const addProductToCart = useCartStore((state) => state.addProductToCart)
  const [quantityModal, setQuantityModal] = useState({
    state: false,
    quantity: 0
  })

  const addToCart = () => {
    try {
      addProductToCart({
        ...productDetail,
        quantity: quantityModal?.quantity
      })
      setQuantityModal({
        ...quantityModal,
        state: false
      })
      router.push('/(root)/cart')
    } catch(err) {
      console.log(err)
    }
  }

  console.log(productDetail)

  return (
    <View className='relative h-screen'>
      <View className='relative'>
        <TouchableOpacity 
            className='absolute top-6 left-4 z-20 bg-gray-400 p-2 w-10 h-10 rounded-full' 
            onPress={() => router.back()}
        >
            <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Image 
            source={{ uri: productDetail?.thumbnail }} 
            resizeMode='cover' 
            className='h-72 w-full'
        />
      </View>
      <View className='p-3 gap-2'>
        <View className='flex flex-row items-center justify-between'>
          <Text className='font-JakartaExtraBold text-xl'>{productDetail.name}</Text>
          <View className='flex flex-row items-center space-x-1'>
            <Text className='font-JakartaMedium'>{productDetail?.rating}</Text>
            <Ionicons name="star" size={14} color="gold" />
          </View>
        </View>
        <View className='flex flex-row items-center justify-between'>
          <Text className='font-JakartaExtraBold'>Plug: </Text>
          <View className='flex flex-row items-center space-x-2'>
            <Text className='font-JakartaSemiBold'>{productDetail?.vendor?.name}</Text>
            <Image source={{ uri: productDetail?.vendor?.image }} resizeMode='cover' className='h-10 w-10 rounded-full'/>
          </View>
        </View>
        <View className='bg-white p-3 rounded-lg'>
            <Text className='font-JakartaMedium tracking-wider leading-6'>{productDetail.description}</Text>
        </View>
        <View className='bg-white rounded-lg p-4 space-y-4'>
          <View className='flex flex-row justify-between items-center'>
            <Text className='text-md font-JakartaMedium'>Stock</Text>
            <Text className='text-md font-JakartaBold tracking-wider'>{productDetail.stock}</Text>
          </View>
            <View className='h-[1px] bg-gray-200'/>
          <View className='flex flex-row justify-between items-center'>
            <Text className='text-md font-JakartaMedium'>Price</Text>
            <Text className='text-md font-JakartaBold tracking-wider'>N {productDetail.price}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => setQuantityModal({
        ...quantityModal,
        state: true
      })} className='absolute bottom-0 w-16 h-16 rounded-full p-3 right-4 bg-blue-500 flex justify-center items-center'>
         <Ionicons name="add-sharp" size={30} color="white" />
      </TouchableOpacity>
      <ReactNativeModal
          isVisible={quantityModal?.state}
          onBackdropPress={() => setQuantityModal({
            ...quantityModal,
            state: false
          })}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="font-JakartaBold text-2xl mb-2">
              How many would you like to get?
            </Text>
            <InputField
              label="Code"
              icon={icons.lock}
              placeholderText='12345'
              onChangeText={(value) => setQuantityModal({
                ...quantityModal,
                quantity: Number(value)
              })}
            />
         
            <UniButton
              title="Add to Cart"
              onPress={addToCart}
              className="mt-5 bg-success-500"
            />
          </View>
        </ReactNativeModal>
    </View>
  )
}

export default ProductDetail