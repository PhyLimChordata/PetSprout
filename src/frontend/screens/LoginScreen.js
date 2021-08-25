import React, { useState, useContext } from 'react';

import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';

import styles from '../styling/Authentication';
import ColorSet from '../resources/themes/Global';

import { AuthContext } from './context';

function LoginScreen(props) {
	const [primaryInfo, setPrimaryInfo] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [inputStyle, setInputStyle] = useState({
		backgroundColor: ColorSet.Green.Secondary,
		padding: 10,
		borderWidth: 0,
		borderStyle: 'solid',
		fontSize: 15,
		borderRadius: 5,
		marginBottom: 20,
		width: 300,
	});
	const { logIn } = useContext(AuthContext);

	const updatingPrimaryInput = (text) => {
		setPrimaryInfo(text);
		setError('');
		setInputStyle({
			backgroundColor: ColorSet.Green.Secondary,
			padding: 10,
			borderWidth: 0,
			borderStyle: 'solid',
			fontSize: 15,
			borderRadius: 5,
			marginBottom: 20,
			width: 300,
		});
	};

	const updatingPasswordInput = (text) => {
		setPassword(text);
		setError('');
		setInputStyle({
			backgroundColor: ColorSet.Green.Secondary,
			padding: 10,
			borderWidth: 0,
			borderStyle: 'solid',
			fontSize: 15,
			borderRadius: 5,
			marginBottom: 20,
			width: 300,
		});
	};

	const attemptLogin = () => {
		fetch('http://localhost:5000/api/v1.0.0/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				primaryInfo: primaryInfo,
				password: password,
				date: new Date(),
			}),
		})
			.then((res) => {
				if (primaryInfo == '' || password == '') {
					setError('Please enter all parameters');
				} else if (res.status == 200) {
					res.json().then((data) => {
						logIn(data.token);
					});
				} else if (res.status == 404 || res.status == 401) {
					setError('The provided information is incorrect');
				} else if (res.status == 400) {
					setError('User has not been verified');
				} else if (res.status == 500) {
					setError('Something wrong happened internally...');
				}
				setInputStyle({
					backgroundColor: ColorSet.Green.Secondary,
					padding: 10,
					borderWidth: 3,
					borderColor: 'red',
					borderStyle: 'solid',
					fontSize: 15,
					borderRadius: 5,
					marginBottom: 20,
					width: 300,
				});
			})
			.catch();
	};

	return (
		<View style={styles.container}>
			<Image
				style={styles.AuthenticationLogo}
				source={require('../resources/images/Logo.png')}
			/>
			<View style={styles.inputContainer}>
				<Text style={styles.AuthenticationText}>Email or Username</Text>
				<TextInput
					style={inputStyle}
					value={primaryInfo}
					placeholder="Please enter an Email or Username"
					onChangeText={(text) => updatingPrimaryInput(text)}
				></TextInput>

				<Text style={styles.AuthenticationText}>Password</Text>
				<TextInput
					style={inputStyle}
					secureTextEntry={true}
					value={password}
					placeholder="*********"
					onChangeText={(text) => updatingPasswordInput(text)}
				></TextInput>
				<View style={styles.forgotView}>
					<TouchableOpacity
						activeOpacity={0.6}
						onPress={() => props.navigation.push('PasswordScreen')}
					>
						<Text style={styles.forgotPassword}>Need help logging in?</Text>

						<Text style={styles.errorMessage}>{error}</Text>
					</TouchableOpacity>
				</View>
			</View>
			<TouchableOpacity
				activeOpacity={0.6}
				style={styles.AuthenticationButton}
				onPress={() => attemptLogin()}
			>
				<Text style={styles.AuthenticationButtonText}>Login</Text>
			</TouchableOpacity>
			<Text style={styles.subText}>
				New User?
				<TouchableOpacity
					activeOpacity={0.6}
					onPress={() => props.navigation.push('SignupScreen')}
				>
					<Text style={styles.SignupText}> Sign up</Text>
				</TouchableOpacity>
			</Text>
		</View>
	);
}

export default LoginScreen;
