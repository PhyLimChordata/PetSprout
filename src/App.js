// React
import React, { useState, useMemo } from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useTheme } from '@react-navigation/native';

//Screens
import LoginScreen from './frontend/screens/Login';
import SignupScreen from './frontend/screens/Signup';
import VerifyEmailSignUpScreen from './frontend/screens/VerifyEmailSignUp';
import PasswordScreen from './frontend/screens/AccountRecovery';
import NewPasswordScreen from './frontend/screens/NewPassword';
import VerifyEmailPasswordScreen from './frontend/screens/VerifyEmailPassword';
import EvolutionScreen from './frontend/screens/Evolution';
import SettingsScreen from './frontend/screens/Settings';
import ProfileEditScreen from './frontend/screens/Profile';
import AchievementScreen from './frontend/screens/Achievement';
import AboutScreen from './frontend/screens/About';
import CollaboratorsScreen from './frontend/screens/Collaborators';
import SupportUsScreen from './frontend/screens/SupportUs';
import ReportABugScreen from './frontend/screens/ReportABug';
import FeedbackScreen from './frontend/screens/Feedback';
import HabitsScreen from './frontend/screens/Habits';
import CreateHabitScreen from './frontend/screens/PutHabits/CreateHabit';
import ComingSoonScreen from './frontend/screens/ComingSoon';
import ModifyHabitScreen from './frontend/screens/PutHabits/ModifyHabit';
import NamePetScreen from './frontend/screens/NamePet';
import AllHabitsScreen from './frontend/screens/AllHabits';
import PomodoroScreen from './frontend/screens/Pomodoro';
import PomodoroTasksScreen from './frontend/screens/PomodoroTasks';
import AcceptTermsAndConditionScreen from './frontend/screens/AcceptTermsAndCondition';
import AcceptPrivacyPolicyScreen from './frontend/screens/AcceptPrivacyPolicy';

// Colour Themes
import GreenLightTheme from './frontend/resources/themes/light/GreenTheme';
import OrangeLightTheme from './frontend/resources/themes/light/OrangeTheme';
import BlueLightTheme from './frontend/resources/themes/light/BlueTheme';
import PurpleLightTheme from './frontend/resources/themes/light/PurpleTheme';
import RedLightTheme from './frontend/resources/themes/light/RedTheme';
import GreenDarkTheme from './frontend/resources/themes/dark/GreenTheme';
import OrangeDarkTheme from './frontend/resources/themes/dark/OrangeTheme';
import BlueDarkTheme from './frontend/resources/themes/dark/BlueTheme';
import PurpleDarkTheme from './frontend/resources/themes/dark/PurpleTheme';
import RedDarkTheme from './frontend/resources/themes/dark/RedTheme';

