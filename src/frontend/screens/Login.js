import React, { useState, useContext } from 'react';

import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';

import styles from '../styling/Authentication';

import { AuthContext } from '../Context';
import { useTheme } from '@react-navigation/native';

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
		width: 300,
	});
	const { logIn } = useContext(AuthContext);
	// const { getToken } = useContext(AuthContext);

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
			width: 300,
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
			width: 300,
		});
	};

	const attemptLogin = () => {
		fetch('http://192.168.0.25:5000/api/v1.0.0/user/login', {
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
				let token = -1;
				if (primaryInfo == '' || password == '') {
					setError('Please enter all parameters');
				} else if (res.status == 200) {
					res.json().then((data) => {
						logIn(data.token);
						fetch('http://192.168.0.25:5000/api/v1.0.0/achievements/updateLoginStreaks', {
							method: 'PUT',
							headers: {
								'Content-Type': 'application/json',
								'authentication-token': data.token
							},
						})
						.then((ret) => {
							if(ret.status == 404) {
								console.log("Achievement not found");
							} else if (res.status == 200) {
								console.log("Success streak update!");
							}
						})
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
						backgroundColor: colors.Secondary,
						padding: 10,
						borderWidth: 3,
						borderColor: 'red',
						borderStyle: 'solid',
						fontSize: 15,
						borderRadius: 5,
						marginBottom: 20,
						width: 300,
					});
				}
			})
			.catch();
	};

	return (
		<View style={styles(colors).container}>
			<Image
				style={styles(colors).authenticationLogo}
				source={require('../resources/images/Logo.png')}
			/>
			<View style={styles(colors).inputContainer}>
				<Text style={styles(colors).authenticationText}>Email or Username</Text>
				<TextInput
					style={inputStyle}
					value={primaryInfo}
					placeholder='Please enter an Email or Username'
					onChangeText={(text) => updatingPrimaryInput(text)}
					autoCapitalize={'none'}></TextInput>

				<Text style={styles(colors).authenticationText}>Password</Text>
				<TextInput
					style={inputStyle}
					secureTextEntry={true}
					value={password}
					placeholder='*********'
					onChangeText={(text) => updatingPasswordInput(text)}></TextInput>
				<View style={styles(colors).forgotView}>
					<TouchableOpacity
						activeOpacity={0.6}
						onPress={() => props.navigation.push('PasswordScreen')}>
						<Text style={styles(colors).forgotPassword}>
							Need help logging in?
						</Text>

						<Text style={styles(colors).errorMessage}>{error}</Text>
					</TouchableOpacity>
				</View>
			</View>
			<TouchableOpacity
				activeOpacity={0.6}
				style={styles(colors).authenticationButton}
				onPress={() => attemptLogin()}>
				<Text style={styles(colors).authenticationButtonText}>Login</Text>
			</TouchableOpacity>
			<Text style={styles(colors).subText}>
				New User?
				<TouchableOpacity
					activeOpacity={0.6}
					onPress={() => props.navigation.push('SignupScreen')}>
					<Text style={styles(colors).signupText}> Sign up</Text>
				</TouchableOpacity>
			</Text>
		</View>
	);
}

export default Login;
