import UniButton from '@/components/UniButton';
import { usePaymentStore } from '@/store/payment';
import React, { useEffect, useMemo, useState } from 'react';
import { View, Button, StyleSheet, Text, Alert } from 'react-native';
import LottieView from 'lottie-react-native';
import axios from 'axios'
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store'
import { useMutation } from '@apollo/client';
import { CREATE_ORDER } from '@/graphql/mutation/order';
import { useCartStore } from '@/store/cart';
import { useUserStore } from '@/store/user';

const Payment = () => {
  const reference  = usePaymentStore((state) => state.reference)
  // const reference = 'scacrmvetj'
  // const [url, setUrl] = useState('');
  const [isPolling, setIsPolling] = useState(usePaymentStore((state) => state.isPolling))
  // const [isPolling, setIsPolling] = useState(true)
  const [paymentSuccessful, setPaymentSucessful] = useState(false)
  const [createOrder] = useMutation(CREATE_ORDER)
  const cart = useCartStore((state) => state.products)
  const emptyCart = useCartStore((state) => state.removeAll)
  const userId = useUserStore((state) => state.userId)
  // console.log(reference)
  // console.log(isPolling)
  // console.log(paymentSuccessful)

  // setTimeout(() => {
  //               router.push('/(root)/(tabs)/home')
  //             },1000)

  console.log(userId);
  
  useEffect(() => {
    let pollingInterval: any;

    const pollPaymentStatus = async () => {
      if (isPolling && reference) {
        try {
          const response = await axios.get(`http://192.168.1.187:4000/verify-payment/${reference}`);
          const data = await response.data;

          console.log('**', data)

          if (data.success) {
            if (data.paymentStatus === 'success') {
              setIsPolling(false);
              const amount = cart?.reduce((acc, product) => acc + (product?.quantity * product?.price),0)
              const items = cart?.map((product) => {
                return {
                  product_id: product?.id,
                  quantity: product?.quantity,
                }
              })

              try {
                await createOrder({
                  variables: {
                        items,
                        userId,
                        status: 'PENDING',
                        paymentStatus: true,
                        paymentReference: reference,
                        totalPrice: amount
                  }
                })
                emptyCart()
                console.log('successful');
                setPaymentSucessful(true)
                setTimeout(() => {
                  router.push('/(root)/(tabs)/home')
                },3000)
              } catch (err: any) {
                setIsPolling(false)
                console.log(err)
                Alert.alert('Order cannot be created', err)
              }

            } else {
              setIsPolling(false);
              
              setTimeout(() => {
                router.push('/(root)/cart')
              },4000)
            }
          } else {
            setIsPolling(false)
            setTimeout(() => {
              router.push('/(root)/cart')
            },4000)
          }
        } catch (error) {
          setIsPolling(false)
          console.error('Error fetching payment status:', error);
        }
      }
    };

    // Poll every 5 seconds
    if (isPolling) {
      pollingInterval = setInterval(pollPaymentStatus, 5000);
    }

    // Cleanup interval on unmount or when polling stops
    return () => {
      clearInterval(pollingInterval);
    };
  }, [isPolling, reference]);

  return (
    <>
    {
      isPolling ? (
        <LottieView
          source={require('../../assets/animation/verifying.json')}
          style={{ flex: 1 }}
          autoPlay
          loop
        />
      ): paymentSuccessful ? (
        <LottieView
          source={require('../../assets/animation/success.json')}
          style={{ flex: 1 }}
          autoPlay
          loop={false}
        />
      ) : (
        <LottieView
          source={require('../../assets/animation/failed.json')}
          style={{ flex: 1 }}
          autoPlay
          loop={false}
          />
      )
    }
    </>
  );
};

export default Payment;