import { AuthContext } from './frontend/Context';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
	// Global variables within the app
	
	// TOGGLE TO FALSE TO TURN OFF NOTIFICATIONS
	const [notificationsToggle, setNotificationsToggle] = useState("true");
	const [token, setToken] = useState(null);
	const [color, setColor] = useState('Green');
	const [logo, setLogo] = useState(
		require('./frontend/resources/images/Logo/LogoGreen.png'),
	);
	const [pet, setPet] = useState("egg");
	const [comingSoon, setComingSoon] = useState(
		require('./frontend/resources/images/Pets/ComingSoon/ComingSoonGreen.png'),
	);
	const [mode, setMode] = useState('light');
	const [refreshing, setRefreshing] = useState(false);

	const authContext = useMemo(() => {
		return {
			logIn: (generatedToken) => {
				setToken(generatedToken);
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
			changeRefreshing: (refreshMode) => {
				setRefreshing(refreshMode);
			},
			changeLogo: (logo) => {
				setLogo(logo);
			},
			changePet: (pet) => {
				setPet(pet);
			},
			changeComingSoon: (comingSoon) => {
				setComingSoon(comingSoon);
			},
			getNotificationsToggle: notificationsToggle,
			getToken: token,
			getColor: color,
			getLogo: logo,
			getPet: pet,
			getComingSoon: comingSoon,
			getMode: mode,
			getRefreshing: refreshing,
		};
	}, [
		notificationsToggle,
		setNotificationsToggle,
		token,
		setToken,
		color,
		setColor,
		mode,
		setMode,
		logo,
		setLogo,
		setPet,
		setComingSoon,
		refreshing,
		setRefreshing,
	]);

	// "Main" or start of program
	return (
		<AuthContext.Provider value={authContext}>
			{mode == 'light' ? (
				color == 'Green' ? (
					<NavContainer token={token} theme={GreenLightTheme} />
				) : color == 'Orange' ? (
					<NavContainer token={token} theme={OrangeLightTheme} />
				) : color == 'Blue' ? (
					<NavContainer token={token} theme={BlueLightTheme} />
				) : color == 'Purple' ? (
					<NavContainer token={token} theme={PurpleLightTheme} />
				) : color == 'Red' ? (
					<NavContainer token={token} theme={RedLightTheme} />
				) : (
					<NavContainer token={token} theme={GreenLightTheme} />
				)
			) : mode == 'dark' ? (
				color == 'Green' ? (
					<NavContainer token={token} theme={GreenDarkTheme} />
				) : color == 'Orange' ? (
					<NavContainer token={token} theme={OrangeDarkTheme} />
				) : color == 'Blue' ? (
					<NavContainer token={token} theme={BlueDarkTheme} />
				) : color == 'Purple' ? (
					<NavContainer token={token} theme={PurpleDarkTheme} />
				) : color == 'Red' ? (
					<NavContainer token={token} theme={RedDarkTheme} />
				) : (
					<NavContainer token={token} theme={GreenDarkTheme} />
				)
			) : (
				<NavContainer token={token} theme={GreenLightTheme} />
			)}
		</AuthContext.Provider>
	);
}

// Determines the appropriate stack to use based on token - colour theme and token are provided
function NavContainer(props) {
	return (
		<NavigationContainer theme={props.theme}>
			{props.token ? (
				<Stack.Navigator headerMode='none'>
					<Stack.Screen
						name='AcceptTermsAndConditionScreen'
						component={AcceptTermsAndConditionScreen}
						initialParams={{isAcceptScreen: true}}
					/>
					<Stack.Screen
						name='AcceptPrivacyPolicyScreen'
						component={AcceptPrivacyPolicyScreen}
						initialParams={{isAcceptScreen: true}}
					/>
					<Stack.Screen name='HomeScreen' component={HomeScreen} />
					<Stack.Screen
						name='AchievementScreen'
						component={AchievementScreen}
					/>
					<Stack.Screen name='ProfileScreen' component={ProfileEditScreen} />
					<Stack.Screen name='SettingsScreen' component={SettingsScreen} />
					<Stack.Screen
						name='CreateHabitScreen'
						component={CreateHabitScreen}
					/>
					<Stack.Screen
						name='ModifyHabitScreen'
						component={ModifyHabitScreen}
					/>
					<Stack.Screen name='SupportUsScreen' component={SupportUsScreen} />
					<Stack.Screen name='AboutScreen' component={AboutScreen} />
					<Stack.Screen
						name='CollaboratorsScreen'
						component={CollaboratorsScreen}
					/>
					<Stack.Screen name='FeedbackScreen' component={FeedbackScreen} />
					<Stack.Screen name='ReportABugScreen' component={ReportABugScreen} />
					<Stack.Screen name='AllHabitsScreen' component={AllHabitsScreen} />

					<Stack.Screen
						name='PomodoroTasksScreen'
						component={PomodoroTasksScreen}
					/>
					
					<Stack.Screen
						name='TermsAndConditionScreen'
						component={AcceptTermsAndConditionScreen}
						initialParams={{isAcceptScreen: false}}
					/>
					
					<Stack.Screen
						name='PrivacyPolicyScreen'
						component={AcceptPrivacyPolicyScreen}
						initialParams={{isAcceptScreen: false}}
					/>
					<Stack.Screen name='EvolutionScreen' component={EvolutionScreen} />
					<Stack.Screen name='NamePetScreen' component={NamePetScreen} />
					<Stack.Screen name='PomodoroScreen' component={PomodoroScreen} />
				</Stack.Navigator>
			) : (
				<Stack.Navigator headerMode='none'>
					<Stack.Screen
						name='LoginScreen'
						component={LoginScreen}
						options={{ title: 'Login' }}
					/>
					<Stack.Screen
						name='SignupScreen'
						component={SignupScreen}
						options={{ title: 'Sign up' }}
					/>
					<Stack.Screen
						name='VerifyEmailSignUp'
						component={VerifyEmailSignUpScreen}
						options={{ title: 'Verify Email Sign Up' }}
					/>
					<Stack.Screen
						name='PasswordScreen'
						component={PasswordScreen}
						options={{ title: 'Forgot Password' }}
					/>
					<Stack.Screen
						name='NewPassword'
						component={NewPasswordScreen}
						options={{ title: 'New Password' }}
					/>
					<Stack.Screen
						name='VerifyEmailPassword'
						component={VerifyEmailPasswordScreen}
						options={{ title: 'Verify Email Password' }}
					/>
				</Stack.Navigator>
			)}
		</NavigationContainer>
	);
}

