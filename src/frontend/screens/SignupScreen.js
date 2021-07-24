import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Image, TouchableHighlight } from 'react-native';

import styles from '../styling/Tabs';

import { AuthContext } from './context';

function SignupScreen(props) {
	const [userName, setusername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [reEnterPassword, setreEnterPassword] = useState('');

	const { signUp } = useContext(AuthContext);

	const attemptSignup = () => {
		console.log(
			JSON.stringify({
				username: userName,
				email: email,
				password: password,
			})
		);
		fetch('http://localhost:5000/api/v1.0.0/user/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userName: userName,
				email: email,
				password: password,
			}),
		})
			.then((res) => {
				res.json();
			})
			.then((data) => {
				console.log(data);
				signUp();
			})
			.catch();
	};

	return (
		<View style={styles.container}>
			<Image
				style={styles.AuthenticationLogo}
				source={require('../resources/images/Logo.png')}
			/>
			<View style={styles.inputContainer}>
				<Text style={styles.AuthenticationText}>Username</Text>
				<TextInput
					style={styles.AuthenticationInput}
					value={userName}
					onChangeText={(text) => setusername(text)}
				></TextInput>
				<Text style={styles.AuthenticationText}>Email</Text>
				<TextInput
					style={styles.AuthenticationInput}
					value={email}
					onChangeText={(text) => setEmail(text)}
				></TextInput>
				<Text style={styles.AuthenticationText}>Password</Text>
				<TextInput
					style={styles.AuthenticationInput}
					secureTextEntry={true}
					value={password}
					onChangeText={(text) => setPassword(text)}
				></TextInput>
				<Text style={styles.AuthenticationText}>ReEnter Password</Text>
				<TextInput
					style={styles.AuthenticationInput}
					secureTextEntry={true}
					value={reEnterPassword}
					onChangeText={(text) => setreEnterPassword(text)}
				></TextInput>
			</View>
			<TouchableHighlight
				style={styles.AuthenticationButton}
				onPress={() => attemptSignup()}
			>
				<Text style={styles.AuthenticationButtonText}>Sign Up</Text>
			</TouchableHighlight>
			<Text style={styles.subText}>
				Already have an account?
				<TouchableHighlight
					onPress={() => props.navigation.push('LoginScreen')}
				>
					<Text style={styles.SignupText}> Log in</Text>
				</TouchableHighlight>
			</Text>
		</View>
	);
}

export default SignupScreen;
