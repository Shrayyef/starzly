import React from 'react';
import {StatusBar, useColorScheme, View} from 'react-native';
import 'react-native-gesture-handler';
import App from './src/App';

const Root = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <App />
    </View>
  );
};

export default Root;
