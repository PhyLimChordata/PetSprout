import React, {useState, useEffect} from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from "@react-navigation/stack";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TabOne from './frontend/screens/TabOne';
import TabTwo from './frontend/screens/TabTwo';
import TabThree from './frontend/screens/TabThree';

import LoginScreen from './frontend/screens/LoginScreen';
import HomeScreen from './frontend/screens/HomeScreen';

import ColorSet from './frontend/resources/themes/Global'

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

export default function App() {
  const [isloggedin, setlogged] = useState(null);

  const detectLogin = async () => {
    setlogged(false);
  }

  useEffect(()=>{
    detectLogin()
  },[])

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {
          isloggedin == null ?
          (<Stack.Screen name="LoginScreen" component={LoginScreen} />) :
          !isloggedin ?
          (<><Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} /></>) :
          (<Stack.Screen name="Nav" component={Navigation} />)
        }
        {/* <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Navigation(props) {
  return (
   <NavigationContainer independent={true}>
      <Tab.Navigator  initialRouteName="TabOne" backBehavior="order" tabBarOptions={{
            activeTintColor: ColorSet.examplePrimary}}>
        <Tab.Screen name="TabOne" component={TabOne} options={{
          tabBarLabel: 'TabOne',
          tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="home" color={color} size={size} />)}}/>
        <Tab.Screen name="TabTwo" component={TabTwo} />
        <Tab.Screen name="TabThree" component={TabThree} />
        </Tab.Navigator>    
    </NavigationContainer>
  )
}