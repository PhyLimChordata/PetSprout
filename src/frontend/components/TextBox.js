import { Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';

import styles from '../styling/Authentication';

import { useTheme } from '@react-navigation/native';

function TextBox(props) {
	const { colors } = useTheme();
	const {
		containerStyle,
		boxStyle = styles(colors).authenticationInput,
		textStyle = styles(colors).authenticationText,
		multiline = false,
	} = props;

	const resetValidity = (content) => {
		props.setText(content)
		if (!props.setTextStyle) {
			props.setTextStyle(styles(colors).authenticationText);
		}
		if (!props.setTextStyle) {
		    props.setBoxStyle(styles(colors).authenticationInput);
		}
	}

	return (
		<View style={containerStyle}>
			<Text style={textStyle}>{props.header}</Text>
			<TextInput
				onTouchStart={props.onPress}
				multiline={multiline}
				style={boxStyle}
				onChangeText={(content) => resetValidity(content)}
			></TextInput>
		</View>
	);
}

export default TextBox;
