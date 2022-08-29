import {useTheme} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  I18nManager,
  Image,
  Platform,
  useWindowDimensions,
  View,
} from 'react-native';
import {ITheme} from '../color';

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

const ProductImages = ({images = []}: {images: {url: string}[]}) => {
  const {width, height} = useWindowDimensions();
  const theme = useTheme() as ITheme;
  const [state, setState] = useState({
    show_gallery: false,
    current: 1,
  });

  const renderImages = ({item}: any) => (
    <View
      style={{height: height * 0.3, width: width - 50, marginHorizontal: 25}}>
      <Image
        source={{uri: item?.url}}
        style={{width: 'auto', height: 'auto', flex: 1}}
        resizeMode={'cover'}
      />
    </View>
  );

  const flatRef = useRef(null);

  return (
    <View style={{position: 'relative'}}>
      <AnimatedFlatlist
        onScroll={e => {
          let contentOffset = e.nativeEvent.contentOffset;
          let viewSize = e.nativeEvent.layoutMeasurement;

          // Divide the horizontal offset by the width of the view to see which page is visible
          let pageNum = Math.floor(contentOffset.x / viewSize.width);
          setState(s => ({...s, current: pageNum <= 0 ? 1 : pageNum + 1}));
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled={true}
        data={
          Platform.OS === 'android' && I18nManager.isRTL
            ? images.reverse()
            : images
        }
        renderItem={renderImages}
        ref={flatRef}
        keyExtractor={(item, index) => `image-${index}`}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: 25,
        }}>
        {images.map((one, index) => (
          <View
            key={`dot-${index}`}
            style={{
              width: 10,
              height: 10,
              borderRadius: 10 / 2,
              backgroundColor:
                state.current === index + 1
                  ? theme.colors.primary
                  : theme.colors.grey,
              marginHorizontal: 2.5,
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default ProductImages;
