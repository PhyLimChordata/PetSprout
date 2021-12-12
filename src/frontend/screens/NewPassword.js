import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Image, TouchableHighlight } from 'react-native';

import styles from '../styling/Authentication';
import { useTheme } from '@react-navigation/native';
import { AuthContext } from '../Context';

import Colours from '../resources/themes/Colours';

function NewPassword(props) {
	const [password, setPassword] = useState('');
	const [reEnteredPassword, setReEnteredPassword] = useState('');

	const { colors } = useTheme();

	const normalInputStyle = {
		backgroundColor: colors.Secondary,
		padding: 10,
		borderWidth: 0,
		borderStyle: 'solid',
		fontSize: 15,
		borderRadius: 5,
		marginBottom: 20,
		width: 300,
	};

	const [passwordInputStyle, setPasswordInputStyle] =
		useState(normalInputStyle);
	const [reEnterPasswordInputStyle, setReEnterPasswordInputStyle] =
		useState(normalInputStyle);

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

	const [error, setError] = useState('');
	const [spaceAfterError, setSpaceAfterError] = useState({});

	const updatingPassword = (text) => {
		setPassword(text);
		setError('');
		setSpaceAfterError({});
		setPasswordInputStyle(normalInputStyle);
		setPasswordTextStyle({
			fontSize: 20,
			fontWeight: 'bold',
			paddingBottom: 5,
			color: colors.Quaternary,
		});
	};

	const updatingReEnteredPassword = (text) => {
		setReEnteredPassword(text);
		setError('');
		setSpaceAfterError({});
		setReEnterPasswordInputStyle(normalInputStyle);
		setReEnterPasswordTextStyle({
			fontSize: 20,
			fontWeight: 'bold',
			paddingBottom: 5,
			color: colors.Quaternary,
		});
	};

	const { resetPassword } = useContext(AuthContext);

	function displayError(password, reenter) {
		setSpaceAfterError({ height: 20 });

		if (password) {
			setPasswordTextStyle({
				fontSize: 20,
				fontWeight: 'bold',
				paddingBottom: 5,
				color: Colours.Red.Error,
			});
			setPasswordInputStyle({
				backgroundColor: Colours.Red.NotSelected,
				padding: 10,
				fontSize: 15,
				borderRadius: 5,
				width: 300,
			});
		}

		if (reenter) {
			setReEnterPasswordTextStyle({
				fontSize: 20,
				fontWeight: 'bold',
				paddingBottom: 5,
				color: Colours.Red.Error,
			});
			setReEnterPasswordInputStyle({
				backgroundColor: Colours.Red.NotSelected,
				padding: 10,
				fontSize: 15,
				borderRadius: 5,
				width: 300,
			});
		}
	}

	const attemptSetNewPassword = () => {
		if (password.length < 6) {
			setError('Passwords must be between 6-12 characters');
			displayError(true, false);
		} else if (password.length > 12) {
			setError('Passwords must be between 6-12 characters');
			displayError(true, false);
		} else if (password == '' || reEnteredPassword == '') {
			setError('Please enter all parameters');
			displayError(true, true);
		} else if (password != reEnteredPassword) {
			setError('Passwords do not match');
			displayError(true, true);
		} else {
			fetch('http://localhost:5000/api/v1.0.0/user/pending_password', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					newPassword: password,
					email: props.route.params.email,
				}),
			})
				.then((res) => {
					if (res.status == 200) {
						res.json().then((data) => {
							props.navigation.push('VerifyEmailPassword', {
								password: password,
								email: props.route.params.email,
							});
						});
					} else {
						setError('An internal error occurred');
						displayError();
					}
				})
				.catch();
		}
	};

	return (
		<View style={styles(colors).container}>
			<Image
				style={styles(colors).authenticationLogo}
				source={require('../resources/images/Logo.png')}
			/>
			<View style={styles(colors).header}>
				<Text style={styles(colors).textTitle}>Enter a new Password</Text>
			</View>

			<View style={styles(colors).inputContainer}>
				<Text style={passwordTextStyle}>Password</Text>
				<TextInput
					style={passwordInputStyle}
					value={password}
					secureTextEntry={true}
					placeholder='*********'
					onChangeText={(text) => updatingPassword(text)}
				></TextInput>
				<View style={spaceAfterError} />
				<Text style={reEnterPasswordTextStyle}>ReEnter Password</Text>
				<TextInput
					style={reEnterPasswordInputStyle}
					value={reEnteredPassword}
					secureTextEntry={true}
					placeholder='*********'
					onChangeText={(text) => updatingReEnteredPassword(text)}
				></TextInput>
				<Text style={styles(colors).errorMessageRight}>{error}</Text>
			</View>
			<View style={{ height: 10 }} />
			<TouchableHighlight
				style={styles(colors).authenticationButton}
				onPress={() => attemptSetNewPassword()}
			>
				<Text style={styles(colors).authenticationButtonText}>Send Email</Text>
			</TouchableHighlight>
			<TouchableHighlight
				style={styles(colors).authenticationSpecialButton}
				onPress={() => props.navigation.push('LoginScreen')}
			>
				<Text style={styles(colors).authenticationButtonText}>
					Back to Login
				</Text>
			</TouchableHighlight>
		</View>
	);
}

export default NewPassword;
