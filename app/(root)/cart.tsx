import { View, Text, TouchableOpacity, Image, FlatList, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useCartStore } from '@/store/cart'
import UniButton from '@/components/UniButton'
import { useMutation } from '@apollo/client'
import { CREATE_PAYMENT_SESSION } from '@/graphql/mutation/payment'
import { useUser } from '@clerk/clerk-expo'
import PaystackPayment from '@/components/PaystackPayment'
import { usePaymentStore } from '@/store/payment'
import * as WebBrowser from 'expo-web-browser'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Cart = () => {
    const { user } = useUser();
    const cart = useCartStore((state) => state.products)
    // const setAuthorizationUrl = usePaymentStore((state) => state.setAuthorizationUrl)
    const setReference = usePaymentStore((state) => state.setReference)
    const reference = usePaymentStore((state) => state.reference)
    const setIsPolling = usePaymentStore((state) => state.setIsPolling)
    const [proceedToPaystack, setProceedToPaystack] = useState(false)

    const [showPaymentWebView, setShowPaymentWebView] = useState(false)

    const [authorizationUrl, setAuthorizationUrl] = useState('')
    const [loading, setLoading] = useState(false)

    
    const [createPaymentSession] = useMutation(CREATE_PAYMENT_SESSION)

    const email = user?.primaryEmailAddress?.emailAddress;

    const computeTotalAmount = () => {
        const amount = cart?.reduce((acc, product) => acc + (product?.quantity * product?.price),0)
        return amount;
    }

    useEffect(() => {
        const routeToPaystack = async () => {
            await WebBrowser.openBrowserAsync(authorizationUrl)
        }

        if(authorizationUrl) {
            routeToPaystack()
        }
    }, [authorizationUrl])

    const makePayment = async () => {
        setLoading(true)
        const data = cart?.map((product) => {
            return {
                email,
                amount: product?.quantity * product?.price,
                subaccount_code: product?.vendor?.subaccount_code
            }
        })

        const { data: paymentResponse } = await createPaymentSession({
            variables: {
                subaccounts: data
            }
        })

        // console.log(paymentResponse);
        setReference(paymentResponse?.createPaymentSession?.data?.reference)
        setAuthorizationUrl(paymentResponse?.createPaymentSession?.data?.authorization_url)
        setLoading(false)
        setProceedToPaystack(true)
        // setTimeout(() => {
        //     setLoading(false)
        //     setIsPolling(true)
        // }, 60000)
    }
    
    const proceedToConfirmPayment = async () => {
        setIsPolling(true)
        console.log('working')
        router.push('/(root)/payment')
    }

    
  return (
    <GestureHandlerRootView>

    <SafeAreaView className='relative h-screen p-3 space-y-4'>
        <View className='p-2 flex flex-row space-x-4 items-center'>
            <TouchableOpacity className=' bg-gray-400 p-2 rounded-full' onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className='font-JakartaBold text-lg'>Cart</Text>
        </View>
        <FlatList 
            data={cart}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 10 }}
            ListFooterComponent={() => (
                <View className='flex flex-row items-center'>
                    <Text className='font-JakartaSemiBold'>Total amount: </Text>
                    <Text className='font-JakartaMedium'>N {computeTotalAmount()}</Text>
                </View>
            )}
            renderItem={({ item }) => (
                <View key={item?.id} className='flex flex-row justify-between p-3 bg-gray-200 rounded-lg'>
                    <View className='flex flex-row space-x-2 items-center'>
                        <Image source={{ uri: item.thumbnail }} resizeMode='cover' className='w-14 h-14 rounded-full'/>
                        <View>
                            <Text className='font-JakartaSemiBold text-sm'>{item.name}</Text>
                            <Text className='font-JakartaMedium'>N {item.price}</Text>
                        </View>
                    </View>
                    <View className='flex flex-row items-center bg-white rounded-full w-24 justify-between p-2'>
                        <TouchableOpacity>
                            <Entypo name="plus" size={24} color="black" />
                        </TouchableOpacity>
                        <Text className='font-JakartaSemiBold text-lg'>{item?.quantity}</Text>
                        <TouchableOpacity>
                            <Entypo name="minus" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        />

            {
                cart?.length > 0 && (
                        <UniButton
                            title="Checkout"
                            onPress={ makePayment}
                            loading={loading}
                        />
                )
            }

        {
            proceedToPaystack && (
                <UniButton
                title="I have paid"
                onPress={proceedToConfirmPayment}
                />
            )
        }
    </SafeAreaView>
    </GestureHandlerRootView>

  )
}

export default Cart