import React, { useEffect, useContext } from 'react';
import {
	View,
	Text,
	Pressable,
	Dimensions,
	TextInput,
	SafeAreaView,
} from 'react-native';
import profileStyles from '../styling/Profile';

import MenuHeader from '../components/MenuHeader';
import { useFonts, Roboto_900Black } from '@expo-google-fonts/roboto';
import { AuthContext } from '../Context';

import { useTheme } from '@react-navigation/native';

// let styles = StyleSheetFactory.getSheet(
// 	Dimensions.get('screen').width,
// 	Dimensions.get('screen').height
// );

function ProfileEdit(props) {
	console.log('profile 14: ' + typeof styles);

	let state = {
		userName: '',
		email: '',
		about: '',
	};

	const { colors } = useTheme();

	let styles = profileStyles(
		colors,
		Dimensions.get('screen').width,
		Dimensions.get('screen').height
	);

	useEffect(() => {
		if (state.userName.length == 0) get();
	});

	const { getToken } = useContext(AuthContext);

	const get = () => {
		fetch('http://localhost:5000/api/v1.0.0/user/viewAccount', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'authentication-token': getToken,
			},
		}).then((res) => {
			console.log('FETCHING USER DATA');
			console.log(res);
		});
	};

	const handleChange = (id, e) => {
		state[id] = e;
	};

	// const handleChange = (id, e) => {
	// 	data[id] = e.target.value;
	// };

	return (
		<SafeAreaView>
			<View>
				<MenuHeader text='Account  ' navigation={props.navigation}>
					<Text>Account </Text>
				</MenuHeader>
			</View>
			<View style={styles.container}>
				<EditBox
					id='userName'
					tag='Username'
					def={name}
					place='Username'
					handle={handleChange}
					styles={styles}
				/>
				<View style={styles.formContainer}>
					<Text
						style={[
							styles.textTitle,
							styles.text,
							{ fontFamily: 'Roboto_900Black', fontWeight: '900' },
						]}>
						Email
					</Text>
					<Text style={[styles.textInput, styles.text]}>{state.email}</Text>
				</View>
				<EditBox
					id='about'
					tag='About'
					def=''
					mult={true}
					numLines={5}
					backColor={true}
					handle={handleChange}
					styles={styles}
				/>
				<View style={styles.formContainer}>
					<Text
						style={[
							styles.textTitle,
							styles.text,
							{ fontFamily: 'Roboto_900Black', fontWeight: '900' },
						]}>
						Account Created On
					</Text>
					<Text style={[styles.textInput, styles.text]}>Date</Text>
				</View>
				{/* <SubmitButton submit={onSubmit} styles = {styles}/> */}
			</View>
		</SafeAreaView>
	);
}

const EditBox = (props) => {
	const [text, onChangeText] = React.useState(props.def);
	const [focused, onSelected] = React.useState(false);

	const handleChange = (text) => {
		console.log('handleChange ' + text);
		onChangeText(text);
		props.handle(props.id, text);
	};

	console.log('def =  ' + text);
	console.log(props.def);

	useEffect(() => {}, [focused]);

	return (
		<View style={props.styles.formContainer}>
			<Text
				style={[
					props.styles.textTitle,
					props.styles.text,
					{ fontFamily: 'Roboto_900Black', fontWeight: '900' },
				]}>
				{props.tag}
			</Text>
			<TextInput
				onFocus={() => onSelected(true)}
				onBlur={() => onSelected(false)}
				onChangeText={(text) => handleChange((props.id, text))}
				value={text}
				defaultValue={props.place}
				style={
					props.mult
						? props.styles.textMultiInput
						: [
								props.styles.textInput,
								props.styles.text,
								focused ? props.styles.textInputSelected : null,
						  ]
				}
				multiline={props.mult}
				numberOfLines={props.numLines}
			/>
		</View>
	);
};

const SubmitButton = (props) => {
	return (
		<View style={props.styles.submitButtonPosition}>
			<Pressable style={props.styles.submitButton} onPress={() => props.submit()}>
				<Text
					style={[
						props.styles.submitButtonText,
						{ fontFamily: 'Roboto_900Black', fontWeight: '900' },
					]}>
					SUBMIT
				</Text>
			</Pressable>
		</View>
	);
};

export default ProfileEdit;
