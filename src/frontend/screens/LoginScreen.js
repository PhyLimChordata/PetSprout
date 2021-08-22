import React, { useState, useContext } from 'react';

import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';

import styles from '../styling/Authentication';

import { AuthContext } from './context';

function LoginScreen(props) {
	const [primaryInfo, setPrimaryInfo] = useState('');
	const [password, setPassword] = useState('');

	const { logIn } = useContext(AuthContext);

	const attemptLogin = () => {
		fetch('http://localhost:5000/api/v1.0.0/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userName: primaryInfo,
				password: password,
			}),
		})
			.then((res) => {
				res.json().then((data) => {
					logIn(data.token);
				});
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
				<Text style={styles.AuthenticationText}>Primary Information</Text>
				<TextInput
					style={styles.AuthenticationInput}
					value={primaryInfo}
					placeholder="Please enter an Email or Username"
					onChangeText={(text) => setPrimaryInfo(text)}
				></TextInput>
				<Text style={styles.AuthenticationText}>Password</Text>
				<TextInput
					style={styles.AuthenticationInput}
					secureTextEntry={true}
					value={password}
					placeholder="*********"
					onChangeText={(text) => setPassword(text)}
				></TextInput>
				<View style={styles.forgotView}>
					<TouchableOpacity activeOpacity={0.6}
						onPress={() => props.navigation.push('PasswordScreen')}
					>
						<Text style={styles.forgotPassword}>Need help logging in?</Text>
					</TouchableOpacity>
				</View>
			</View>
			<TouchableOpacity activeOpacity={0.6}
				style={styles.AuthenticationButton}
				onPress={() => attemptLogin()}
			>
				<Text style={styles.AuthenticationButtonText}>Login</Text>
			</TouchableOpacity>
			<Text style={styles.subText}>
				New User?
				<TouchableOpacity activeOpacity={0.6}
					onPress={() => props.navigation.push('SignupScreen')}
				>
					<Text style={styles.SignupText}> Sign up</Text>
				</TouchableOpacity>
			</Text>
		</View>
	);
}

export default LoginScreen;
