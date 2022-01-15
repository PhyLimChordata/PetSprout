import React, { useContext } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

function BackButton(props) {
	const { colors } = useTheme();
	return (
		<TouchableOpacity
			style={{ width: 30, height: 25 }}
			activeOpacity={0.6}
			onPress={() => {
				props.navigation.goBack(null);
			}}
		>
			<Image
				source={require('../resources/images/BackButton.png')}
				resizeMode='contain'
				style={{
					tintColor: colors.Quaternary,
					width: 25,
					height: 25,
				}}
			/>
		</TouchableOpacity>
	);
}

export default BackButton;
