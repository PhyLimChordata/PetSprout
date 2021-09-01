import React, { useState, useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Image, View, TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TabOne from './frontend/screens/TabOne';
import TabTwo from './frontend/screens/TabTwo';
import TabThree from './frontend/screens/TabThree';

import ProfileEdit from './frontend/screens/ViewEditProfile';
import AchievementPage from './frontend/screens/AchievementPage';
import BottomMenu from './frontend/components/BottomMenu';
import HabitsScreen from './frontend/screens/HabitsScreen';
import ComingSoon from './frontend/screens/ComingSoon';
import Collaborators from './frontend/screens/Collaborators';

import CreateHabitScreen from './frontend/screens/CreateHabitScreen';
import LoginScreen from './frontend/screens/LoginScreen';
import SignupScreen from './frontend/screens/SignupScreen';
import VerifyEmailSignUpScreen from './frontend/screens/VerifyEmailSignUpScreen';
import PasswordScreen from './frontend/screens/PasswordScreen';
import NewPasswordScreen from './frontend/screens/NewPasswordScreen';
import VerifyEmailPasswordScreen from './frontend/screens/VerifyEmailPasswordScreen';

import { AuthContext } from './frontend/context';
import ColorSet from './frontend/resources/themes/Global';
import SettingsPage from "./frontend/screens/SettingsPage";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
	<TouchableOpacity
		activeOpacity={1}
		style={{
			top: -30,
			width: 70,
			height: 70,
			justifyContent: 'center',
			alignItems: 'center',
		}}
		onPress={onPress}
	>
		<View
			style={{
				backgroundColor: ColorSet.Green.Quaternary,
				width: 70,
				height: 70,
				borderRadius: 35,
			}}
		>
			{children}
		</View>
	</TouchableOpacity>
);

export default function App() {
	const [token, setToken] = useState(null);
	const authContext = useMemo(() => {
		return {
			logIn: (token) => {
				setToken(token);
			},
			signOut: () => {
				setToken(null);
			},
			getToken: token
		};
	}, [token, setToken]);

	return (
		<AuthContext.Provider value={authContext}>
			<NavigationContainer>
				{token ? (
					<Stack.Navigator headerMode="none">
						<Stack.Screen name="HomeScreen" component={HomeScreen} />
						<Stack.Screen name="SettingsScreen" component={SettingsPage} />
						<Stack.Screen name="CreateHabitScreen" component={CreateHabitScreen} />
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
						<Stack.Screen
							name="VerifyEmailSignUpScreen"
							component={VerifyEmailSignUpScreen}
							options={{ title: 'Verify Email Sign Up' }}
						/>
						<Stack.Screen
							name="PasswordScreen"
							component={PasswordScreen}
							options={{ title: 'Forgot Password' }}
						/>
						<Stack.Screen
							name="NewPasswordScreen"
							component={NewPasswordScreen}
							options={{ title: 'New Password' }}
						/>
							<Stack.Screen
							name="VerifyEmailPasswordScreen"
							component={VerifyEmailPasswordScreen}
							options={{ title: 'Verify Email Password' }}
						/>
					</Stack.Navigator>
				)}
			</NavigationContainer>
		</AuthContext.Provider>
	);
}
function HomeScreen(props) {
	const [modalVisible, setModalVisible] = useState(false);
	return (
		<>
			<Tab.Navigator
				initialRouteName="TabOne"
				backBehavior="order"
				tabBarOptions={{
					activeTintColor: ColorSet.Green.Quinary,
					inactiveTintColor: ColorSet.white,
					style: { backgroundColor: ColorSet.Green.Tertiary },
				}}
			>
				<Tab.Screen
					name="Habit"
					component={HabitsScreen}
					options={{
						tabBarLabel: 'Habit',
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons
								name="clipboard-check"
								color={color}
								size={size}
							/>
						),
					}}
				/>
				<Tab.Screen
					name="Calender"
					component={Calendar}
					options={{
						tabBarLabel: 'Calender',
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons
								name="calendar"
								color={color}
								size={size}
							/>
						),
					}}
				/>
				<Tab.Screen
					name={'TabMiddle'}
					component={TabTwo}
					listeners={{
						tabPress: (e) => {
							setModalVisible(true);
							e.preventDefault();
						},
					}}
					options={{
						tabBarLabel: () => {
							return null;
						},
						tabBarIcon: ({ focused }) => (
							<Image
								source={require('./frontend/resources/images/plus-sign.png')}
								resizeMode="contain"
								style={{
									width: 35,
									height: 35,
									tintColor: ColorSet.white,
								}}
							/>
						),
						tabBarButton: (props) => <CustomTabBarButton {...props} />,
					}}
				/>
				<Tab.Screen
					name="Pomodoro"
					component={Pomodoro}
					options={{
						tabBarLabel: 'Pomodoro',
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons name="clock" color={color} size={size} />
						),
					}}
				/>
				<Tab.Screen
					name="Reflect"
					component={Reflect}
					options={{
						tabBarLabel: 'Reflect',
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons
								name="notebook"
								color={color}
								size={size}
							/>
						),
					}}
				/>
			</Tab.Navigator>
			<BottomMenu
				navigation={props.navigation}
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
			/>
		</>
	);
}
function Calendar(props) {
	return <ComingSoon title="Calendar"></ComingSoon>;
}

function Pomodoro(props) {
	return <ComingSoon title="Pomodoro"></ComingSoon>;
}

function Reflect(props) {
	return <ComingSoon title="Reflect"></ComingSoon>;
}
