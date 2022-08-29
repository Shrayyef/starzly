import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useTheme} from '@react-navigation/native';

interface ILoading {
  color?: string;
  size?: 'small' | 'large' | undefined;
  style?: any;
  type?: 'full' | 'default';
}

export default ({color, size = 'small', style, type}: ILoading) => {
  const theme: any = useTheme();

  const styles: any = {};

  if (type === 'full') {
    styles.position = 'absolute';
    styles.top = 0;
    styles.bottom = 0;
    styles.left = 0;
    styles.right = 0;
    styles.zIndex = 99999;
    styles.justifyContent = 'center';
    styles.alignItems = 'center';
    styles.backgroundColor =
      type === 'full' ? theme.colors.overlayColor : 'transparent';
  }

  return (
    <View style={{...styles, ...style}}>
      <ActivityIndicator
        size={type === 'full' ? 'large' : size}
        color={type === 'full' ? '#fff' : color || theme.colors.primary}
      />
    </View>
  );
};
