import UniButton from '@/components/UniButton';
import { usePaymentStore } from '@/store/payment';
import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Text, Alert } from 'react-native';
import LottieView from 'lottie-react-native';
import axios from 'axios'
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store'

const Payment = () => {
  const reference  = usePaymentStore((state) => state.reference)
  // const reference = 'scacrmvetj'
  // const [url, setUrl] = useState('');
  const [isPolling, setIsPolling] = useState(usePaymentStore((state) => state.isPolling))
  const [paymentSuccessful, setPaymentSucessful] = useState(false)

  console.log(reference)
  console.log(isPolling)
  console.log(paymentSuccessful)

  // setTimeout(() => {
  //               router.push('/(root)/(tabs)/home')
  //             },1000)

  // const userId = SecureStore.getItemAsync('userId');


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

              // setTimeout(() => {
              //   router.push('/(root)/(tabs)/home')
              // },10000)
              setPaymentSucessful(true)
            } else {
              setIsPolling(false);

              // setTimeout(() => {
              //   router.push('/(root)/(tabs)/home')
              // },10000)
            }
          }
        } catch (error) {
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
        />
      ) : (
        <LottieView
          source={require('../../assets/animation/failed.json')}
          style={{ flex: 1 }}
          autoPlay
          />
      )
    }
    </>
  );
};

export default Payment;
