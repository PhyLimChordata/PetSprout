import React, { useState, useContext } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	Image,
	requireNativeComponent,
} from 'react-native';
import MenuHeader from '../components/MenuHeader';

import { useTheme } from '@react-navigation/native';
import styles from '../styling/HabitsScreen';
import TextBox from '../components/TextBox';
import { AuthContext } from '../Context';
function Button(props) {
	const { colors } = useTheme();
	return (
		<TouchableOpacity
			onPress={props.onPress}
			style={{
				height: 50,
				width: 175,
				marginTop: 20,
				backgroundColor: colors.Quaternary,
				justifyContent: 'center',
				alignItems: 'center',
				borderRadius: 20,
				marginHorizontal: 10,
			}}
		>
			<Text
				style={{ fontSize: 20, fontWeight: 'bold', color: colors.background }}
			>
				{' '}
				{props.text}{' '}
			</Text>
		</TouchableOpacity>
	);
}

function NameHabit(props) {
	const { getToken, changePet } = useContext(AuthContext);
	const namePet = (name) => {
		fetch('http://3.15.57.200:5000/api/v1.0.0/pets/name_pet', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'authentication-token': getToken,
			},
			body: JSON.stringify({ name: name }),
		})
			.then((res) =>
				res.json().then((data) => {
					changePet(data.image)
					props.navigation.navigate('Habit');
				}),
			)
			.catch(() => console.log('error'));
		//Prompt an are you sure pop up - (independent of if they provide a name)
		//update the pet using the fetch command passing in the pet's id by getting the user id (viewaccount route)
	};
	const { colors } = useTheme();
	const [name, setName] = useState(props.reason);
	return (
		<SafeAreaView style={styles(colors).headContainer}>
			<MenuHeader
				text='Evolution'
				navigation={props.navigation}
				hideRight={true}
			/>
			<View style={{ alignItems: 'center' }}>
				<Image
					style={{ marginVertical: 30 }}
					source={require('../resources/images/Creature.png')}
				/>
				<Text
					style={{
						fontSize: 25,
						fontWeight: 'bold',
						color: colors.Quaternary,
						textAlign: 'center',
						marginBottom: 40,
						paddingHorizontal: 50,
					}}
				>
					Congratulations! Your Pet has hatched! What would you like to name
					it?
				</Text>
				<Text
					style={{
						fontSize: 25,
						fontWeight: 'bold',
						color: colors.Quaternary,
					}}
				>
					Name your Pet!
				</Text>
				<TextBox setText={setName} text={name}></TextBox>
				<View style={{ flexDirection: 'row' }}>
					<Button text='SHARE' onPress={() => console.log('SHARE')} />
					<Button text='CONTINUE' onPress={() => namePet(name)} />
				</View>
			</View>
		</SafeAreaView>
	);
}

export default NameHabit;
