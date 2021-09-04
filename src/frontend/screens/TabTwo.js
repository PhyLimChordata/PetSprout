import React from 'react';
import { View, Text } from 'react-native';

import styles from '../styling/Tabs';

import {useTheme} from '@react-navigation/native';

function TabTwo(props) {
	return (
		<View style={styles(colors).container}>
			<Text style={styles(colors).textTitle}>This is a Filler page.</Text>
		</View>
	);
}

export default TabTwo;
