import React, { useState, useContext } from 'react';

import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';

import styles from '../styling/Authentication';

import { useTheme } from '@react-navigation/native';

function VerifyEmailSignUp(props) {
	const { colors } = useTheme();

	const resend = () => {
		fetch('http://3.15.57.200:5000/api/v1.0.0/user/send_activate_email', {
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
				style={styles(colors).authenticationLogo}
				source={require('../resources/images/Email.png')}
			/>
			<View style={styles(colors).header}>
				<Text style={styles(colors).textTitle}>Verify your Email</Text>
				<Text style={styles(colors).explanationText}>
					{' '}
					To start using PetSprout, we need to verify your email. An email with
					a verification link has been sent which will activate your account.{' '}
				</Text>
			</View>
			<TouchableOpacity
				activeOpacity={0.6}
				style={styles(colors).authenticationButton}
				onPress={() => resend()}
			>
				<Text style={styles(colors).authenticationButtonText}>
					Resend Email
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				activeOpacity={0.6}
				style={styles(colors).authenticationSpecialButton}
				onPress={() => props.navigation.push('LoginScreen')}
			>
				<Text style={styles(colors).authenticationButtonText}>
					Back to Login
				</Text>
			</TouchableOpacity>
		</View>
	);
}

export default VerifyEmailSignUp;
