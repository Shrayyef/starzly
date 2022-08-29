import {Text as RNText, Platform, I18nManager} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

export interface IText {
  children: any;
  style?: any;
  xl?: boolean;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  p?: boolean;
  bold?: boolean;
  light?: boolean;
  primary?: boolean;
  secondary?: boolean;
  danger?: boolean;
  success?: boolean;
  warning?: boolean;
  selectable?: boolean;
  grey?: boolean;
  white?: boolean;
  lines?: number;
  center?: boolean;
  lineThrough?: boolean;
  weight?: number;
  ltr?: boolean;
  rtl?: boolean;
}

const Text = ({
  xl,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  children,
  bold,
  light,
  grey,
  white,
  lines,
  center,
  lineThrough,
  weight,
  danger,
  ltr,
  rtl,
  primary,
  secondary,
  style,
  selectable,
  success,
  warning,
  ...props
}: IText) => {
  const theme: any = useTheme();

  const styles: any = {
    color: theme.colors.text,
    fontSize: 12,
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
  };

  if (I18nManager.isRTL) {
    // styles.fontFamily = 'IBMPlexSansArabic-Regular';
  }

  if (ltr) {
    styles.writingDirection = 'ltr';
  }
  if (xl) {
    styles.fontSize = 54;
    styles.fontWeight = '800';
    styles.lineHeight = 66;
  }
  if (h1) {
    styles.fontSize = 34;
    styles.fontWeight = '600';
    styles.lineHeight = 46;
  }
  if (h2) {
    styles.fontSize = 30;
    styles.fontWeight = '500';
    styles.lineHeight = 42;
  }
  if (h3) {
    styles.fontSize = 26;
    styles.fontWeight = '400';
    styles.lineHeight = 32;
  }
  if (h4) {
    styles.fontSize = 22;
    styles.lineHeight = 30;
  }
  if (h5) {
    styles.fontSize = 20;
    styles.lineHeight = 30;
  }
  if (h6) {
    styles.fontSize = 18;
    styles.lineHeight = 26;
  }
  if (p) {
    styles.fontSize = 14;
    styles.lineHeight = 24;
  }
  if (bold) {
    // styles.fontFamily =
    //   Platform.OS === 'android' ? 'ElMessiri-Bold' : 'ElMessiri-Bold';
    if (Platform.OS === 'ios') {
      styles.fontWeight = '700';
    }
  }
  if (light) {
    styles.fontWeight = '100';
  }

  if (center) {
    styles.textAlign = 'center';
    styles.alignSelf = 'center';
  }
  if (rtl) {
    styles.writingDirection = 'rtl';
  }
  if (lineThrough) {
    styles.textDecorationLine = 'line-through';
    styles.textDecorationStyle = 'solid';
  }
  if (weight) {
    styles.fontWeight = weight;
  }
  if (danger) {
    styles.color = theme.colors.danger;
  }
  if (success) {
    styles.color = theme.colors.success;
  }
  if (warning) {
    styles.color = theme.colors.warning;
  }
  if (secondary) {
    styles.color = theme.colors.secondary;
  }
  if (white) {
    styles.color = theme.colors.white;
  }
  if (grey) {
    styles.color = theme.colors.grey;
  }

  if (primary) {
    styles.color = theme.colors.primary;
  }

  return (
    <RNText
      selectable={selectable}
      numberOfLines={lines}
      style={{...styles, ...style}}
      {...props}>
      {children}
    </RNText>
  );
};

export default Text;
