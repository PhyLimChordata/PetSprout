import React from 'react';
import { Text, View } from 'react-native';

import { useTheme } from '@react-navigation/native';

function TimeTab(props) {
	const { colors } = useTheme();
	let time_index = Math.max(props.time.search('AM'), props.time.search('PM'));
	return (
		<View
			style={{
				flexDirection: 'row',
				backgroundColor: colors.Quaternary,
				paddingHorizontal: 5,
				flex: 1,
				alignItems: 'flex-end',
				borderRadius: 10,
				height: 60,
			}}
		>
			<Text
				style={{
					fontSize: 50,
					fontWeight: 'bold',
					color: colors.background,
					marginRight: -5,
				}}
			>
				{' '}
				{props.time.slice(0, time_index - 1)}{' '}
			</Text>
			<Text
				style={{
					fontSize: 20,
					fontWeight: 'bold',
					color: colors.background,
					marginBottom: 9,
				}}
			>
				{' '}
				{props.time.slice(time_index - 1)}{' '}
			</Text>
		</View>
	);
}

export default TimeTab;
