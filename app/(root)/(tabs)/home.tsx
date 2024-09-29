import { View, Text, FlatList, TouchableOpacity, RefreshControl, Image } from 'react-native'
import { useState, useEffect, useRef } from 'react'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTS } from '@/graphql/queries/products'
import ProductCard from '@/components/ProductCard'
import { useAvailableProductsStore } from '@/store/products'
import Swiper from 'react-native-swiper'
import { CarouselOne, CarouselThree, CarouselTwo } from '@/constants/images'

const Home = () => {
  // const { data: fetchedProducts, refetch } = useQuery(GET_PRODUCTS)
  const fetchedProducts = useAvailableProductsStore((state) => state.products)
  const [selected, setSelected] = useState('ALL')
  const [products, setProduct] = useState<any[]>([])
  const swiperRef = useRef<Swiper>(null);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setProduct(fetchedProducts)
  }, [fetchedProducts])

  console.log(fetchedProducts)

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // await refetch();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setRefreshing(false);
  };

  // useEffect(() => {
  //   setProduct(fetchedProducts?.availableProducts?.filter((product: any) => product?.category === selected))
  // }, [])

  useEffect(() => {
    const filtered = fetchedProducts?.filter((product: any) => product?.category === selected)
    setProduct(selected !== 'ALL' ? filtered : fetchedProducts)
  }, [selected])

  const categories = [
    {
      label: 'All',
      value: 'ALL'
    },
    {
      label: 'Food',
      value: 'FOOD'
    },
    {
      label: 'Perfume',
      value: 'PERFUME'
    },
    {
      label: 'Book',
      value: 'BOOK'
    },
    {
      label: 'Laptops',
      value: 'LAPTOPS'
    },
    {
      label: 'Clothings',
      value: 'CLOTHING'
    },
    {
      label: 'Phones',
      value: 'PHONES'
    },
    {
      label: 'Room Items',
      value: 'ROOM ITEMS'
    },
  ]

  const carousels = [
    {
      imgUrl: CarouselOne
    },
    {
      imgUrl: CarouselTwo
    },
    {
      imgUrl: CarouselThree
    }
  ]
  
  return (
    <View className='p-5 pt-0'>
      {/* <View className='h-48'>
       <Swiper
          ref={swiperRef}
          loop={true}
          dot={
            <View className="w-[8px] h-[8px] mx-1 bg-[#E2E8F0] rounded-full" />
          }
          activeDot={
            <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
          }
         >
         {carousels.map((item) => (
          <View className="flex items-center justify-center p-5 h-full w-full">
            <Image
              source={item.imgUrl}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
          </View>
        ))}
      </Swiper>

      </View> */}
      <FlatList
        data={categories}
        renderItem={({ item }: { item: any}) => (
          <TouchableOpacity onPress={() => setSelected(item?.value)} className={`${selected === item?.value ? 'bg-primary-500': 'bg-white'}  p-2 px-5 flex justify-center items-center rounded-full`}>
            <Text className={`font-JakartaSemiBold text-md ${selected === item?.value ? 'text-white': 'text-black'}`}>{item?.label}</Text>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, paddingVertical:10 }}
        ListHeaderComponent={() => <View className='mt-10'/>}
        ListFooterComponent={() => <View className='pb-10'/>}
      />
      <FlatList
        data={products}
        contentContainerStyle={{  gap: 20, paddingBottom: 140, padding: 5 }}
        showsVerticalScrollIndicator={false}
        renderItem={({item}: { item: any}) => <ProductCard product={item}/>}
        numColumns={2}
        columnWrapperStyle={{ gap: 5 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => (
          <View>
            <Text>No Products</Text>
          </View>
        )}
      />
    </View>
  )
}

export default Home