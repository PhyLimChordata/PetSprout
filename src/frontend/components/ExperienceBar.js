import React from 'react';
import { View, Text } from 'react-native';

import styles from '../styling/Habits';

import { useTheme } from '@react-navigation/native';

function ExperienceBar(props) {
	const { colors } = useTheme();
	var widthPercent = (props.exp / props.xpLevelCap) * 100;
	var width = widthPercent + '%';
	var experience = {
		// FOR MOBILE DEBUGGING TODO: Switch to props.width
		// width: 20,
		width: width,
		height: 15,
		backgroundColor: colors.Tertiary,
		borderRadius: 10,
	};

	return (
		<View style={styles(colors).experienceContainer}>
			<View style={styles(colors).horizontalExperienceContainer}>
				<Text style={styles(colors).levelText}>Level {props.level}</Text>
				<View style={styles(colors).rightText}>
					<Text style={styles(colors).expText}>
						{props.exp}/{props.xpLevelCap}
					</Text>
				</View>
			</View>
			<View style={styles(colors).expBar}>
				<View style={experience} />
			</View>
		</View>
	);
}

export default ExperienceBar;
