import { Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import { useTheme } from '@react-navigation/native';
import Colours from '../resources/themes/Colours';

function PomodoroMode(props) {
	const { colors } = useTheme();

	const switchModes = (mode) => {
        if (!props.active) {
            props.modeSelect(mode);
			props.setTimer(props.duration[mode])
        }
	};

	return props.modeSelected == props.mode ? (
		<TouchableOpacity
			activeOpacity={0.6}
			style={{
				backgroundColor: colors.Quaternary,
				borderRadius: 30,
				flex: 1,
                borderColor: colors.background,
				borderWidth: 3,
				margin: 10,
				textAlign: 'center',
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			<Text
				style={{
					fontSize: 16,
					textAlign: 'center',
					fontWeight: 'bold',
					paddingBottom: 5,
					color: colors.background,
				}}
			>
				{props.mode}
			</Text>
		</TouchableOpacity>
	) : !props.break && props.mode != 'Pomodoro' ? (
		<TouchableOpacity
			activeOpacity={0.6}
			style={{
				backgroundColor: Colours.Grey.ExpBarBackground,
				borderRadius: 30,
				borderColor: colors.background,
				borderWidth: 3,
				flex: 1,
				margin: 10,
				textAlign: 'center',
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			<Text
				style={{
					fontSize: 16,
					textAlign: 'center',
					fontWeight: 'bold',
					paddingBottom: 5,
					color: colors.background,
				}}
			>
				{props.mode}
			</Text>
		</TouchableOpacity>
	) : (
		<TouchableOpacity
			activeOpacity={0.6}
			style={{
				backgroundColor: colors.Background,
				borderRadius: 30,
				borderColor: colors.Quaternary,
				borderWidth: 3,
				flex: 1,
				margin: 10,
				textAlign: 'center',
				display: 'flex',
				justifyContent: 'center',
			}}
			onPress={() => switchModes(props.mode)}
		>
			<Text
				style={{
					fontSize: 16,
					textAlign: 'center',
					fontWeight: 'bold',
					paddingBottom: 5,
					color: colors.Quaternary,
				}}
			>
				{props.mode}
			</Text>
		</TouchableOpacity>
	);
}

export default PomodoroMode;
