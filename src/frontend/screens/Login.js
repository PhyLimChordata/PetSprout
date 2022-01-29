import React, { useState, useContext } from 'react';

import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';

import styles from '../styling/Authentication';

import { AuthContext } from '../Context';
import { useTheme } from '@react-navigation/native';
import Colours from '../resources/themes/Colours';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import HabitsScreen from './Habits';
import Habits from '../components/Habits';

function Login(props) {
	const [primaryInfo, setPrimaryInfo] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const { colors } = useTheme();

	const [inputStyle, setInputStyle] = useState({
		backgroundColor: colors.Secondary,
		padding: 10,
		borderWidth: 0,
		borderStyle: 'solid',
		fontSize: 15,
		borderRadius: 5,
		marginBottom: 20,
		width: '100%',
	});

	const [textStyle, setTextStyle] = useState({
		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom: 5,
		color: colors.Quaternary,
	});

	const { getNotificationsToggle, logIn, setTCAccepted, setPrivacyAccepted } 
		= useContext(AuthContext);

	const updatingPrimaryInput = (text) => {
		setPrimaryInfo(text);
		setError('');
		setInputStyle({
			backgroundColor: colors.Secondary,
			padding: 10,
			borderWidth: 0,
			borderStyle: 'solid',
			fontSize: 15,
			borderRadius: 5,
			marginBottom: 20,
			width: '100%',
		});
		setTextStyle({
			fontSize: 20,
			fontWeight: 'bold',
			paddingBottom: 5,
			color: colors.Quaternary,
		});
	};

	const updatingPasswordInput = (text) => {
		setPassword(text);
		setError('');
		setInputStyle({
			backgroundColor: colors.Secondary,
			padding: 10,
			borderWidth: 0,
			borderStyle: 'solid',
			borderRadius: 5,
			marginBottom: 20,
			width: '100%',
		});
		setTextStyle({
			fontSize: 20,
			fontWeight: 'bold',
			paddingBottom: 5,
			color: colors.Quaternary,
		});
	};

	const registerForPushNotificationsAsync = async () => {
		if (Constants.isDevice) {
			const { status: existingStatus } =
				await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;
			if (existingStatus !== 'granted') {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			console.log('Push Notifications: ' + finalStatus);
			if (finalStatus !== 'granted') {
				alert('Failed to get push token for push notification!');
				return;
			}
			const token = (await Notifications.getExpoPushTokenAsync()).data;
			console.log(token);
			return token;
		} else {
			alert('Must use physical device for Push Notifications');
		}
	};

	const attemptLogin = () => {
		console.log(`Logging in with notifications: ${getNotificationsToggle}`);
		let login_body = {
			primaryInfo: primaryInfo,
			password: password,
			date: new Date().toString(),
		}
		if (getNotificationsToggle) {
			console.log(
				`Clientside Notifications  (${getNotificationsToggle}) are enabled. Toggle is located in App.js.`,
			);
			registerForPushNotificationsAsync().then((pushToken) => {
				login_body['expoPushToken'] = pushToken
				runLogin();
			});
		} else {
			console.log(
				`Clientside Notifications (${getNotificationsToggle}) are DISABLED. Toggle is located in App.js.`,
			);
			runLogin();
		}

		const runLogin = () => {
			fetch('http://localhost:5000/api/v1.0.0/user/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(login_body),
			})
			.then((res) => {
				let token = -1;
				if (primaryInfo == '' || password == '') {
					setError('Please enter all parameters');
				} else if (res.status == 200) {
					res.json().then((data) => {
						fetch('http://localhost:5000/api/v1.0.0/doc/didAcceptPolicy', {
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
								'authentication-token': data.token,
							}
						})
						.then((privRes) => {
							fetch('http://localhost:5000/api/v1.0.0/doc/didAcceptTerms', {
								method: 'GET',
								headers: {
									'Content-Type': 'application/json',
									'authentication-token': data.token,
								}
							})
							.then((termsRes) => {
								privRes.json().then((privData) => setPrivacyAccepted(privData.accepted))
								termsRes.json().then((termsData) => setTCAccepted(termsData.accepted))
							});
						})
						.then(() => {console.log("Setting token"); logIn(data.token)});
					});
				} else if (res.status == 404 || res.status == 401) {
					setError('The provided information is incorrect');
				} else if (res.status == 400) {
					setError('User has not been verified');
				} else if (res.status == 500) {
					setError('Something wrong happened internally...');
				}
	
				if (res.status != 200) {
					setInputStyle({
						backgroundColor: Colours.Red.NotSelected,
						padding: 10,
						fontSize: 15,
						borderRadius: 5,
						marginBottom: 20,
						width: '100%',
					});
					setTextStyle({
						fontSize: 20,
						fontWeight: 'bold',
						paddingBottom: 5,
						color: Colours.Red.Error,
					});
				}
			})
			.catch(() => setError('Something wrong happened internally... :('));
		}
	};

	const { getLogo } = useContext(AuthContext);

	return (
		<View style={styles(colors).container}>
			<Image style={styles(colors).authenticationLogo} source={getLogo} />
			<View style={styles(colors).inputContainer}>
				<Text style={textStyle}>Email or Username</Text>
				<TextInput
					style={inputStyle}
					value={primaryInfo}
					placeholder='Please enter an Email or Username'
					onChangeText={(text) => updatingPrimaryInput(text)}
					autoCapitalize={'none'}
				></TextInput>

				<Text style={textStyle}>Password</Text>
				<TextInput
					style={inputStyle}
					secureTextEntry={true}
					value={password}
					placeholder='*********'
					onChangeText={(text) => updatingPasswordInput(text)}
				></TextInput>
				<View style={styles(colors).forgotView}>
					<TouchableOpacity
						style={{
							width: '100%',
						}}
						activeOpacity={0.6}
						onPress={() => props.navigation.push('PasswordScreen')}
					>
						<Text style={styles(colors).forgotPassword}>
							Need help Logging in?
						</Text>
					</TouchableOpacity>
					<Text style={styles(colors).errorMessage}>{error}</Text>
				</View>
			</View>
			<TouchableOpacity
				activeOpacity={0.6}
				style={styles(colors).authenticationButton}
				onPress={() => attemptLogin()}
			>
				<Text style={styles(colors).authenticationButtonText}>Login</Text>
			</TouchableOpacity>
			<View style={{ flexDirection: 'row' }}>
				<Text style={styles(colors).subText}>New User?</Text>
				<TouchableOpacity
					activeOpacity={0.6}
					onPress={() => props.navigation.push('SignupScreen')}
				>
					<Text style={styles(colors).signupText}> Sign up</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default Login;
