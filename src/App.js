import React, {useState, useEffect} from 'react';
import {Image, Animated} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from "@react-navigation/stack";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TabOne from './frontend/screens/TabOne';
import TabTwo from './frontend/screens/TabTwo';
import TabThree from './frontend/screens/TabThree';
import HabitScreen from './frontend/screens/HabitsScreen';

import ColorSet from './frontend/resources/themes/Global';

import AsyncStorage from '@react-native-async-storage/async-storage';


const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

export default function App() {
  const [isloggedin, setlogged] = useState(false);

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
      <Tab.Navigator  initialRouteName="TabOne" backBehavior="order" tabBarOptions={{
          activeTintColor: ColorSet.QuinaryGreen,
          inactiveTintColor: ColorSet.white,
          style: { backgroundColor: ColorSet.TertiaryGreen}

      }}>
        <Tab.Screen name="Calendar" component={TabOne} options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="calendar" color={color} size={size} />)}}/>
          <Tab.Screen name="Tab" component={TabThree}
                      options={{
                          tabBarLabel: 'Temp1',
                          tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="home" color={color} size={size} />)}}
          />
        <Tab.Screen name={'TabMiddle'} component={TabTwo}
                    listeners={{
                        tabPress: e => {
                            // rotate
                            Animated.timing(animation, {
                                toValue: 1,
                                duration: 275,
                                useNativeDriver: false,
                            }).start(() => {
                                animation.setValue(0);
                            });
                            // Prevent default action
                            e.preventDefault();
                        }
                    }}
                    options={{
                        tabBarLabel:() => {return null},
                        tabBarIcon: ({focused}) => (
                            <Animated.Image
                            source={require("./frontend/resources/images/plus-sign.png")}
                            resizeMode="contain"
                            style={{
                                width:35,
                                height:35,
                                tintColor: ColorSet.white,
                                transform: [ { rotate: rotate }]
                            }}
                            />
                        ),
                        // tabBarButton: (props) => (
                        //     <CustomTabBarButton {... props}/>
                        // ),
                    }}

        />
          <Tab.Screen name="TabFour" component={TabThree}
                      options={{
                          tabBarLabel: 'Temp2',
                          tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="home" color={color} size={size} />)}}
          />
        <Tab.Screen name="TabThree" component={TabThree}
                    options={{
                        tabBarLabel: 'Habit',
                        tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="clipboard-check" color={color} size={size} />)}}
        />
        </Tab.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen(props) {
  return (
   <NavigationContainer independent={true}>
      <Tab.Navigator  initialRouteName="TabOne" backBehavior="order" tabBarOptions={{
            activeTintColor: ColorSet.examplePrimary}}>
        <Tab.Screen name="TabOne" component={HabitScreen} options={{
          tabBarLabel: 'TabOne',
          tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="home" color={color} size={size} />)}}/>
        <Tab.Screen name="TabTwo" component={TabTwo} />
        <Tab.Screen name="TabThree" component={TabThree} />
        </Tab.Navigator>    
    </NavigationContainer>
  )
}