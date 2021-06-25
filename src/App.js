import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {View, Image, TouchableOpacity} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TabOne from './frontend/screens/TabOne';
import TabTwo from './frontend/screens/TabTwo';
import TabThree from './frontend/screens/TabThree';

import ColorSet from './frontend/resources/themes/Global'

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity activeOpacity={1} style={{top:-30, width:70, height:70, justifyContent:"center", alignItems:"center"}} onPress={onPress}>
        <View style={{ backgroundColor:ColorSet.QuaternaryGreen, width:70, height:70,borderRadius:35}}>
            {children}
        </View>
    </TouchableOpacity>)

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator  initialRouteName="TabOne" backBehavior="order" tabBarOptions={{
          activeTintColor: ColorSet.QuinaryGreen,
          inactiveTintColor: ColorSet.white,
          style: { backgroundColor: ColorSet.SecondaryGreen}

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
                    options={{
                        tabBarLabel:() => {return null},
                        tabBarIcon: ({focused}) => (
                            <Image
                            source={require("./frontend/resources/assets/plus-sign.png")}
                            resizeMode="contain"
                            style={{
                                width:35,
                                height:35,
                                tintColor: focused ? ColorSet.QuinaryGreen :ColorSet.white
                            }}
                            />
                        ),
                        tabBarButton: (props) => (
                            <CustomTabBarButton {... props}/>
                        ),
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
