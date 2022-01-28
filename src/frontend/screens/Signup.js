import React, { useState, useContext } from 'react';
import {
	View,
	Text,
	TextInput,
	Image,
	SafeAreaView,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import androidSafeAreaView from '../styling/AndroidSafeAreaView';
import styles from '../styling/Authentication';
import { useTheme } from '@react-navigation/native';
import Colours from '../resources/themes/Colours';

import { AuthContext } from '../Context';

function SignupScreen(props) {
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [reEnterPassword, setReEnterPassword] = useState('');

	const [userNameError, setUserNameError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [reEnterPasswordError, setReEnterPasswordError] = useState('');

	const { getLogo } = useContext(AuthContext);

	const { colors } = useTheme();

	const [userNameInputStyle, setUserNameInputStyle] = useState({
		backgroundColor: colors.Secondary,
		padding: 10,
		borderWidth: 0,
		borderStyle: 'solid',
		fontSize: 15,
		borderRadius: 5,
		width: '90%',
	});

	const [emailInputStyle, setEmailInputStyle] = useState({
		backgroundColor: colors.Secondary,
		padding: 10,
		borderWidth: 0,
		borderStyle: 'solid',
		fontSize: 15,
		borderRadius: 5,
		width: '90%',
	});

	const [passwordInputStyle, setPasswordInputStyle] = useState({
		backgroundColor: colors.Secondary,
		padding: 10,
		borderWidth: 0,
		borderStyle: 'solid',
		fontSize: 15,
		borderRadius: 5,
		width: '90%',
	});

	const [reEnterPasswordInputStyle, setReEnterPasswordInputStyle] = useState({
		backgroundColor: colors.Secondary,
		padding: 10,
		borderWidth: 0,
		borderStyle: 'solid',
		fontSize: 15,
		borderRadius: 5,
		width: '90%',
	});

	const errorIndicator = {
		backgroundColor: Colours.Red.NotSelected,
		padding: 10,
		fontSize: 15,
		borderRadius: 5,
		width: '90%',
	};

	const [userNameTextStyle, setUserNameTextStyle] = useState({
		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom: 5,
		color: colors.Quaternary,
	});
	const [emailTextStyle, setEmailTextStyle] = useState({
		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom: 5,
		color: colors.Quaternary,
	});
	const [passwordTextStyle, setPasswordTextStyle] = useState({
		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom: 5,
		color: colors.Quaternary,
	});
	const [reEnterPasswordTextStyle, setReEnterPasswordTextStyle] = useState({
		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom: 5,
		color: colors.Quaternary,
	});

	const updatingUserNameInput = (text) => {
		setUserName(text);
		setUserNameError('');
		setUserNameInputStyle({
			backgroundColor: colors.Secondary,
			padding: 10,
			borderWidth: 0,
			borderStyle: 'solid',
			fontSize: 15,
			borderRadius: 5,
			width: '90%',
		});
		setUserNameTextStyle({
			fontSize: 20,
			fontWeight: 'bold',
			paddingBottom: 5,
			color: colors.Quaternary,
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
			width: '90%',
		});
		setEmailTextStyle({
			fontSize: 20,
			fontWeight: 'bold',
			paddingBottom: 5,
			color: colors.Quaternary,
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
			width: '90%',
		});
		setPasswordTextStyle({
			fontSize: 20,
			fontWeight: 'bold',
			paddingBottom: 5,
			color: colors.Quaternary,
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
			width: '90%',
		});
		setReEnterPasswordTextStyle({
			fontSize: 20,
			fontWeight: 'bold',
			paddingBottom: 5,
			color: colors.Quaternary,
		});
	};

	const regEmail =
		/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

	const attemptSignup = () => {
		fetch('http://localhost:5000/api/v1.0.0/user/register', {
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
				console.log(res.status);
				if (userName == '') {
					setUserNameError('This is a required field');
					setUserNameInputStyle(errorIndicator);
					setUserNameTextStyle({
						fontSize: 20,
						fontWeight: 'bold',
						paddingBottom: 5,
						color: Colours.Red.Error,
					});
				}
				if (reEnterPassword == '') {
					setReEnterPasswordError('This is a required field');
					setReEnterPasswordInputStyle(errorIndicator);
					setReEnterPasswordTextStyle({
						fontSize: 20,
						fontWeight: 'bold',
						paddingBottom: 5,
						color: Colours.Red.Error,
					});
				} else if (password != '' && reEnterPassword != password) {
					setReEnterPasswordError('Passwords do not match');
					setReEnterPasswordInputStyle(errorIndicator);
					setReEnterPasswordTextStyle({
						fontSize: 20,
						fontWeight: 'bold',
						paddingBottom: 5,
						color: Colours.Red.Error,
					});
				}
				if (res.status == 200) {
					res.json().then((data) => {
						props.navigation.push('VerifyEmailSignUp', { email: email });
					});
				} else if (res.status == 401) {
					res.json().then((data) => {
						console.log(data);
						if (data[0]) {
							setUserNameError('Username already exists. Please try another');
							setUserNameInputStyle(errorIndicator);
							setUserNameTextStyle({
								fontSize: 20,
								fontWeight: 'bold',
								paddingBottom: 5,
								color: Colours.Red.Error,
							});
						}
						if (data[1]) {
							setEmailError('There is already an account using this email');
							setEmailInputStyle(errorIndicator);
							setEmailTextStyle({
								fontSize: 20,
								fontWeight: 'bold',
								paddingBottom: 5,
								color: Colours.Red.Error,
							});
						}	
					});
					
				} else if (res.status == 400) {
					if (password.length < 6) {
						setPasswordError('Passwords must be 6-12 characters');
						setPasswordInputStyle(errorIndicator);
						setPasswordTextStyle({
							fontSize: 20,
							fontWeight: 'bold',
							paddingBottom: 5,
							color: Colours.Red.Error,
						});
					} else if (password.length > 12) {
						setPasswordError('Passwords must be 6-12 characters');
						setPasswordInputStyle(errorIndicator);
						setPasswordTextStyle({
							fontSize: 20,
							fontWeight: 'bold',
							paddingBottom: 5,
							color: Colours.Red.Error,
						});
					}
					if (!regEmail.test(email)) {
						setEmailError('Please enter a valid email');
						setEmailInputStyle(errorIndicator);
						setEmailTextStyle({
							fontSize: 20,
							fontWeight: 'bold',
							paddingBottom: 5,
							color: Colours.Red.Error,
						});
					}
				}
				if (email == '') {
					setEmailError('This is a required field');
					setEmailInputStyle(errorIndicator);
					setEmailTextStyle({
						fontSize: 20,
						fontWeight: 'bold',
						paddingBottom: 5,
						color: Colours.Red.Error,
					});
				}
				if (password == '') {
					setPasswordError('This is a required field');
					setPasswordInputStyle(errorIndicator);
					setPasswordTextStyle({
						fontSize: 20,
						fontWeight: 'bold',
						paddingBottom: 5,
						color: Colours.Red.Error,
					});
				}
			})
			.catch();
	};

	return (
		<SafeAreaView
			style={[styles(colors).container, androidSafeAreaView().AndroidSafeArea]}
		>
			<Image style={styles(colors).authenticationLogo} source={getLogo} />
			<ScrollView persistentScrollbar={true} style={{ width: 300, margin: 20 }}>
				<View style={styles(colors).inputContainer}>
					<Text style={userNameTextStyle}>Username</Text>
					<TextInput
						style={userNameInputStyle}
						value={userName}
						onChangeText={(text) => updatingUserNameInput(text)}
					></TextInput>
					<Text style={styles(colors).errorMessageRight}>{userNameError}</Text>
					<Text style={emailTextStyle}>Email</Text>
					<TextInput
						style={emailInputStyle}
						value={email}
						onChangeText={(text) => updatingEmailInput(text)}
					></TextInput>
					<Text style={styles(colors).errorMessageRight}>{emailError}</Text>

					<Text style={passwordTextStyle}>Password</Text>
					<TextInput
						style={passwordInputStyle}
						secureTextEntry={true}
						value={password}
						onChangeText={(text) => updatingPasswordInput(text)}
					></TextInput>
					<Text style={styles(colors).errorMessageRight}>{passwordError}</Text>

					<Text style={reEnterPasswordTextStyle}>Re-enter Password</Text>
					<TextInput
						style={reEnterPasswordInputStyle}
						secureTextEntry={true}
						value={reEnterPassword}
						onChangeText={(text) => updatingReEnterPasswordInput(text)}
					></TextInput>
					<Text style={styles(colors).errorMessageRight}>
						{reEnterPasswordError}
					</Text>
				</View>
			</ScrollView>

			<TouchableOpacity
				activeOpacity={0.6}
				style={styles(colors).authenticationButton}
				onPress={() => attemptSignup()}
			>
				<Text style={styles(colors).authenticationButtonText}>Sign Up</Text>
			</TouchableOpacity>
			<View style={{ flexDirection: 'row' }}>
				<Text style={styles(colors).subText}>Already have an account?</Text>
				<TouchableOpacity
					activeOpacity={0.6}
					onPress={() => props.navigation.push('LoginScreen')}
				>
					<Text style={styles(colors).signupText}> Log in</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

export default SignupScreen;
