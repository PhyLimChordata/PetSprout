import React, { useState, useContext } from 'react';

import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';

import styles from '../styling/Authentication';

import { useTheme } from '@react-navigation/native';

function VerifyEmailPassword(props) {
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
				<Text style={styles(colors).textTitle}>Resetting your Password</Text>
				<Text style={styles(colors).explanationText}>
					{' '}
					An email has been sent which will contain a link to reset your
					password.{' '}
				</Text>
			</View>
			<TouchableOpacity
				activeOpacity={0.6}
				style={styles(colors).authenticationButton}
				onPress={() => resend()}>
				<Text style={styles(colors).authenticationButtonText}>
					Resend Email
				</Text>
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

export default VerifyEmailPassword;
