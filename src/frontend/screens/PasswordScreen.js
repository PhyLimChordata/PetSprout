import React, { useState, useContext } from 'react';

import { View, Text, TextInput, Image, TouchableHighlight } from 'react-native';

import styles from '../styling/Authentication';

import { AuthContext } from './context';

function PasswordScreen(props) {
	const [email, setEmail] = useState('');
	const [userName, setUserName] = useState('');

	const { forgotPassword } = useContext(AuthContext);

	const forgetPassword = () => {
		fetch('http://localhost:5000/api/v1.0.0/user/send_forget_password_email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userName: userName,
				email: email
			}),
		})
			.then((res) => {
				res.json().then((data) => {
					forgotPassword(data.email);
					props.navigation.push("NewPasswordScreen");
				});
			})
			.catch((data) => console.log(data));
	}
	


	return (
		<View style={styles.container}>
			<Image
				style={styles.AuthenticationLogo}
				source={require('../resources/images/Logo.png')}
			/>
			<View style={styles.inputContainer}>
				<Text style={styles.textTitle}>Forgot your Pasword?</Text>
				<Text style={styles.explanationText}> Enter either your Email or <br>
				</br>Username and an email will be sent with instructions. </Text>
				<Text style={styles.AuthenticationText}>Email</Text>
				<TextInput
					style={styles.AuthenticationInput}
					value={email}
					onChangeText={(text) => setEmail(text)}
				></TextInput>
				<Text style={styles.AuthenticationText}>Username</Text>
				<TextInput
					style={styles.AuthenticationInput}
					value={userName}
					onChangeText={(text) => setUserName(text)}
				></TextInput>
			</View>
			<TouchableHighlight
				style={styles.AuthenticationButton}
				onPress={() => forgetPassword()}
			>
				<Text style={styles.AuthenticationButtonText}>Reset Password</Text>
			</TouchableHighlight>
			<TouchableHighlight
				style={styles.AuthenticationSpecialButton}
				onPress={() => props.navigation.push("LoginScreen")}
			>
				<Text style={styles.AuthenticationButtonText}>Back to Login</Text>
			</TouchableHighlight>
		</View>
	);
}

export default PasswordScreen;