// What the user will see upon logging in
function HomeScreen(props) {
	const { colors } = useTheme();
	const [modalVisible, setModalVisible] = useState(false);
	return (
		<>
			<Tab.Navigator
				initialRouteName='TabOne'
				backBehavior='order'
				tabBarOptions={{
					activeTintColor: colors.Quinary,
					inactiveTintColor: colors.background,
					style: { backgroundColor: colors.Tertiary },
				}}
			>
				<Tab.Screen
					name='Habit'
					component={HabitsScreen}
					options={{
						tabBarLabel: 'Habit',
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons
								name='clipboard-check'
								color={color}
								size={size}
							/>
						),
					}}
				/>
				<Tab.Screen
					name='Calendar'
					component={Calendar}
					options={{
						tabBarLabel: 'Calendar',
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons
								name='calendar'
								color={color}
								size={size}
							/>
						),
					}}
				/>
				<Tab.Screen
					name={'TabMiddle'}
					component={CreateHabitScreen}
					listeners={{
						tabPress: (e) => {
							props.navigation.navigate('CreateHabitScreen');
							e.preventDefault();
						},
					}}
					options={{
						tabBarLabel: () => {
							return null;
						},
						tabBarIcon: ({ focused }) => (
							<Image
								source={require('./frontend/resources/images/PlusSign.png')}
								resizeMode='contain'
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
					name='Pomodoro'
					component={Pomodoro}
					options={{
						tabBarLabel: 'Pomodoro',
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons name='clock' color={color} size={size} />
						),
					}}
				/>
				<Tab.Screen
					name='Reflect'
					component={Reflect}
					options={{
						tabBarLabel: 'Reflect',
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons
								name='notebook'
								color={color}
								size={size}
							/>
						),
					}}
				/>
			</Tab.Navigator>
			{/* <BottomMenu
				navigation={props.navigation}
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
			/> */}
		</>
	);
}

// TODO: Replace the below with imported screens
function Calendar(props) {
	return <ComingSoonScreen title='Calendar' navigation={props.navigation} />;
}

function Pomodoro(props) {
	return <PomodoroScreen title='Pomodoro' navigation={props.navigation} />;
}
function PomodoroTasks(props) {
    return <CreateHabitScreen title='Tasks' navigation={props.navigation} />;
}
function Reflect(props) {
	return <ComingSoonScreen title='Reflect' navigation={props.navigation} />;
}

// The 'create' button in the bottom navigation bar
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
