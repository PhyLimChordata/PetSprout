import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

function BackButton(props) {
	return (
		<TouchableOpacity
			style={{ width: 30, height: 25 }}
			activeOpacity={0.6}
			onPress={() => props.navigation.goBack(null)}>
			<Image source={require('../resources/images/BackButton.png')} />
		</TouchableOpacity>
	);
}

export default BackButton;
