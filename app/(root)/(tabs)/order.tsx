import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'

const orders = [
  {
    label: '0x7csd38sdkbhd7234',
    total: 7850,
    status: 'Shipping',
    time: 'Feb 02, 2024 at 8:32 AM',
  },
  {
    label: '0x83sdfh839230sd21',
    total: 450,
    status: 'Delivered',
    time: 'Mar 24, 2024 at 10:32 PM'
  },
  {
    label: '0x37afhdksd0344dhs',
    total: 130,
    status: 'Canceled',
    time: 'Aug 14, 2024 at 12:55 AM'
  },
]

const getOrderStatusColor = (value: string) => {
  switch(value) {
    case 'Shipping':
      return 'orange';
    case 'Delivered':
      return 'green';
    case 'Canceled':
      return 'red';
  }
}

const Order = () => {
  return (
    <SafeAreaView>
      <FlatList 
        data={orders}
        contentContainerStyle={{ padding: 15, gap: 10  }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push('/(root)/order_detail')} className='bg-white p-5 space-y-3 rounded-lg'>
            <View className='flex-row flex justify-between'>
              <Text className='font-JakartaSemiBold text-lg'>{item.label.substring(0, 8)}***</Text>
              <View className='flex flex-row items-center justify-center'>
                <Text style={{ color: `${getOrderStatusColor(item.status)}` }} className={`font-JakartaMedium mr-2`}>{item.status}</Text>
                { item.status === 'Shipping' && <MaterialIcons name="delivery-dining" size={20} color="orange" />}
                { item.status === 'Delivered' && <MaterialIcons name="done" size={20} color="green" />}
                { item.status === 'Canceled' && <MaterialIcons name="cancel" size={20} color="red" />}
              </View>
            </View>
            <View className='flex-row flex justify-between'>
              <Text className='font-JakartaSemiBold text-gray-500 text-sm'>{item.time}</Text>
              <View className='flex flex-row items-center justify-center'>
                <Text className={`font-JakartaBold mr-2`}>N {item.total}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  )
}

export default Order