import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderDetail() {
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
                Invoice 0x7csd38sdkbhd7234
                </Text>

                <View className="flex-row items-end justify-end mb-1">
                <Text className="text-xl font-JakartaBold leading-9 tracking-[0.35px] text-primary-500">
                    N30,900
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
                  April 2, 2023
                </Text>
              </View>

              <View className="flex-row items-start justify-between mb-3">
                <Text className="text-base leading-5 font-medium text-gray-600">Category</Text>
                <Text className="text-sm leading-5 font-semibold text-gray-700 text-right">
                  Development
                </Text>
              </View>

              <View className="flex-row items-start justify-between mb-3">
                <Text className="text-base leading-5 font-medium text-gray-600">Payment method</Text>
                <Text className="text-sm leading-5 font-semibold text-gray-700 text-right">
                  Opay
                </Text>
              </View>

              <View className="flex-row items-start justify-between mb-3">
                <Text className="text-base leading-5 font-medium text-gray-600">Receipt Number</Text>
                <Text className="text-sm leading-5 font-semibold text-gray-700 text-right">
                  9876543210
                </Text>
              </View>

              <View className="flex-row items-start justify-between mb-3">
                <Text className="text-base leading-5 font-medium text-gray-600">Billing Name</Text>
                <Text className="text-sm leading-5 font-semibold text-gray-700 text-right">
                  John Smith
                </Text>
              </View>
              <View className="flex-row items-start justify-between mb-3">
                <Text className="text-base leading-5 font-medium text-gray-600">Vendor</Text>
                <Text className="text-sm leading-5 font-semibold text-gray-700 text-right">
                  Vera World
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>

      <View className="absolute bottom-0 left-0 right-0 bg-white flex-col items-stretch pt-3 px-4 pb-7 shadow-md">
        <TouchableOpacity onPress={() => { /* handle onPress */ }}>
          <View className="flex-row items-center justify-center rounded-lg py-2.5 px-5 border bg-primary-500 border-primary-500 mb-3">
            <Text className="text-lg leading-6 font-semibold text-white">Submit Receipt</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { /* handle onPress */ }}>
          <View className="flex-row items-center justify-center rounded-lg py-2.5 px-5 border bg-transparent border-primary-500">
            <Text className="text-lg leading-6 font-semibold text-primary-500">Save as PDF</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
