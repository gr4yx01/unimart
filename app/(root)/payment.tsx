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
  const [createOrder] = useMutation(CREATE_ORDER)
  const cart = useCartStore((state) => state.products)
  const hash = usePaymentStore((state) => state.hash)
  const emptyCart = useCartStore((state) => state.removeAll)
  const userId = useUserStore((state) => state.userId)

  console.log('**', hash)
  useEffect(() => {
    const makeOrder = async () => {
      const amount = cart?.reduce((acc, product) => acc + (product?.quantity * product?.price),0)
      const items = cart?.map((product) => {
        return {
          product_id: product?.id,
          quantity: product?.quantity,
        }
      })
  
      try {
        createOrder({
          variables: {
                items,
                userId,
                status: 'PENDING',
                paymentStatus: true,
                hash,
                totalPrice: amount
          }
        })
        emptyCart()
        console.log('successful');
        setTimeout(() => {
          router.push('/(root)/(tabs)/home')
        },3000)
      } catch (err: any) {
        console.log(err)
        Alert.alert('Order cannot be created', err)
      }
    }

    makeOrder()
  }, [])



  return (
    <>
        <LottieView
          source={require('../../assets/animation/success.json')}
          style={{ flex: 1 }}
          autoPlay
          loop={false}
        />
    </>
  );
};

export default Payment;
