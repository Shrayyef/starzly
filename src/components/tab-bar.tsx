import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Card from './card';
import Icon from './icon';
import Text from './text';

const MyTabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  const {bottom} = useSafeAreaInsets();
  return (
    <Card
      sm
      transparent
      style={{
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        marginBottom: 0,
        paddingVertical: 5,
        marginHorizontal: 0,
        paddingBottom: bottom,
      }}>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let IconComponent;

        switch (route.name) {
          case 'Discover':
            IconComponent = (
              <Icon
                name={'compass'}
                type={'Feather'}
                size={22}
                color={'white'}
                primary={isFocused}
              />
            );
            break;
          case 'Search':
            IconComponent = (
              <Icon
                name={'search'}
                type={'Feather'}
                size={22}
                color={'white'}
                primary={isFocused}
              />
            );
            break;
          case 'Add':
            IconComponent = (
              <Icon
                name={'diff-added'}
                type={'Octicons'}
                size={22}
                color={'white'}
                primary={isFocused}
              />
            );
            break;
          case 'Cart':
            IconComponent = (
              <Icon
                name={'shopping-cart'}
                type={'Feather'}
                size={22}
                color={'white'}
                primary={isFocused}
              />
            );
            break;
          default:
            IconComponent = (
              <Icon
                name={'user'}
                size={22}
                color={'white'}
                primary={isFocused}
              />
            );
            break;
        }

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={label}
            style={{
              flex: 1,
              paddingVertical: 10,
              paddingHorizontal: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {IconComponent}
            <Text style={{flex: 1, marginTop: 10}} white primary={isFocused}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Card>
  );
};

export default MyTabBar;
