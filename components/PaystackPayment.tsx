import React from 'react';
import { View, Button } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewComponent = ({ url }: { url: string}) => {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: url }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default WebViewComponent;