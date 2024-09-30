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
    <View style={styles.container}>
      <Text>Hello</Text>
      <Text>Becoming the best ever</Text>
      <LottieView
        source={require('../../assets/animation/successful.json')}
        style={{ flex: 1 }}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default Payment;
