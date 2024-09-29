import WebViewComponent from '@/components/PaystackPayment';
import UniButton from '@/components/UniButton';
import { usePaymentStore } from '@/store/payment';
import React, { useState } from 'react';
import { View, Button } from 'react-native';

const Payment = () => {
  const [showWebView, setShowWebView] = useState(false);
  const authorizationUrl  = usePaymentStore((state) => state.authorizationUrl)
  const [url, setUrl] = useState('');

  const handleOpenWebView = () => {
    setUrl(authorizationUrl); // Replace with the URL you want to display
    setShowWebView(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <UniButton
        title="Open WebView"
        onPress={handleOpenWebView}
      />
      {showWebView && <WebViewComponent url={url} />}
    </View>
  );
};

export default Payment;