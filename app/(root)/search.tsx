import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { icons } from '@/constants/icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useProductStore } from '@/store/product'
import { useAvailableProductsStore } from '@/store/products'
import { ProductCardProp } from '@/types'

const Search = () => {
    const [search, setSearch] = useState('')
    const products = useAvailableProductsStore((state) => state.products)
    const [filteredProducts, setFilteredProducts] = useState<any[]>([])
    const setProduct = useProductStore((state) => state.setProduct)

    useEffect(() => {
        const filtered = products.filter((product: any) => product?.name.toLowerCase().includes(search.toLowerCase()))
        setFilteredProducts(filtered)
    }, [search])

    interface Product {
        id: string
        name: string
        thumbnail: string
        description: string
        rating: number
        price: number
        stock: number
        vendor: {
            name: string
            image: string
        }
    }

    const routeToDetail = async ({id, name, thumbnail, description, rating, price, stock, vendor}: Product) => {
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
    <SafeAreaView>
        <View className='p-3'>
            <TouchableOpacity onPress={() => router.push('/(root)/search')} className='flex flex-row bg-white p-2 rounded-full items-center'>
                    <Image source={icons.search} className='w-6 h-6 ml-2'/>
                    <TextInput className='flex-1 ml-2 font-JakartaSemiBold' placeholder='Search by name' onChangeText={(value) => setSearch(value)}/>
                </TouchableOpacity>
        </View>
        <FlatList
            data={filteredProducts}
            contentContainerStyle={{ padding: 15, gap: 10  }}
            ListEmptyComponent={() => (
                <View className='flex justify-center items-center'>
                    <Text className='font-JakartaSemiBold'>No Product</Text>
                </View>
            )}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => routeToDetail(item)} className='flex flex-row justify-betweeen items-center w-full bg-primary-400 p-3 rounded-lg'>
                    <Image source={{ uri: item?.thumbnail }} className='w-10 h-10 rounded-full mr-2' resizeMode="cover" />
                    <View className='flex-1'>
                      <Text className='font-JakartaSemiBold text-lg'>{item?.name}</Text>
                      <Text className='font-JakartaMedium'>Price: N{item?.price}</Text>
                    </View>
                  </TouchableOpacity>
            )}
        />
    </SafeAreaView>
  )
}

export default Search