// React
import React, { useEffect } from 'react';
import { View, Text, TextInput, Pressable, SafeAreaView} from 'react-native';
import { useTheme } from '@react-navigation/native';

// Stylesheet
import styles from '../styling/ViewEditBox';

// Components
import MenuHeader from '../components/MenuHeader';

// Profile of the user
function ViewEditProfile(props) {
	const { colors } = useTheme();
	let data = {
		userName: 'Example',
		email: 'Example@gmail.com',
		about: '',
	};

	const handleChange = (id, e) => {
		data[id] = e.target.value;
	};

	const onSubmit = () => {
		console.log(data);
	};

	return (
		<SafeAreaView>
			<View>
				<MenuHeader text='Account' navigation={props.navigation}>
					<Text>Account icon</Text>
				</MenuHeader>
			</View>
			<View style={styles(colors).container}>
				<EditBox
					id='userName'
					tag='Username'
					def={data.userName}
					place='Username'
					handle={handleChange}
				/>
				<View style={styles(colors).formContainer}>
					<Text style={[styles(colors).textTitle, styles(colors).text]}>
						Email
					</Text>
					<Text style={[styles(colors).textInput, styles(colors).text]}>
						Example@gmail.com
					</Text>
				</View>
				<EditBox
					id='about'
					tag='About'
					def=''
					mult={true}
					numLines={5}
					backColor={true}
					handle={handleChange}
				/>
				<View style={styles(colors).formContainer}>
					<Text style={[styles(colors).textTitle, styles(colors).text]}>
						Account Created On
					</Text>
					<Text style={[styles(colors).textInput, styles(colors).text]}>
						Date
					</Text>
				</View>
				<SubmitButton submit={onSubmit} />
			</View>
		</SafeAreaView>
	);
}

const EditBox = (props) => {
	const [text, onChangeText] = React.useState(props.def);
	const [focused, onSelected] = React.useState(false);

	const handleChange = (e) => {
		onChangeText(e.target.value);
		props.handle(props.id, e);
	};

	useEffect(() => {}, [focused]);

	return (
		<View style={styles(colors).formContainer}>
			<Text style={[styles(colors).textTitle, styles(colors).text]}>
				{props.tag}
			</Text>
			<TextInput
				onFocus={() => onSelected(true)}
				onBlur={() => onSelected(false)}
				onChange={(e) => handleChange((props.id, e))}
				value={text}
				defaultValue={props.place}
				style={
					props.mult
						? styles(colors).textMultiInput
						: [
								styles(colors).textInput,
								styles(colors).text,
								focused ? styles(colors).textInputSelected : null,
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
		<View style={styles(colors).submitButtonPosition}>
			<Pressable
				style={styles(colors).submitButton}
				onPress={() => props.submit()}>
				<Text style={styles(colors).submitButtonText}>SUBMIT</Text>
			</Pressable>
		</View>
	);
};

export default ViewEditProfile;
