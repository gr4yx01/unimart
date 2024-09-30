import UniButton from '@/components/UniButton';
import { usePaymentStore } from '@/store/payment';
import React, { useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';

const Payment = () => {
  const authorizationUrl  = usePaymentStore((state) => state.authorizationUrl)
  const [url, setUrl] = useState('');

  const handleOpenWebView = () => {
    setUrl(authorizationUrl); // Replace with the URL you want to display
  };

  return (
    <>
      <LottieView
        source={require('../../assets/animation/success.json')}
        style={{ flex: 1 }}
        autoPlay
        loop
      />
    </>
  );
};

export default Payment;
