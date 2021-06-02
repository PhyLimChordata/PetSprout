import React, {useState, useEffect} from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from "@react-navigation/stack";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TabOne from './frontend/screens/TabOne';
import TabTwo from './frontend/screens/TabTwo';
import TabThree from './frontend/screens/TabThree';

import LoginScreen from './frontend/screens/LoginScreen';
import SignupScreen from './frontend/screens/SignupScreen';

import ColorSet from './frontend/resources/themes/Global';

import AsyncStorage from '@react-native-async-storage/async-storage';


const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

export default function App() {
  const [isloggedin, setlogged] = useState(null);

  const detectLogin = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setlogged(true);
      } else {
        setlogged(false);
      }
    }
    catch (e) {
    }
  }

  useEffect(()=>{
    detectLogin()
  },[])

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {
          isloggedin == null || !isloggedin ?
          (<><Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} /></>) :
          (<Stack.Screen name="HomeScreen" component={HomeScreen} />)
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen(props) {
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