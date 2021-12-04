import { Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';

import styles from '../styling/Authentication';

import { useTheme } from '@react-navigation/native';

function TextBox(props) {
	const { colors } = useTheme();
	const {
		containerStyle,
		boxStyle = styles(colors).authenticationInput,
		TextStyle = styles(colors).authenticationText,
		multiline = false,
	} = props;

	return (
		<View style={containerStyle}>
			<Text style={TextStyle}>{props.header}</Text>
			<TextInput
				onTouchStart={props.onPress}
				multiline={multiline}
				style={boxStyle}
				onChangeText={(content) => props.setText(content)}
			></TextInput>
		</View>
	);
}

export default TextBox;
