import React from 'react';
import { View, Text } from 'react-native';

import styles from '../styling/Habits';

import { useTheme } from '@react-navigation/native';
import Colours from '../resources/themes/Colours';

function Counter(props) {
	const { colors } = useTheme();
	const containerColor = props.completed
		? Colours.Grey.ExpBarBackground
		: colors.Secondary;
	const textColor = props.completed ? Colours.Grey.Text : colors.Quaternary;
	return (
		<View
			style={{
				flexDirection: 'row',
				backgroundColor: containerColor,
				paddingRight: 20,
				alignItems: 'flex-end',
			}}
		>
			<Text
				style={{
					fontSize: 20,
					fontWeight: 'bold',
					color: textColor,
					paddingTop: 20,
				}}
			>
				{props.quantity}
			</Text>
			{props.supplementalInfo}
		</View>
	);
}

export default Counter;
