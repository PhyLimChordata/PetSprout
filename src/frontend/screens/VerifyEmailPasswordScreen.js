import React, { useState, useContext } from 'react';

import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';

import styles from '../styling/Authentication';

function VerifyEmailPasswordScreen(props) {
	console.log(props);

	const resend = () => {
		fetch('http://localhost:5000/api/v1.0.0/user/pending_password', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				newPassword: props.route.params.password,
				email: props.route.params.email,
			}),
		})
			.then((res) => {
				res.json();
			})
			.then((data) => {
				console.log(data);
			})
			.catch();
	};

	return (
		<View style={styles.container}>
			<Image
				style={styles.AuthenticationLogo}
				source={require('../resources/images/EmailLogo.png')}
			/>
			<View style={styles.header}>
				<Text style={styles.textTitle}>Resetting your Password</Text>
				<Text style={styles.explanationText}>
					{' '}
					An email has been sent which will contain a link to reset your password.{' '}
				</Text>
			</View>
			<TouchableOpacity
				activeOpacity={0.6}
				style={styles.AuthenticationButton}
				onPress={() => resend()}
			>
				<Text style={styles.AuthenticationButtonText}>Resend Email</Text>
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

export default VerifyEmailPasswordScreen;
