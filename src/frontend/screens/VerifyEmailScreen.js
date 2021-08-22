import React, { useState, useContext } from 'react';

import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';

import styles from '../styling/Authentication';

import { AuthContext } from './context';

function VerifyEmailScreen(props) {
	console.log(props);
	const { resendMail } = useContext(AuthContext);

	const resend = () => {
		console.log(props.route.params.email);
		fetch('http://localhost:5000/api/v1.0.0/user/send_activate_email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
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
				<Text style={styles.textTitle}>Verify your Email</Text>
				<Text style={styles.explanationText}>
					{' '}
					To start using HabiPets, we need to verify your email. An email with a
					verification link has been sent which will activate your account.{' '}
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

export default VerifyEmailScreen;
