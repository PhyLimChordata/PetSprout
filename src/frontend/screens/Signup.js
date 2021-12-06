import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';

import styles from '../styling/Authentication';
import { useTheme } from '@react-navigation/native';

function SignupScreen(props) {
	const [userName, setusername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [reEnterPassword, setReEnterPassword] = useState('');

	const [userNameError, setUserNameError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [reEnterPasswordError, setReEnterPasswordError] = useState('');

	const { colors } = useTheme();

	const [usernameInputStyle, setUsernameInputStyle] = useState({
		backgroundColor: colors.Secondary,
		padding: 10,
		borderWidth: 0,
		borderStyle: 'solid',
		fontSize: 15,
		borderRadius: 5,
		marginBottom: 20,
		width: 300,
	});

	const [emailInputStyle, setEmailInputStyle] = useState({
		backgroundColor: colors.Secondary,
		padding: 10,
		borderWidth: 0,
		borderStyle: 'solid',
		fontSize: 15,
		borderRadius: 5,
		marginBottom: 20,
		width: 300,
	});

	const [passwordInputStyle, setPasswordInputStyle] = useState({
		backgroundColor: colors.Secondary,
		padding: 10,
		borderWidth: 0,
		borderStyle: 'solid',
		fontSize: 15,
		borderRadius: 5,
		marginBottom: 20,
		width: 300,
	});

	const [reEnterPasswordInputStyle, setReEnterPasswordInputStyle] = useState({
		backgroundColor: colors.Secondary,
		padding: 10,
		borderWidth: 0,
		borderStyle: 'solid',
		fontSize: 15,
		borderRadius: 5,
		marginBottom: 20,
		width: 300,
	});

	const errorIndicator = {
		backgroundColor: colors.Secondary,
		padding: 10,
		borderWidth: 3,
		borderColor: 'red',
		borderStyle: 'solid',
		fontSize: 15,
		borderRadius: 5,
		width: 300,
	};

	const updatingUsernameInput = (text) => {
		setusername(text);
		setUserNameError('');
		setUsernameInputStyle({
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

	const updatingEmailInput = (text) => {
		setEmail(text);
		setEmailError('');
		setEmailInputStyle({
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
		setPasswordError('');
		setPasswordInputStyle({
			backgroundColor: colors.Secondary,
			padding: 10,
			borderWidth: 0,
			borderStyle: 'solid',
			borderRadius: 5,
			marginBottom: 20,
			width: 300,
		});
	};

	const updatingReEnterPasswordInput = (text) => {
		setReEnterPassword(text);
		setReEnterPasswordError('');
		setReEnterPasswordInputStyle({
			backgroundColor: colors.Secondary,
			padding: 10,
			borderWidth: 0,
			borderStyle: 'solid',
			borderRadius: 5,
			marginBottom: 20,
			width: 300,
		});
	};

	const attemptSignup = () => {
		console.log(
			JSON.stringify({
				username: userName,
				email: email,
				password: password,
			})
		);
		fetch('http://192.168.0.25:5000/api/v1.0.0/user/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userName: userName,
				email: email,
				password: password,
			}),
		})
			.then((res) => {
				if (userName == '') {
					setUserNameError('This is a required field');
					setUsernameInputStyle(errorIndicator);
				}
				if (email == '') {
					setEmailError('This is a required field');
					setEmailInputStyle(errorIndicator);
				}
				if (password == '') {
					setPasswordError('This is a required field');
					setPasswordInputStyle(errorIndicator);
				}
				if (reEnterPassword == '') {
					setReEnterPasswordError('This is a required field');
					setReEnterPasswordInputStyle(errorIndicator);
				} else if (password != '' && reEnterPassword != password) {
					setReEnterPasswordError('Passwords do not match');
					setPasswordInputStyle(errorIndicator);
					setReEnterPasswordInputStyle(errorIndicator);
				}
				if (res.status == 200) {
					res.json().then((data) => {
						props.navigation.push('VerifyEmailSignUp', { email: email });
					});
				} else if (res.status == 401) {
					console.log(res);
					setUserNameError(res.statusText);
					if (res.statusText == 'User email exists')
						setEmailInputStyle(errorIndicator);
					else if (res.statusText == 'User name exists')
						setUsernameInputStyle(errorIndicator);
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
				<Text style={styles(colors).authenticationText}>Username</Text>
				<TextInput
					style={usernameInputStyle}
					value={userName}
					onChangeText={(text) => updatingUsernameInput(text)}></TextInput>
				<Text style={styles(colors).errorMessageRight}>{userNameError}</Text>
				<Text style={styles(colors).authenticationText}>Email</Text>
				<TextInput
					style={emailInputStyle}
					value={email}
					onChangeText={(text) => updatingEmailInput(text)}></TextInput>
				<Text style={styles(colors).errorMessageRight}>{emailError}</Text>

				<Text style={styles(colors).authenticationText}>Password</Text>
				<TextInput
					style={passwordInputStyle}
					secureTextEntry={true}
					value={password}
					onChangeText={(text) => updatingPasswordInput(text)}></TextInput>
				<Text style={styles(colors).errorMessageRight}>{passwordError}</Text>

				<Text style={styles(colors).authenticationText}>Re-enter Password</Text>
				<TextInput
					style={reEnterPasswordInputStyle}
					secureTextEntry={true}
					value={reEnterPassword}
					onChangeText={(text) =>
						updatingReEnterPasswordInput(text)
					}></TextInput>
				<Text style={styles(colors).errorMessageRight}>
					{reEnterPasswordError}
				</Text>
			</View>
			<View style={{ height: 10 }} />
			<TouchableOpacity
				activeOpacity={0.6}
				style={styles(colors).authenticationButton}
				onPress={() => attemptSignup()}>
				<Text style={styles(colors).authenticationButtonText}>Sign Up</Text>
			</TouchableOpacity>
			<Text style={styles(colors).subText}>
				Already have an account?
				<TouchableOpacity
					activeOpacity={0.6}
					onPress={() => props.navigation.push('LoginScreen')}>
					<Text style={styles(colors).signupText}> Log in</Text>
				</TouchableOpacity>
			</Text>
		</View>
	);
}

export default SignupScreen;
