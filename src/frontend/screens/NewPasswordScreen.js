import React, { useState, useContext } from 'react';

import { View, Text, TextInput, Image, TouchableHighlight } from 'react-native';

import styles from '../styling/Authentication';

import { AuthContext } from './context';

function NewPasswordScreen(props) {
	const [password, setPassword] = useState('');
	const [reEnteredPassword, setReEnteredPassword] = useState('');

	const { resetPassword } = useContext(AuthContext);

	const forgetPassword = () => {
		console.log(resetPassword);
        console.log(password);
		fetch('http://localhost:5000/api/v1.0.0/user/reset_password', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				newPassword: password,
				// reEnteredPassword: reEnteredPassword,
				email: resetPassword,
			}),
		})
			.then((res) => {
				res.json().then((data) => {
					props.navigation.push('LoginScreen');
				});
			})
			.catch(console.log('oh no'));
	};

	return (
		<View style={styles.container}>
			<Image
				style={styles.AuthenticationLogo}
				source={require('../resources/images/Logo.png')}
			/>
			<View style={styles.inputContainer}>
				<Text style={styles.textTitle}>Enter a new Password</Text>
				<Text style={styles.AuthenticationText}>Password</Text>
				<TextInput
					style={styles.AuthenticationInput}
					value={password}
					onChangeText={(text) => setPassword(text)}
				></TextInput>
				<Text style={styles.AuthenticationText}>ReEnter Password</Text>
				<TextInput
					style={styles.AuthenticationInput}
					value={reEnteredPassword}
					onChangeText={(text) => setReEnteredPassword(text)}
				></TextInput>
			</View>
			<TouchableHighlight
				style={styles.AuthenticationButton}
				onPress={() => forgetPassword()}
			>
				<Text style={styles.AuthenticationButtonText}>Send Email</Text>
			</TouchableHighlight>
			<TouchableHighlight
				style={styles.AuthenticationSpecialButton}
				onPress={() => props.navigation.push('LoginScreen')}
			>
				<Text style={styles.AuthenticationButtonText}>Back to Login</Text>
			</TouchableHighlight>
		</View>
	);
}

export default NewPasswordScreen;
