import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  useWindowDimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import {ITheme} from '../color';
import Card from './card';
import Icon from './icon';
import Text from './text';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BottomSheetOptions from './bottom-sheet';
import ProductImages from './image-slider';

export default function VideoItem({
  data,
  isActive,
}: {
  data: any;
  isActive: boolean;
}) {
  const {width, height} = useWindowDimensions();
  const {url, thumbnail, talent} = data;

  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [options, setOptions] = useState(false);
  const theme = useTheme() as ITheme;

  const {top} = useSafeAreaInsets();
  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setPaused(!paused);
        }}
        style={[{height: height, width}]}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 8,
            paddingTop: top + 25,
            paddingHorizontal: 25,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text h4 white center style={{flex: 1}}>
            {talent.name_en}
          </Text>
          <Icon
            size={25}
            name={'dots-three-horizontal'}
            type={'Entypo'}
            color={'#fff'}
          />
        </View>
        <Video
          source={{uri: url}}
          style={styles.video}
          resizeMode="cover"
          paused={paused || !isActive}
          repeat
          muted={muted}
        />

        <View style={{position: 'absolute', right: 20, bottom: 275}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                console.log('asd');
              }}
              style={{
                alignItems: 'center',
                width: 50,
                height: 50,
                borderRadius: 25,
                justifyContent: 'center',
                backgroundColor: theme.colors.gradiantBackground4,
                marginBottom: 10,
              }}>
              <Icon name={'hearto'} color={theme.colors.primary} />
            </TouchableOpacity>
            <Text h6 white>
              24K
            </Text>
          </View>
          <View style={[styles.verticalBarItem, styles.avatarContainer]}>
            <Image style={styles.avatar} source={{uri: talent?.avatar_url}} />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                console.log('asd');
              }}
              style={{
                alignItems: 'center',
                width: 50,
                height: 50,
                borderRadius: 25,
                justifyContent: 'center',
                backgroundColor: theme.colors.gradiantBackground4,
                marginBottom: 10,
              }}>
              <Icon name={'message1'} color={'white'} />
            </TouchableOpacity>
            <Text h6 white>
              24K
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                setMuted(!muted);
              }}
              style={{
                alignItems: 'center',
                width: 50,
                height: 50,
                borderRadius: 25,
                justifyContent: 'center',
                backgroundColor: theme.colors.gradiantBackground4,
                marginBottom: 10,
              }}>
              <Icon
                name={muted ? 'volume-x' : 'volume-2'}
                type={'Feather'}
                color={'white'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Card
          style={{
            flexDirection: 'row',
            position: 'absolute',
            backgroundColor: theme.colors.gradiantBackground4,
            bottom: 125,
            width: width - 50,
            marginHorizontal: 25,
          }}>
          <Image
            source={{uri: thumbnail}}
            style={{width: 75, height: 75, borderRadius: 75 / 2}}
          />
          <View style={{paddingHorizontal: 15}}>
            <Text h6 white>
              {talent.cost}$
            </Text>
            <Text h5 white>
              {talent.name_en}
            </Text>
            <Text white lines={1}>
              {talent.bio_en}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setOptions(true)}
            style={{
              backgroundColor: theme.colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              flex: 1,
              borderRadius: 10,
              position: 'relative',
            }}>
            <Text p white bold center>
              ADD TO CART
            </Text>
            <View
              style={{
                height: 4,
                borderRadius: 4,
                backgroundColor: theme.colors.primaryDark,
                position: 'absolute',
                bottom: 2,
                zIndex: 5,
                width: '100%',
              }}
            />
          </TouchableOpacity>
        </Card>
      </TouchableOpacity>
      <BottomSheetOptions visible={options} onClose={() => setOptions(false)}>
        <View>
          <ProductImages
            images={[
              {url: 'https://picsum.photos/200/300'},
              {url: 'https://picsum.photos/200/400'},
              {url: 'https://picsum.photos/200/500'},
            ]}
          />
          <View style={{paddingHorizontal: 25, marginTop: 25}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text p grey lines={1} style={{flex: 1}}>
                Top: {talent?.tags.map((tag: any) => tag.name_en).join(', ')}
              </Text>
              <View
                style={{
                  backgroundColor: theme.colors.primary,
                  borderRadius: 5,
                  padding: 2.5,
                }}>
                <Text white p bold>
                  FEATURED
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text h4 bold>
                {talent.name_en}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text lineThrough h4 bold style={{marginEnd: 10}}>
                  140$
                </Text>
                <Text primary h4 bold>
                  90$
                </Text>
              </View>
            </View>
            <View
              style={{height: 1, backgroundColor: '#eee', marginVertical: 20}}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={{uri: thumbnail}}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50 / 2,
                    marginEnd: 15,
                  }}
                />
                <View>
                  <Text p bold>
                    By {talent.name_en}
                  </Text>
                  <Text p bold>
                    Actors - Egypt
                  </Text>
                </View>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <Icon name={'star'} color={theme.colors.primary} size={20} />
                  <Text style={{marginStart: 5}}>4.9</Text>
                </View>
                <Text>39 reviews</Text>
              </View>
            </View>
            <View style={{marginTop: 20}}>
              <Text h6 bold>
                description
              </Text>
              <Text p lines={3}>
                {talent.bio_en}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#000',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                  paddingVertical: 20,
                  marginEnd: 10,
                  flex: 1,
                }}>
                <Icon name={'videocamera'} color={'#fff'} />
                <Text p bold white style={{marginStart: 10}}>
                  ADD VIDEO REVIEW
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: theme.colors.primary,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                  paddingVertical: 20,
                }}>
                <Icon name={'shoppingcart'} color={'#fff'} />
                <Text p bold white style={{marginStart: 10}}>
                  ADD TO CART
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BottomSheetOptions>
    </>
  );
}

const styles = StyleSheet.create({
  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  bottomLeftSection: {
    flex: 4,
  },
  bottomRightSection: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  channelName: {
    color: 'white',
    fontWeight: 'bold',
  },
  caption: {
    color: 'white',
    marginVertical: 8,
  },
  musicNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  musicNameIcon: {
    width: 12,
    height: 12,
    marginRight: 8,
  },
  musicName: {
    color: 'white',
  },
  musicDisc: {
    width: 40,
    height: 40,
  },
  verticalBar: {
    position: 'absolute',
    right: 8,
    bottom: 72,
  },
  verticalBarItem: {
    marginBottom: 24,
    alignItems: 'center',
  },
  verticalBarIcon: {
    width: 32,
    height: 32,
  },
  verticalBarText: {
    color: 'white',
    marginTop: 4,
  },
  avatarContainer: {
    marginBottom: 48,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  followButton: {
    position: 'absolute',
    bottom: -8,
  },
  followIcon: {
    width: 21,
    height: 21,
  },
  floatingMusicNote: {
    position: 'absolute',
    right: 40,
    bottom: 16,
    width: 16,
    height: 16,
    tintColor: 'white',
  },
});
