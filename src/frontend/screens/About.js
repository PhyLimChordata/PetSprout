import React from 'react';
import {
	View,
	SafeAreaView,
	Image,
	Text,
	ScrollView,
	TouchableOpacity,
} from 'react-native';

import MenuHeader from '../components/MenuHeader';
import styles from '../styling/About';

import { useTheme } from '@react-navigation/native';

function About(props) {
	const { colors } = useTheme();
	const style = styles(colors);

	return (
		<SafeAreaView>
			<MenuHeader text='About' navigation={props.navigation}></MenuHeader>
			<View style={style.container}>
				<Image
					style={style.aboutLogo}
					source={require('../resources/images/Logo.png')}
				/>
				<Text style={style.textTitle}>HabiPets</Text>
				<Text style={style.textSubtitle}>Version 1.0.0</Text>

				<Text style={style.text}>
					The creators of this app wanted to create {'\n'}
					an application that would guide people to form {'\n'}
					realistic and sustainable habits. We believe that {'\n'}
					forming an identity and reflecting constantly {'\n'}
					is necessary for doing so.
				</Text>
				<TouchableOpacity
					activeOpacity={0.6}
					style={style.aboutButton}
					onPress={() => {
						props.navigation.navigate('CollaboratorsScreen');
					}}
				>
					<Text style={style.aboutButtonText}>Collaborators</Text>
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={0.6}
					style={style.aboutButton}
					onPress={() => {
						props.navigation.navigate('SupportUsScreen');
					}}
				>
					<Text style={style.aboutButtonText}>Support Us</Text>
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={0.6}
					style={style.aboutButton}
					onPress={() => {
						props.navigation.navigate('TermsAndConditionScreen');
					}}
				>
					<Text style={style.aboutButtonText}>Terms and Condition</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

export default About;
