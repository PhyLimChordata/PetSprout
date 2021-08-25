import React, { useState, useContext } from 'react';

import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';

import styles from '../styling/Authentication';
import ColorSet from '../resources/themes/Global';

function PasswordScreen(props) {
	const [primaryInfo, setPrimaryInfo] = useState('');
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
	const [error, setError] = useState('');

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
				if (res.status == 200) {
					res.json().then((data) => {
						props.navigation.push('NewPasswordScreen', { email: data.email });
					});
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
			.catch((data) => console.log(data));
	};

	return (
		<View style={styles.container}>
			<Image
				style={styles.AuthenticationLogo}
				source={require('../resources/images/Logo.png')}
			/>
			<View style={styles.header}>
				<Text style={styles.textTitle}>Forgot your Password?</Text>
				<Text style={styles.explanationText}>
					{' '}
					Enter either your Email or Username and an email will be sent with
					instructions.{' '}
				</Text>

				<TextInput
					style={inputStyle}
					value={primaryInfo}
					placeholder="Please enter an Email or Username"
					onChangeText={(text) => setPrimaryInfo(text)}
				></TextInput>
				<Text style={styles.errorMessage}>{error}</Text>
			</View>
			<TouchableOpacity
				activeOpacity={0.6}
				style={styles.AuthenticationButton}
				onPress={() => forgetPassword()}
			>
				<Text style={styles.AuthenticationButtonText}>Continue</Text>
			</TouchableOpacity>
			<TouchableOpacity
				activeOpacity={0.6}
				style={styles.AuthenticationSpecialButton}
				onPress={() => props.navigation.push('LoginScreen')}
			>
				<Text style={styles.AuthenticationButtonText}>Back to Login</Text>
			</TouchableOpacity>
		</View>
	);
}

export default PasswordScreen;
