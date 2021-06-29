import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TabOne from './frontend/screens/TabOne';
import TabTwo from './frontend/screens/TabTwo';
import TabThree from './frontend/screens/TabThree';
import ProfileEdit from './frontend/screens/ViewEditProfile';

import ColorSet from './frontend/resources/themes/Global'

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator  initialRouteName="Account" backBehavior="order" tabBarOptions={{
            activeTintColor: ColorSet.examplePrimary}}>
        <Tab.Screen name="TabOne" component={TabOne} options={{
          tabBarLabel: 'TabOne',
          tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="home" color={color} size={size} />)}}/>
        <Tab.Screen name="TabTwo" component={TabTwo} />
        <Tab.Screen name="TabThree" component={TabThree} />
        <Tab.Screen name="Account" component={ProfileEdit} />
        </Tab.Navigator>    
    </NavigationContainer>
  );
}