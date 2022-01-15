import React, { useContext } from 'react';
import {
	View,
	SafeAreaView,
	Image,
	Text,
	TouchableOpacity, ScrollView, Dimensions, Platform
} from 'react-native';
import Constants from 'expo-constants';
import androidSafeAreaView from '../styling/AndroidSafeAreaView';
import MenuHeader from '../components/MenuHeader';
import HomeButton from '../components/HomeButton';
import styles from '../styling/About';

import { useTheme } from '@react-navigation/native';
import { AuthContext } from '../Context';

function About(props) {
	const { colors } = useTheme();
	const style = styles(colors);
	const { getLogo } = useContext(AuthContext);
	const {height, width} = Dimensions.get('window');
	console.log(Constants.manifest)
	return (
		<SafeAreaView style={androidSafeAreaView().AndroidSafeArea}>
			<MenuHeader text='About' navigation={props.navigation}></MenuHeader>
			<View style={{alignItems:'center'}}>

				<Image style={{
					marginTop: 20,
					height: height * 0.22,
					width: height * 0.22,
					resizeMode: 'contain',}} source={getLogo} />
				<Text style={style.textTitle}>PetSprout</Text>
				<Text style={style.textSubtitle}>Version {Platform.OS === 'android' ? Constants.manifest.android.versionCode : Constants.manifest.ios.buildNumber}</Text>
			</View>
				<ScrollView style= {{flex:1, marginBottom:20}} contentContainerStyle={style.container}>
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
					<TouchableOpacity
						activeOpacity={0.6}
						style={style.aboutButton}
						onPress={() => {
							props.navigation.navigate('PrivacyPolicyScreen');
						}}
					>
						<Text style={style.aboutButtonText}>Privacy Policy</Text>
					</TouchableOpacity>
				</ScrollView>
			<HomeButton navigation={props.navigation} colors={colors} />
		</SafeAreaView>
	);
}

export default About;
