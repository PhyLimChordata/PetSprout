import React from 'react';
import { View } from 'react-native';

import styles from '../styling/Example';

import { useTheme } from '@react-navigation/native';

// Similar to a screen, however components will be contained within a screen
function example(props) {
	const { colors } = useTheme();
	return <View style={styles(colors).container}></View>;
}

export default example;
