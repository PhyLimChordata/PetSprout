import React from 'react';
import {
	View,
	SafeAreaView,
	Image,
	Text,
	TouchableOpacity, ScrollView,
	Dimensions
} from 'react-native';
import androidSafeAreaView from '../styling/AndroidSafeAreaView';
import MenuHeader from '../components/MenuHeader';
import styles from '../styling/SupportUs';
import HomeButton from '../components/HomeButton';
import { useTheme } from '@react-navigation/native';

function SupportUs(props) {
	const { colors } = useTheme();
	const style = styles(colors);
	const {height, width} = Dimensions.get('window');
	return (
		<SafeAreaView style={androidSafeAreaView().AndroidSafeArea}>
			<MenuHeader text='Support Us' navigation={props.navigation}/>
				<View style={{alignItems:'center'}}>
					<Image
						style={{
							marginTop: 20,
							height: height * 0.22,
							width: height * 0.22,
							resizeMode: 'contain',
						}}
						source={require('../resources/images/SupportUs.png')}
					/>
					<Text style={style.textTitle}>Appreciate the Support!</Text>
				</View>
				<ScrollView style= {{flex:1, marginBottom:20}} contentContainerStyle={style.container}>
					<Text style={style.text}>
						We wish to continue our efforts in making{'\n'}
						your lives better through this app.
					</Text>
					<Text style={style.textThanks}>Thank you.</Text>
					<TouchableOpacity activeOpacity={0.6} style={style.supportUsButton}>
						<Text style={style.supportUsButtonText}>Rate Us</Text>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.6} style={style.supportUsButton}>
						<Text style={style.supportUsButtonText}>Leave a Comment</Text>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.6} style={style.supportUsButton}>
						<Text style={style.supportUsButtonText}>Donate</Text>
					</TouchableOpacity>
				</ScrollView>
			<HomeButton navigation={props.navigation} colors={colors} />
		</SafeAreaView>
	);
}

export default SupportUs;
