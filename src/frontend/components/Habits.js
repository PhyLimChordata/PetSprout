import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';

import styles from '../styling/Habits';
import Ellipsis from './Ellipsis';
import Checkmark from '../components/Checkmark';

function Habits(props) {
	return (
		<View style={styles.horizontalContainer}>
			<View style={styles.leftContainer}>
				<Text style={styles.textTitle}>{Capitalize(props.name)}</Text>
			</View>
			<View style={styles.container}>
				<Ellipsis />
			</View>
		</View>
	);
}

function Capitalize(str) {
	if (str != null) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	return '';
}

export default Habits;
