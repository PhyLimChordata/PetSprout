import React, { useEffect, useContext } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Dimensions,
	TextInput,
	SafeAreaView,
	Image,
	ImageBackground,
} from 'react-native';
import androidSafeAreaView from '../styling/AndroidSafeAreaView';
import profileStyles from '../styling/Profile';
import MenuHeader from '../components/MenuHeader';
import { AuthContext } from '../Context';
import { useTheme } from '@react-navigation/native';
import BottomPopup from '../components/BottomPopup';
import Colours from '../resources/themes/Colours';
import MenuPagesStyles from '../styling/MenuPages';
import HomeButton from '../components/HomeButton';

function ProfileEdit(props) {
	let popup = React.useRef();

	const [userName, setUserName] = React.useState('default');
	const [email, setEmail] = React.useState('');
	const [about, setAbout] = React.useState('');
	const [createdAt, setCreatedAt] = React.useState('');
	const [error, setError] = React.useState('');
	const [message, setMessage] = React.useState('');
	const [userFocused, setFocused] = React.useState(false);
	const [color, setColor] = React.useState(Colours.Red.Error);

	const { getToken } = useContext(AuthContext);
	const { colors } = useTheme();
	//let styles= profileStyles(Dimensions.get('screen').width, Dimensions.get('screen').height, colors)
	let styles = profileStyles(
		colors,
		Dimensions.get('screen').width,
		Dimensions.get('screen').height,
	);

	function formatDate(date) {
		return (
			date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear()
		);
	}

	useEffect(() => {
		const get = () => {
			fetch('http://3.15.57.200:5000/api/v1.0.0/user/viewAccount', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'authentication-token': getToken,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					setUserName(data.userName);
					setEmail(data.email);
					setAbout(data.about);
					setCreatedAt(formatDate(new Date(data.createdAt)));
				})
				.catch((err) => console.log(err));
		};

		if (userName == 'default') get();
	}, []);

	useEffect(() => console.log("Error = " + error), [error]);

	const onSubmit = () => {
		if (userName.length == 0) {
			//setError("Username cannot be empty.")
			//popup.current?.togglePopup();
		} else {
			fetch('http://3.15.57.200:5000/api/v1.0.0/user/modifyAccount', {
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
						setMessage('The provided information cannot be saved');
						setColor(Colours.Red.Error);
					} else {
						setMessage('Account has been successfully updated.');
						setColor(Colours.Green.Selected);
						res.json().then((data) => {
							setUserName(data.userName);
							setAbout(data.about);
						});
					}
				})
				.then(() => {
					popup.current?.togglePopup();
				})
				.catch((err) => console.log(err));
		}
	};

	const SubmitButton = (props) => {
		return (
			<View style={styles.submitButtonPosition}>
				<TouchableOpacity
					style={styles.submitButton}
					onPress={() => props.submit()}
				>
					<Text style={[styles.submitButtonText, { fontWeight: '900' }]}>
						SUBMIT
					</Text>
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<>
			<SafeAreaView style={androidSafeAreaView().AndroidSafeArea}>
				<View>
					<MenuHeader
						text='Account  '
						navigation={props.navigation}
						right={
							<>
								<ImageBackground
									style={{
										width: Dimensions.get('screen').width * 0.1,
										height: Dimensions.get('screen').width * 0.1,
										alignItems: 'center',
										justifyContent: 'center',
									}}
									source={require('../resources/images/Background.png')}
								>
									<Image
										style={{
											width: Dimensions.get('screen').width * 0.08,
											height: Dimensions.get('screen').width * 0.08,
											margin: Dimensions.get('screen').width * 0.02,
										}}
										source={require('../resources/images/Account.png')}
									/>
								</ImageBackground>
							</>
						}
					/>
				</View>
				<View style={styles.container}>
					<View style={styles.formContainer}>
						<Text
							style={[styles.textTitle, styles.text, { fontWeight: '900' }]}
						>
							Username
						</Text>
						<TextInput
							onFocus={() => setFocused(true)}
							onBlur={() => setFocused(false)}
							value={userName}
							style={[
								styles.textInput,
								styles.text,
								userFocused ? styles.textInputSelected : null,
							]}
						/>
					</View>
					<View style={styles.formContainer}>
						<Text
							style={[styles.textTitle, styles.text, { fontWeight: '900' }]}
						>
							Email
						</Text>
						<Text style={[styles.textInput, styles.text]}>{email}</Text>
					</View>
					<View style={styles.formContainer}>
						<Text
							style={[styles.textTitle, styles.text, { fontWeight: '900' }]}
						>
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
							style={[styles.textTitle, styles.text, { fontWeight: '900' }]}
						>
							Account Created On
						</Text>
						<Text style={[styles.textInput, styles.text]}>{createdAt}</Text>
					</View>
					<SubmitButton submit={onSubmit} />
				</View>
				<HomeButton navigation={props.navigation} colors={colors} />
			</SafeAreaView>
			<BottomPopup ref={popup} color={color} text={message} />
		</>
	);
}

export default ProfileEdit;
