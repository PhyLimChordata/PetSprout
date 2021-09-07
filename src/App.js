import React, { useState, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Image, View, TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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

import greenLightTheme from './frontend/resources/themes/light/greenTheme';
import orangeLightTheme from './frontend/resources/themes/light/orangeTheme';
import blueLightTheme from './frontend/resources/themes/light/blueTheme';
import purpleLightTheme from './frontend/resources/themes/light/purpleTheme';
import redLightTheme from './frontend/resources/themes/light/redTheme';
import greenDarkTheme from './frontend/resources/themes/dark/greenTheme';
import orangeDarkTheme from './frontend/resources/themes/dark/orangeTheme';
import blueDarkTheme from './frontend/resources/themes/dark/blueTheme';
import purpleDarkTheme from './frontend/resources/themes/dark/purpleTheme';
import redDarkTheme from './frontend/resources/themes/dark/redTheme';

import SettingsPage from './frontend/screens/SettingsPage';

import { useTheme } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
	const [token, setToken] = useState(null);
	const [color, setColor] = useState('green');
	const [mode, setMode] = useState('light');
	const authContext = useMemo(() => {
		return {
			logIn: (token) => {
				setToken(token);
			},
			signOut: () => {
				setToken(null);
			},
			changeColorTheme: (selectedColor) => {
				setColor(selectedColor);
			},
			changeModeTheme: (selectedMode) => {
				setMode(selectedMode);
			},
			getToken: token,
			getColor: color,
			getMode: mode,
		};
	}, [token, setToken, color, setColor, mode, setMode]);

	return (
		<AuthContext.Provider value={authContext}>
			{mode == 'light' ? (color == 'green' ? <NavContainer token={token} theme={greenLightTheme}/> : color == 'orange' ? <NavContainer token={token} theme={orangeLightTheme}/> :  color == 'blue' ? <NavContainer token={token} theme={blueLightTheme}/> :  color == 'purple' ? <NavContainer token={token} theme={purpleLightTheme}/> : color == 'red' ? <NavContainer token={token} theme={redLightTheme}/> : <NavContainer token={token} theme={greenLightTheme}/>) 
			: mode == 'dark' ?  (color == 'green' ? <NavContainer token={token} theme={greenDarkTheme}/> : color == 'orange' ? <NavContainer token={token} theme={orangeDarkTheme}/> :  color == 'blue' ? <NavContainer token={token} theme={blueDarkTheme}/> :  color == 'purple' ? <NavContainer token={token} theme={purpleDarkTheme}/> : color == 'red' ? <NavContainer token={token} theme={redDarkTheme}/> : <NavContainer token={token} theme={greenDarkTheme}/>) 
			: <NavContainer token={token} theme={greenLightTheme}/>}
		</AuthContext.Provider>
	);
}

function NavContainer(props) {
	return (
		<NavigationContainer theme={props.theme}>
			{props.token ? (
				<Stack.Navigator headerMode="none">
					<Stack.Screen name="HomeScreen" component={HomeScreen} />
					<Stack.Screen name="SettingsScreen" component={SettingsPage} />
					<Stack.Screen
						name="CreateHabitScreen"
						component={CreateHabitScreen}
					/>
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
	);
}

function HomeScreen(props) {
	const { colors } = useTheme();
	const [modalVisible, setModalVisible] = useState(false);
	return (
		<>
			<Tab.Navigator
				initialRouteName="TabOne"
				backBehavior="order"
				tabBarOptions={{
					activeTintColor: colors.Quinary,
					inactiveTintColor: colors.background,
					style: { backgroundColor: colors.Tertiary },
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
					component={ComingSoon}
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
									tintColor: colors.background,
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

function CustomTabBarButton({ children, onPress }) {
	const { colors } = useTheme();
	return (
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
					backgroundColor: colors.Quaternary,
					width: 70,
					height: 70,
					borderRadius: 35,
				}}
			>
				{children}
			</View>
		</TouchableOpacity>
	);
}
