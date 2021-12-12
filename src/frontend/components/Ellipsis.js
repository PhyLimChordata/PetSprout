import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import styles from '../styling/Habits';

import { useTheme } from '@react-navigation/native';
import Colours from '../resources/themes/Colours';

function Ellipsis(props) {
	const { colors } = useTheme();
	const containerColor = props.completed
		? Colours.Grey.ExpBarBackground
		: colors.Secondary;
	const textColor = props.completed ? Colours.Grey.Text : colors.Quaternary;
	return (
		<TouchableOpacity
			style={{
				flexDirection: 'row',
				borderRadius: 8,
				backgroundColor: containerColor,
			}}
			onPress={props.onPress}
		>
			<View
				style={{
					width: 6,
					height: 6,
					marginRight: 3,
					borderRadius: 3,
					backgroundColor: textColor,
				}}
			/>
			<View
				style={{
					width: 6,
					height: 6,
					marginRight: 3,
					borderRadius: 3,
					backgroundColor: textColor,
				}}
			/>
			<View
				style={{
					width: 6,
					height: 6,
					marginRight: 3,
					borderRadius: 3,
					backgroundColor: textColor,
				}}
			/>
		</TouchableOpacity>
	);
}

export default Ellipsis;
