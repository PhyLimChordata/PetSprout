import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

function Menu(props) {
	const { colors } = useTheme();
	return (
		<TouchableOpacity activeOpacity={0.6} onPress={props.menuClicked}>
			<Image
				style={{ width: 30, height: 25, tintColor: colors.Quaternary }}
				source={require('../resources/images/Menu.png')}
			/>
		</TouchableOpacity>
	);
}

export default Menu;
