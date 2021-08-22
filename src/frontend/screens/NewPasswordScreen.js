import React, { useState, useContext } from 'react';

import { View, Text, TextInput, Image, TouchableHighlight } from 'react-native';

import styles from '../styling/Authentication';

import { AuthContext } from './context';

function NewPasswordScreen(props) {
	const [password, setPassword] = useState('');
	const [reEnteredPassword, setReEnteredPassword] = useState('');

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
				res.json().then((data) => {
					props.navigation.push('VerifyEmailPasswordScreen', {
						password: password,
						email: props.route.params.email,
					});
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
			<View style={styles.header}>
				<Text style={styles.textTitle}>Enter a new Password</Text>
			</View>

			<View style={styles.inputContainer}>
				<Text style={styles.AuthenticationText}>Password</Text>
				<TextInput
					style={styles.AuthenticationInput}
					value={password}
					secureTextEntry={true}
					placeholder="*********"
					onChangeText={(text) => setPassword(text)}
				></TextInput>
				<Text style={styles.AuthenticationText}>ReEnter Password</Text>
				<TextInput
					style={styles.AuthenticationInput}
					value={reEnteredPassword}
					secureTextEntry={true}
					placeholder="*********"
					onChangeText={(text) => setReEnteredPassword(text)}
				></TextInput>
			</View>

			<TouchableHighlight
				style={styles.AuthenticationButton}
				onPress={() => attemptSetNewPassword()}
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
