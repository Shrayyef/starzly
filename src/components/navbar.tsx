import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Animated, SafeAreaView, StyleSheet, View} from 'react-native';
import {getNotchHeight} from '../utils';
import Gradiant from './gradiant';
import Text from './text';

export interface NavProps {
  onBack?: Function | undefined;
  onLayout?: any;
  back?: boolean;
  title?: string | React.ReactNode;
  fixedNav?: boolean;
  animatedScrollYValue?: any;
}

const NavBar: React.FC<NavProps> = ({
  fixedNav,
  title,
  onLayout,
  animatedScrollYValue,
}) => {
  const theme: any = useTheme();

  const opacity = animatedScrollYValue.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView
      style={{
        zIndex: 99,
        height: !fixedNav ? 'auto' : getNotchHeight(),
        position: 'absolute',
        right: 0,
        left: 0,
        flexDirection: 'row',
      }}
      onLayout={onLayout}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          opacity: fixedNav ? opacity : 1,
        }}>
        <Gradiant transparent />
      </Animated.View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          alignItems: 'center',
          height: 50,
        }}>
        <Text h6>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

export default NavBar;
