import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import styles from '../styling/Habits';

import { useTheme } from '@react-navigation/native';

function Ellipsis(props) {
	const { colors } = useTheme();
	return (
		<TouchableOpacity
			style={styles(colors).horizontalContainer}
			onPress={props.onPress}>
			<View style={styles(colors).ellipsisCircle} />
			<View style={styles(colors).ellipsisCircle} />
			<View style={styles(colors).ellipsisCircle} />
		</TouchableOpacity>
	);
}

export default Ellipsis;
