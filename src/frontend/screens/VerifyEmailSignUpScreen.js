import React, { useState, useContext } from 'react';

import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';

import styles from '../styling/Authentication';

import {useTheme} from '@react-navigation/native';

function VerifyEmailSignUpScreen(props) {
	const {colors} = useTheme();

	const resend = () => {
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
				if (res.status == 200) {
					res.json().then((data) => {
						console.log(data);
					});
				}
			})
			.catch();
	};

	return (
		<View style={styles(colors).container}>
			<Image
				style={styles(colors).AuthenticationLogo}
				source={require('../resources/images/EmailLogo.png')}
			/>
			<View style={styles(colors).header}>
				<Text style={styles(colors).textTitle}>Verify your Email</Text>
				<Text style={styles(colors).explanationText}>
					{' '}
					To start using HabiPets, we need to verify your email. An email with a
					verification link has been sent which will activate your account.{' '}
				</Text>
			</View>
			<TouchableOpacity
				activeOpacity={0.6}
				style={styles(colors).AuthenticationButton}
				onPress={() => resend()}
			>
				<Text style={styles(colors).AuthenticationButtonText}>Resend Email</Text>
			</TouchableOpacity>
			<TouchableOpacity
				activeOpacity={0.6}
				style={styles(colors).AuthenticationSpecialButton}
				onPress={() => props.navigation.push('LoginScreen')}
			>
				<Text style={styles(colors).AuthenticationButtonText}>Back to Login</Text>
			</TouchableOpacity>
		</View>
	);
}

export default VerifyEmailSignUpScreen;
