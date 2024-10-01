import { useOrderState } from '@/store/order';
import { formatDate } from '@/utils/helper';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderDetail() {
  const order: any = useOrderState((state) => state.order)

  console.log(order)

  return (
    <View className="flex-1">
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 p-4">
          <View className="flex-row items-center justify-between">
            <View className="w-10 h-10 justify-center">
              <TouchableOpacity onPress={() => router.back()}>
                <MaterialIcons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <Text className="text-xl font-JakartaSemiBold capitalize tracking-widest text-black flex-1 text-center">
              Receipt
            </Text>

            <View className="w-10 h-10 justify-center items-end" />
          </View>

          <ScrollView
            contentContainerStyle={{ paddingBottom: 140 }}
            showsVerticalScrollIndicator={false}
            className="pt-4"
          >
            <View className="w-15 h-15rounded-full mb-3 items-center justify-center">
                <Text className="text-2xl font-JakartaBold text-primary-500 mb-1">
                Unimart Inc.
                </Text>

                <Text className="text-xs leading-5 text-gray-500 mb-3">
                Invoice Uni{order?.payment_reference}
                </Text>

                <View className="flex-row items-end justify-end mb-1">
                <Text className="text-xl font-JakartaBold leading-9 tracking-[0.35px] text-primary-500">
                    N{order?.total_price}
                </Text>
                <Text className="text-lg leading-8 font-bold tracking-[0.35px] text-primary-500">
                    .00
                </Text>
                </View>
            </View>

            <View className="overflow-hidden w-full my-6 border-t-2 border-dashed border-gray-300" />

            <View className="w-full">
              <Text className="text-lg font-JakartaBold text-gray-900 mb-4">Transaction details</Text>

              <View className="flex-row items-start justify-between mb-3">
                <Text className="text-base leading-5 font-medium text-gray-600">Date</Text>
                <Text className="text-sm leading-5 font-semibold text-gray-700 text-right">
                  {formatDate(order?.createdAt)}
                </Text>
              </View>

              <View className="flex-row items-start justify-between mb-3">
                <Text className="text-base leading-5 font-medium text-gray-600">Category</Text>
                <Text className="text-sm leading-5 font-semibold text-gray-700 text-right">
                  Development
                </Text>
              </View>
            </View>
            <View className="overflow-hidden w-full my-6 border-t-2 border-dashed border-gray-300" />
            <FlatList 
              data={order?.items}
              renderItem={({item}) => (
                <View className='flex flex-row justify-betweeen items-center w-full'>
                  <View className='flex-1'>
                    <Text className='font-JakartaSemiBold text-lg'>{item?.product?.name}</Text>
                    <Text className='font-JakartaMedium'>N{item?.product?.price}</Text>
                  </View>
                  <View className=''>
                      {
                        (item?.confirmed_payment && !item?.out_for_delivery && !item?.delivered ) && (
                          <Text className='text-sm font-JakartaMedium'>Payment confirmed</Text>
                        )
                      }
                      {
                        (item?.confirmed_payment && item?.out_for_delivery && !item?.delivered ) && (
                          <Text>Out for delivery</Text>
                        )
                      }
                      {
                        (item?.confirmed_payment && item?.out_for_delivery && item?.delivered ) && (
                          <Text>Delivered</Text>
                        )
                      }
                  </View>
                </View>
              )}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
