import {useTheme} from '@react-navigation/native';
import React from 'react';
import {TouchableWithoutFeedback, View, ViewStyle} from 'react-native';
import {ITheme} from '../color';
import Gradiant from './gradiant';

export interface ICard {
  children: any;
  style?: ViewStyle;
  sm?: boolean;
  title?: any;
  transparent?: boolean;
  borderBottom?: boolean;
  onPress?: Function | undefined;
}

const Card = ({
  children,
  style,
  sm,
  transparent,
  borderBottom,
  onPress,
  ...props
}: ICard) => {
  const theme = useTheme() as ITheme;
  let styles: ViewStyle = {
    backgroundColor: transparent ? 'transparent' : theme.colors.card,
    margin: 10,
    padding: sm ? 10 : 25,
    borderRadius: transparent ? 0 : theme.borderRadius,
  };

  if (borderBottom) {
    styles = {
      ...styles,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      borderRadius: 0,
    };
  }

  const Component: any = onPress ? TouchableWithoutFeedback : View;

  if (onPress) {
    return (
      <Component onPress={onPress} {...props}>
        <View style={{...styles, ...style}}>{children}</View>
      </Component>
    );
  }

  return (
    <>
      <Component style={{...styles, ...style}} {...props}>
        {transparent && <Gradiant type={'tab-bar'} />}
        {children}
      </Component>
    </>
  );
};

export default Card;
