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
	if (props.last) {
		return (
			<View
				style={{
					flexDirection: 'row',
					paddingTop: 10,
					backgroundColor: containerColor,
				}}
			>
				<Text
					style={{
						fontSize: 20,
						flex: 1,
						fontWeight: 'bold',
						color: textColor,
					}}
				>
					{props.quantity}
				</Text>
				{props.supplementalInfo}
			</View>
		);
	}
	return (
		<View
			style={{
				flexDirection: 'row',
				borderRadius: 8,
				backgroundColor: containerColor,
				paddingRight: 20,
				paddingTop: 10,
			}}
		>
			<Text
				style={{
					fontSize: 20,
					flex: 1,
					fontWeight: 'bold',
					color: textColor,
				}}>
					{props.quantity}
					</Text>
			{props.supplementalInfo}
		</View>
	);
}

export default Counter;
