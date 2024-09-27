import { View, Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native'
import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTS } from '@/graphql/queries/products'
import ProductCard from '@/components/ProductCard'

const Home = () => {
  const { data: fetchedProducts, refetch } = useQuery(GET_PRODUCTS)
  const [selected, setSelected] = useState('FOOD')
  const [products, setProduct] = useState([])

  const [refreshing, setRefreshing] = useState(false);

  console.log(fetchedProducts)

  // Handle pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch(); // Refetch the data from GraphQL
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setRefreshing(false);
  };

  // useEffect(() => {
  //   setProduct(fetchedProducts?.availableProducts?.filter((product: any) => product?.category === selected))
  // }, [])

  useEffect(() => {
    const filtered = fetchedProducts?.availableProducts?.filter((product: any) => product?.category === selected)
    setProduct(filtered)
  }, [selected])

  const categories = [
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
  
  return (
    <View className='p-5 pt-0'>
      <FlatList
        data={categories}
        renderItem={({ item }: { item: any}) => (
          <TouchableOpacity onPress={() => setSelected(item?.value)} className={`${selected === item?.value ? 'bg-primary-500': 'bg-white'}  p-2 px-5 flex justify-center items-center rounded-full`}>
            <Text className={`font-JakartaSemiBold text-md ${selected === item?.value ? 'text-white': 'text-black'}`}>{item?.label}</Text>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, paddingVertical: 5 }}
        ListFooterComponent={() => <View className='pb-10'/>}
      />
      <FlatList
        data={products}
        contentContainerStyle={{  gap: 20, paddingBottom: 140, padding: 5 }}
        showsVerticalScrollIndicator={false}
        renderItem={({item}: { item: any}) => <ProductCard book={item}/>}
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