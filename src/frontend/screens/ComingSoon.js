import React from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';

import styles from '../styling/ComingSoon';
import MenuHeader from '../components/MenuHeader';

import { useTheme } from '@react-navigation/native';

function ComingSoon(props) {
	const { colors } = useTheme();
	return (
		<SafeAreaView style={styles(colors).headContainer}>
			<MenuHeader text={props.title} navigation={props.navigation} />
			<View style={styles(colors).container}>
				<Image
					style={styles(colors).logo}
					source={require('../resources/images/Logo.png')}
				/>
				<Text style={styles(colors).comingSoonText}>Coming Soon...</Text>
			</View>

			<Image
				style={styles(colors).creature}
				source={require('../resources/images/ComingSoon.png')}
			/>
		</SafeAreaView>
	);
}

export default ComingSoon;
