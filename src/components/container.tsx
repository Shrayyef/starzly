import {
  KeyboardAwareFlatList,
  KeyboardAwareScrollView,
} from '@codler/react-native-keyboard-aware-scroll-view';
import {useTheme} from '@react-navigation/native';
import React, {useRef} from 'react';
import {Animated, FlatListProps, StatusBar, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Loading from './loading';
import NavBar, {NavProps} from './navbar';
import OffetBottom from './offset-bottom';

const AnimatedKeyboardAwareScrollView = Animated.createAnimatedComponent(
  KeyboardAwareScrollView,
);

const AnimatedKeyboardAwareFlatList: any = Animated.createAnimatedComponent(
  KeyboardAwareFlatList,
);

type Props = {
  children?: any;
  back?: boolean;
  type?: 'default' | 'flatlist' | 'fixed';
  loading?: boolean;
  flatlistProps?: FlatListProps<any>;
  navBarProps?: NavProps;
  screenFooter?: any;
  screenHeader?: any;
  hideNav?: boolean;
};

const Container: React.FC<Props> = ({
  children,
  back,
  type,
  flatlistProps,
  loading,
  navBarProps,
  screenFooter,
  screenHeader,
  hideNav,
  ...props
}) => {
  const theme: any = useTheme();

  const ref = useRef(null);

  const animatedScrollYValue = useRef(new Animated.Value(0)).current;

  if (type === 'flatlist') {
    return (
      <SafeAreaView
        edges={['left', 'right']}
        style={{
          flex: 1,
        }}>
        <StatusBar
          barStyle={theme.statusBar}
          backgroundColor={theme.colors.background}
        />
        <NavBar
          animatedScrollYValue={animatedScrollYValue}
          fixedNav={false}
          back={back}
          {...navBarProps}
        />
        {loading && <Loading />}
        {screenHeader}
        <AnimatedKeyboardAwareFlatList
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 15}}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: animatedScrollYValue}}}],
            {useNativeDriver: false},
          )}
          ref={ref}
          keyboardShouldPersistTaps={'handled'}
          {...flatlistProps}
        />
        {screenFooter}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      edges={['left', 'right']}
      style={{
        flex: 1,
      }}>
      <StatusBar
        barStyle={theme.statusBar}
        backgroundColor={theme.colors.background}
      />

      {!hideNav && (
        <NavBar
          animatedScrollYValue={animatedScrollYValue}
          fixedNav={false}
          back={back}
          {...navBarProps}
        />
      )}
      <AnimatedKeyboardAwareScrollView
        scrollEventThrottle={16}
        contentContainerStyle={{paddingBottom: 15}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: animatedScrollYValue}}}],
          {useNativeDriver: false},
        )}
        ref={ref}
        keyboardShouldPersistTaps={'handled'}
        {...props}>
        <>
          {children}
          <OffetBottom />
        </>
      </AnimatedKeyboardAwareScrollView>

      {screenFooter}
    </SafeAreaView>
  );
};

export default Container;
