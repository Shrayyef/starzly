import {DarkTheme, DefaultTheme, Theme} from '@react-navigation/native';

export const colors = {
  white: 'rgb(255, 255, 255)',
  primary: '#f71e78',
  primaryDark: '#c0165d',
  transparent: 'rgba(0, 0, 0, 0)',
  gradiantBackground: 'rgba(0, 0, 0, .3)',
  gradiantBackground2: 'rgba(0, 0, 0, .1)',
  gradiantBackground3: 'rgba(0, 0, 0, 1)',
  gradiantBackground4: 'rgba(0, 0, 0, .6)',
  grey: '#555',
};

export const darkColors = {};

export const MyTheme: ITheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...colors,
  },
  blur: 'light',
  statusBar: 'dark-content',
};

export const MyThemeDark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    ...colors,
    gradiantBackground: 'rgba(0, 0, 0, .3)',
  },
  blur: 'dark',
  statusBar: 'light-content',
};

export interface ITheme extends Theme {
  blur: 'light' | 'dark';
  statusBar: 'light-content' | 'dark-content';
  colors: typeof colors & typeof DefaultTheme.colors;
  borderRadius?: number;
}
