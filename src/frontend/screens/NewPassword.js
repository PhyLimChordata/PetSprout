import React, { useState, useContext } from 'react';

import { View, Text, TextInput, Image, TouchableHighlight } from 'react-native';

import styles from '../styling/Authentication';
import ColorSet from '../resources/themes/colours';

import { useTheme } from '@react-navigation/native';

import { AuthContext } from '../Context';

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

	const [inputStyle, setInputStyle] = useState(normalInputStyle);

	const [error, setError] = useState('');
	const [spaceAfterError, setSpaceAfterError] = useState({});

	const updatingPassword = (text) => {
		setPassword(text);
		setError('');
		setSpaceAfterError({});
		setInputStyle(normalInputStyle);
	};

	const updatingReEnteredPassword = (text) => {
		setReEnteredPassword(text);
		setError('');
		setSpaceAfterError({});
		setInputStyle(normalInputStyle);
	};

	const { resetPassword } = useContext(AuthContext);

	const attemptSetNewPassword = () => {
		console.log(resetPassword);
		console.log(password);
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
				if (password == '' || reEnteredPassword == '') {
					setError('Please enter all parameters');
				} else if (password != reEnteredPassword) {
					setError('Passwords do not match');
				} else {
					if (res.status == 200) {
						res.json().then((data) => {
							props.navigation.push('VerifyEmailPassword', {
								password: password,
								email: props.route.params.email,
							});
						});
					}
				}

				if (res.status != 200) {
					setSpaceAfterError({ height: 20 });
					setInputStyle({
						backgroundColor: colors.Secondary,
						padding: 10,
						borderWidth: 3,
						borderColor: 'red',
						borderStyle: 'solid',
						fontSize: 15,
						borderRadius: 5,
						width: 300,
					});
				}
			})
			.catch(console.log('oh no'));
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
				<Text style={styles(colors).authenticationText}>Password</Text>
				<TextInput
					style={inputStyle}
					value={password}
					secureTextEntry={true}
					placeholder='*********'
					onChangeText={(text) => updatingPassword(text)}></TextInput>
				<View style={spaceAfterError} />
				<Text style={styles(colors).authenticationText}>ReEnter Password</Text>
				<TextInput
					style={inputStyle}
					value={reEnteredPassword}
					secureTextEntry={true}
					placeholder='*********'
					onChangeText={(text) => updatingReEnteredPassword(text)}></TextInput>
				<Text style={styles(colors).errorMessageRight}>{error}</Text>
			</View>
			<View style={{ height: 10 }} />
			<TouchableHighlight
				style={styles(colors).authenticationButton}
				onPress={() => attemptSetNewPassword()}>
				<Text style={styles(colors).authenticationButtonText}>Send Email</Text>
			</TouchableHighlight>
			<TouchableHighlight
				style={styles(colors).authenticationSpecialButton}
				onPress={() => props.navigation.push('LoginScreen')}>
				<Text style={styles(colors).authenticationButtonText}>
					Back to Login
				</Text>
			</TouchableHighlight>
		</View>
	);
}

export default NewPassword;
