import React, { useEffect, useContext } from 'react';
import {
	View,
	Text,
	Pressable,
	Dimensions,
	TextInput,
	SafeAreaView,
} from 'react-native';
// import profileStyles from '../styling/Profile';
import StyleSheetFactory from '../styling/ViewEditBox';
import profileStyles from '../styling/Profile';
import MenuHeader from '../components/MenuHeader';
import { useFonts, Roboto_900Black } from '@expo-google-fonts/roboto';
import { AuthContext } from '../Context';
import { useTheme } from '@react-navigation/native';
import BottomPopup from '../components/BottomPopup';

// let styles = StyleSheetFactory.getSheet(
// 	Dimensions.get('screen').width,
// 	Dimensions.get('screen').height
// );

function ProfileEdit(props) {
	let popup = React.useRef();

	const[userName, setUserName] = React.useState('default');
	const[email, setEmail] = React.useState('');
	const[about, setAbout] = React.useState('');
	const[createdAt, setCreatedAt] = React.useState('');
	const[error, setError] = React.useState('')
	const[userFocused, setFocused] = React.useState(false)

	const { getToken } = useContext(AuthContext);
	const { colors } = useTheme();
	//let styles= profileStyles(Dimensions.get('screen').width, Dimensions.get('screen').height, colors)
	
	let styles = profileStyles(
		colors,
		Dimensions.get('screen').width,
		Dimensions.get('screen').height,
	);

	useEffect(() => {
		const get = () => {
			fetch('http://localhost:5000/api/v1.0.0/user/viewAccount', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'authentication-token': getToken,
				},
			})
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
				setUserName(data.userName)
				setEmail(data.email)
				setAbout(data.about)
				setCreatedAt(data.createdAt)
			})
			.catch(err => console.log(err));
		};

		if(userName == 'default') get();
	}, []);

	useEffect(() => console.log("Error = " + error), [error]);

	const onSubmit = () => {
		if(userName.length == 0) {
			setError("Username cannot be empty.")
			popup.current?.togglePopup();
		} else {
			fetch('http://localhost:5000/api/v1.0.0/user/modifyAccount', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'authentication-token': getToken,
				},
				body: JSON.stringify({
					userName: userName,
					about: about,
				}),
			})
			.then((res) => {
				if (res.status != 200) {
					popup.current?.togglePopup();
					if(res.status == 500){
						setError('Something wrong happened internally...');
					}
				} 
				res.json().then((data) => {
					console.log(data)
					setUserName(data.userName)
					setAbout(data.about)
				});
			})
			.catch(err => console.log(err))
		}
	}
	
	const SubmitButton = (props) => {
		return (
			<View style={styles.submitButtonPosition}>
				<Pressable style={styles.submitButton} onPress={() => props.submit()}>
					<Text
						style={[
							styles.submitButtonText,
							{ fontWeight: '900' },
						]}>
						SUBMIT
					</Text>
				</Pressable>
			</View>
		);
	};

	return (
		<>
		<SafeAreaView>
			<View>
				<MenuHeader text='Account  ' navigation={props.navigation}>
					<Text>Account </Text>
				</MenuHeader>
			</View>
			<View style={styles.container}>
				<View style={styles.formContainer}>
					<Text
						style={[
							styles.textTitle,
							styles.text,
							{ fontWeight: '900' },
							error.length != 0 ? styles.textInputError : null
						]}>
						Username
					</Text>
					<TextInput
						onFocus={() => setFocused(true)}
						onBlur={() => setFocused(false)}
						onChangeText={(text) => setUserName(text)}
						value={userName}
						style={[
								styles.textInput,
								styles.text,
								userFocused ? styles.textInputSelected : null,
								error.length != 0 ? styles.textInputError : null
							]}
					/>
				</View>
				<View style={styles.formContainer}>
					<Text
						style={[
							styles.textTitle,
							styles.text,
							{ fontWeight: '900' },
						]}>
						Email
					</Text>
					<Text style={[styles.textInput, styles.text]}>{email}</Text>
				</View>
				<View style={styles.formContainer}>
					<Text
						style={[
							styles.textTitle,
							styles.text,
							{ fontWeight: '900' },
						]}>
						About
					</Text>
					<TextInput
						onChangeText={(text) => setAbout(text)}
						value={about}
						style={styles.textMultiInput}
						multiline={true}
						numberOfLines={5}
					/>
				</View>
				<View style={styles.formContainer}>
					<Text
						style={[
							styles.textTitle,
							styles.text,
							{ fontWeight: '900' },
						]}>
						Account Created On
					</Text>
					<Text style={[styles.textInput, styles.text]}>{createdAt}</Text>
				</View>
				<SubmitButton submit={onSubmit}/>
			</View>
		</SafeAreaView>
			<BottomPopup
				ref={popup}
				text={'The provided information cannot be saved'}
			/>
		</>
	);
}

export default ProfileEdit;
