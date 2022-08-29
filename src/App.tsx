import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useColorScheme} from 'react-native';
import {colors, darkColors, ITheme} from './color';
import TabBar from './components/tab-bar';
import Text from './components/text';
import Home from './screens/home';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      initialRouteName="Add">
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Discover"
        component={Home}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Search"
        component={Home}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Add"
        component={Home}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Cart"
        component={Home}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Profile"
        component={Home}
      />
    </Tab.Navigator>
  );
};

const Main = () => {
  const scheme = useColorScheme();
  const themeSettings = {
    borderRadius: 15,
  };

  const MyTheme: ITheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...colors,
    },
    blur: 'light',
    statusBar: 'dark-content',
    ...themeSettings,
  };

  const MyThemeDark: ITheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      ...colors,
      ...darkColors,
    },
    blur: 'dark',
    statusBar: 'light-content',
    ...themeSettings,
  };

  return (
    <NavigationContainer
      fallback={<Text>loading</Text>}
      theme={scheme === 'dark' ? MyThemeDark : MyTheme}>
      <BottomSheetModalProvider>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
        </Stack.Navigator>
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
};
export default Main;
