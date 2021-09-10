import React from 'react';
import { View, SafeAreaView, Image, Text, ScrollView, TouchableOpacity } from 'react-native';

import MenuHeader from '../components/MenuHeader';
import styles from "../styling/AboutStyling";

import { useTheme } from '@react-navigation/native';

function Collaborators(props) {
	const { colors } = useTheme();
	const style = styles(colors);

	return (
		<SafeAreaView>
			<MenuHeader text='Collaborator' navigation={props.navigation}></MenuHeader>
			<View style={style.container}>
				<Image
					style={style.aboutLogo}
					source={require('../resources/images/Logo.png')}
				/>
				<Text style={style.textTitle}>Collaborators</Text>
			</View>
		</SafeAreaView>
	);
}

export default Collaborators;
