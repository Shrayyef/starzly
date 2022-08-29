import {BlurView} from '@react-native-community/blur';
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  children?: any;
  style?: any;
  title?: string;
  transparent?: boolean;
  type?: string;
}

export default ({children, style, type, transparent}: Props) => {
  const theme: any = useTheme();
  const Component: any = Platform.OS === 'ios' ? BlurView : View;
  let styles: any = {
    backgroundColor: theme.colors.gradiantBackground,
  };

  if (Platform.OS === 'ios') {
    styles = {};
  }

  if (type === 'dark') {
    return (
      <LinearGradient
        start={{x: 1, y: 1}}
        end={{x: 0, y: 0}}
        style={{
          ...StyleSheet.absoluteFillObject,
          ...styles,
          ...style,
        }}
        colors={['transparent', 'transparent']}>
        {children}
      </LinearGradient>
    );
  }
  if (type === 'blur') {
    return (
      <Component
        style={{
          ...style,
          ...styles,
        }}
        blurType={theme.blur}
        blurAmount={4}
        reducedTransparencyFallbackColor={theme.blur}>
        {children}
      </Component>
    );
  }
  if (transparent) {
    return (
      <LinearGradient
        start={{x: 1, y: 1}}
        end={{x: 0, y: 0}}
        style={{
          ...StyleSheet.absoluteFillObject,
          ...styles,
          ...style,
        }}
        colors={[theme.colors.transparent, theme.colors.transparent]}>
        {children}
      </LinearGradient>
    );
  }

  if (type === 'tab-bar') {
    return (
      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 1, y: 1}}
        style={{
          ...StyleSheet.absoluteFillObject,
          ...styles,
          ...style,
        }}
        colors={['transparent', theme.colors.gradiantBackground3]}>
        {children}
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      start={{x: 1, y: 0}}
      end={{x: 1, y: 1}}
      style={{
        ...StyleSheet.absoluteFillObject,
        ...styles,
        ...style,
      }}
      colors={[
        theme.colors.gradiantBackground,
        theme.colors.gradiantBackground2,
      ]}>
      {children}
    </LinearGradient>
  );
};
