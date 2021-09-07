import React, { useState, useContext } from 'react';

import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';

import styles from '../styling/Authentication';

import { useTheme } from '@react-navigation/native';
import ColorSet from '../resources/themes/colours';

function PasswordScreen(props) {
	const { colors } = useTheme();
	const [primaryInfo, setPrimaryInfo] = useState('');
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
	const [error, setError] = useState('');

	const updatingPrimaryInfo = (text) => {
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

	const forgetPassword = () => {
		fetch('http://localhost:5000/api/v1.0.0/user/check_user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				primaryInfo: primaryInfo,
			}),
		})
			.then((res) => {
				if (primaryInfo == '') {
					setError('This is a required field');
				}
				if (res.status == 200) {
					res.json().then((data) => {
						props.navigation.push('NewPassword', { email: data.email });
					});
				} else if (res.status == 500) {
					setError('Something wrong happened internally...');
				} else if (res.status == 404) {
					setError('User does not exist');
				} else if (res.status == 403) {
					setError('The user has not activated their account');
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
						width: 300,
					});
				}
			})
			.catch((data) => console.log(data));
	};

	return (
		<View style={styles(colors).container}>
			<Image
				style={styles(colors).authenticationLogo}
				source={require('../resources/images/Logo.png')}
			/>
			<View style={styles(colors).header}>
				<Text style={styles(colors).textTitle}>Forgot your Password?</Text>
				<Text style={styles(colors).explanationText}>
					{' '}
					Enter either your Email or Username and an email will be sent with
					instructions.{' '}
				</Text>

				<View style={styles(colors).inputContainer}>
					<TextInput
						style={inputStyle}
						value={primaryInfo}
						placeholder='Please enter an Email or Username'
						onChangeText={(text) => updatingPrimaryInfo(text)}></TextInput>
					<Text style={styles(colors).errorMessageRight}>{error}</Text>
				</View>
			</View>

			<TouchableOpacity
				activeOpacity={0.6}
				style={styles(colors).authenticationButton}
				onPress={() => forgetPassword()}>
				<Text style={styles(colors).authenticationButtonText}>Continue</Text>
			</TouchableOpacity>
			<TouchableOpacity
				activeOpacity={0.6}
				style={styles(colors).authenticationSpecialButton}
				onPress={() => props.navigation.push('LoginScreen')}>
				<Text style={styles(colors).authenticationButtonText}>
					Back to Login
				</Text>
			</TouchableOpacity>
		</View>
	);
}

export default PasswordScreen;
