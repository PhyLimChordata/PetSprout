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
import styles from '../styling/SupportUs';

import { useTheme } from '@react-navigation/native';

function SupportUs(props) {
	const { colors } = useTheme();
	const style = styles(colors);
	return (
		<SafeAreaView>
			<MenuHeader text='Support Us' navigation={props.navigation}></MenuHeader>
			<View style={style.container}>
				<Image
					style={style.supportUsLogo}
					source={require('../resources/images/SupportUs.png')}
				/>
					<Text style={style.textTitle}>Appreciate the Support!</Text>
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
			</View>
		</SafeAreaView>
	);
}

export default SupportUs;
