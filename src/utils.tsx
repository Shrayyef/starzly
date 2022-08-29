import {Dimensions, Platform, StatusBar} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const {height, width} = Dimensions.get('window');

export const isIPhoneX = () =>
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? (width === X_WIDTH && height === X_HEIGHT) ||
      (width === XSMAX_WIDTH && height === XSMAX_HEIGHT)
    : false;

export const StatusBarHeight = Platform.select({
  ios: isIPhoneX() ? 44 : 20,
  android: StatusBar.currentHeight,
  default: 0,
});

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const hasNotch = DeviceInfo.hasNotch;

export const getNotchHeight = () => {
  let h = 50;
  if (hasNotch()) {
    if (Platform.OS === 'ios') {
      h += StaticSafeAreaInsets.safeAreaInsetsTop;
    } else {
      h += StatusBar.currentHeight;
    }
  } else {
    if (Platform.OS === 'ios') {
      h += 20;
    }
  }
  return h;
};

export const isTab = () => DeviceInfo.isTablet();
