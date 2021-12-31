import React, { useContext } from 'react';
import {
	View,
	SafeAreaView,
	Image,
	Text,
	TouchableOpacity,
} from 'react-native';

import MenuHeader from '../components/MenuHeader';
import HomeButton from '../components/HomeButton';
import styles from '../styling/About';

import { useTheme } from '@react-navigation/native';
import { AuthContext } from '../Context';

function About(props) {
	const { colors } = useTheme();
	const style = styles(colors);
	const { getLogo } = useContext(AuthContext);

	return (
		<SafeAreaView style={{ height: '100%' }}>
			<MenuHeader text='About' navigation={props.navigation}></MenuHeader>
			<View style={style.container}>
				<Image style={style.aboutLogo} source={getLogo} />
				<Text style={style.textTitle}>PetSprout</Text>
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
			<HomeButton navigation={props.navigation} colors={colors} />
		</SafeAreaView>
	);
}

export default About;
