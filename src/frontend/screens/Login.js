import React, { useState, useContext, useEffect } from 'react';

import { View, Text, TextInput, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';

import styles from '../styling/Authentication';

import { AuthContext } from '../Context';
import { Checkbox } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store'
import { useTheme } from '@react-navigation/native';
import Colours from '../resources/themes/Colours';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Localization from 'expo-localization';
import HabitsScreen from './Habits';
import Habits from '../components/Habits';
import androidSafeAreaView from '../styling/AndroidSafeAreaView';

function Login(props) {
	const [primaryInfo, setPrimaryInfo] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [status, setStatus] = useState('unchecked')

	const { colors } = useTheme();
	const style = styles(colors);

	const checkboxStyle = (Platform.OS == 'ios' && style.appleCheck);

	useEffect(() => {
		getValueFor('username', setPrimaryInfo);
		getValueFor('password', setPassword);
		getValueFor('status', setStatus)
	}, [])

	const checkSwitch = () => {
		if (status == 'unchecked') {setStatus('checked');}
		else {setStatus('unchecked');}
	}

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

	const saveLogin = async (key, value) => {
		await SecureStore.setItemAsync(key, value);
	}

	const clear = async () => {
		await SecureStore.deleteItemAsync('username');
		await SecureStore.deleteItemAsync('password');
		await SecureStore.deleteItemAsync('status');
	}

	const getValueFor = async (key, setFunc) => {
		let result = await SecureStore.getItemAsync(key);
		if (result) {setFunc(result);}
		
	}

	const registerForPushNotificationsAsync = async () => {
		if (Constants.isDevice) {
			const { status: existingStatus } =
				await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;
			if (existingStatus !== 'granted') {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			if (finalStatus !== 'granted') {
				alert('Failed to get push token for push notification!');
				return;
			}
			const token = (await Notifications.getExpoPushTokenAsync()).data;
			return token;
		} else {
			alert('Must use physical device for Push Notifications');
		}
	};

	const attemptLogin = () => {
		let login_body = {
			primaryInfo: primaryInfo,
			password: password,
			date: new Date().toString(),
			timezone: Localization.timezone,
		}
		if (getNotificationsToggle) {
			registerForPushNotificationsAsync().then((pushToken) => {
				login_body['expoPushToken'] = pushToken
				runLogin();
			});
		} else {
			runLogin();
		}

		const runLogin = () => {
			fetch('http://3.15.57.200:5000/api/v1.0.0/user/login', {
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
					if (status == 'checked') {
						saveLogin('username', primaryInfo);
						saveLogin('password', password);
						saveLogin('status', status);
					}
					else {clear();}	
					res.json().then((data) => {
						fetch('http://3.15.57.200:5000/api/v1.0.0/doc/didAcceptPolicy', {
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
								'authentication-token': data.token,
							}
						})
						.then((privRes) => {
							fetch('http://3.15.57.200:5000/api/v1.0.0/doc/didAcceptTerms', {
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
						.then(() => {logIn(data.token)});
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
		<TouchableWithoutFeedback
			onPress={() => {Keyboard.dismiss()}}
		>
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
					autoCapitalize={'none'}
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
			<View style = {style.checkboxContainer}>
				<View style={checkboxStyle}>
				<Checkbox
					status = {status}
					onPress = {checkSwitch}
					uncheckedColor = {style.textTop.color}
					color = {style.textTop.color}
				/>
				</View>
				<Text style = {style.forgotPassword}>
					Remember Me
				</Text>
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
		</TouchableWithoutFeedback>
	);
}

export default Login;
