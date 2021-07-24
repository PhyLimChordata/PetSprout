import React, {useState, useEffect, useMemo} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TabOne from './frontend/screens/TabOne';
import TabTwo from './frontend/screens/TabTwo';
import TabThree from './frontend/screens/TabThree';

import ColorSet from './frontend/resources/themes/Global'
import LoginScreen from './frontend/screens/LoginScreen';
import SignupScreen from './frontend/screens/SignupScreen';

import { AuthContext } from './frontend/screens/context';
import Animated from 'react-native-reanimated';
import { View, TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity activeOpacity={1} style={{top:-30, width:70, height:70, justifyContent:"center", alignItems:"center"}} onPress={onPress}>
        <View style={{ backgroundColor:ColorSet.QuaternaryGreen, width:70, height:70,borderRadius:35}}>
            {children}
        </View>
    </TouchableOpacity>)

const animation = new Animated.Value(0);

//import a splash screen

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isloggedin, setlogged] = useState(true);
  //default should be null
  const [token, setToken] = useState(null);

  const authContext = useMemo(() => {
    return {
        signIn: () => {
            setIsLoading(false);
            setToken('asdf');
        },
        signUp: () => {
            setIsLoading(false);
            setToken('');
        },
        signOut: () => {
            setIsLoading(false);
            setToken(null);
        }
    }
  }, []);

  useEffect(()=>{
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    // detectLogin();
  },[]);

//   if (isLoading) {
//     // return <Splash/>
//   }

  return (
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
        {token ? 
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
            </Stack.Navigator>
         : <Stack.Navigator headerMode="none">
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{title: 'Login'}}/>
                <Stack.Screen name="SignupScreen" component={SignupScreen} options={{title: 'Sign up'}}/> 
            </Stack.Navigator>
        }
        </NavigationContainer>
      </AuthContext.Provider>
  );
}

function HomeScreen(props) {
    const rotate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });
    return (
        <NavigationContainer independent={true}>
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
    )
  }
