import React, {useState, useEffect, useMemo} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {Image, View, TouchableOpacity, Animated} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TabOne from './frontend/screens/TabOne';
import TabTwo from './frontend/screens/TabTwo';
import TabThree from './frontend/screens/TabThree';
import BottomPopup from "./frontend/components/BottomPopup";
import LoginScreen from './frontend/screens/LoginScreen';
import SignupScreen from './frontend/screens/SignupScreen';

import { AuthContext } from './frontend/screens/context';
import ColorSet from './frontend/resources/themes/Global';
import Animated from 'react-native-reanimated';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity activeOpacity={1} style={{top:-30, width:70, height:70, justifyContent:"center", alignItems:"center"}} onPress={onPress}>
        <View style={{ backgroundColor:ColorSet.Green.Quaternary, width:70, height:70,borderRadius:35}}>
            {children}
        </View>
    </TouchableOpacity>)

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [token, setToken] = useState(null);

	const authContext = useMemo(() => {
		return {
			logIn: (token) => {
				setToken(token);
			},
			signUp: () => {
				setToken('temporaryToken');
			},
			signOut: () => {
				setToken(null);
			},
		};
	}, []);

	return (
		<AuthContext.Provider value={authContext}>
			<NavigationContainer>
				{token ? (
					<Stack.Navigator headerMode="none">
						<Stack.Screen name="HomeScreen" component={HomeScreen} />
					</Stack.Navigator>
				) : (
					<Stack.Navigator headerMode="none">
						<Stack.Screen
							name="LoginScreen"
							component={LoginScreen}
							options={{ title: 'Login' }}
						/>
						<Stack.Screen
							name="SignupScreen"
							component={SignupScreen}
							options={{ title: 'Sign up' }}
						/>
					</Stack.Navigator>
				)}
			</NavigationContainer>
		</AuthContext.Provider>
	);
}
  function HomeScreen(props) {
    return (
      <>
    <NavigationContainer>
      <Tab.Navigator  initialRouteName="TabOne" backBehavior="order" tabBarOptions={{
          activeTintColor: ColorSet.Green.QuinaryGreen,
          inactiveTintColor: ColorSet.white,
          style: { backgroundColor: ColorSet.Green.Tertiary}

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
                            setModalVisible(true);
                            e.preventDefault();
                        }
                    }}
                    options={{
                        tabBarLabel:() => {return null},
                        tabBarIcon: ({focused}) => (
                            <Image
                            source={require("./frontend/resources/images/plus-sign.png")}
                            resizeMode="contain"
                            style={{
                                width:35,
                                height:35,
                                tintColor: ColorSet.white,
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
                          tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="close-thick" color={color} size={size} />)}}
          />
        <Tab.Screen name="TabThree" component={TabThree}
                    options={{
                        tabBarLabel: 'Habit',
                        tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="clipboard-check" color={color} size={size} />)}}
        />
        </Tab.Navigator>
    </NavigationContainer>
          <BottomPopup modalVisible={modalVisible} setModalVisible={setModalVisible}/>
      </>
  );
}
