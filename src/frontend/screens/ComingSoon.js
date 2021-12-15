import React, { useContext } from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';

import styles from '../styling/ComingSoon';
import MenuHeader from '../components/MenuHeader';

import { useTheme } from '@react-navigation/native';
import { AuthContext } from '../Context';

function ComingSoon(props) {
	const { colors } = useTheme();
	const { getLogo, getComingSoon } = useContext(AuthContext);

	return (
		<SafeAreaView style={styles(colors).headContainer}>
			<MenuHeader text={props.title} navigation={props.navigation} />
			<View style={styles(colors).container}>
				<Image style={styles(colors).logo} source={getLogo} />
				<Text style={styles(colors).comingSoonText}>Coming Soon...</Text>
			</View>

			<Image style={styles(colors).creature} source={getComingSoon} />
		</SafeAreaView>
	);
}

export default ComingSoon;
