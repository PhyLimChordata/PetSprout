import React, { useContext } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { AuthContext } from '../Context';

function BackButton(props) {
	const { colors } = useTheme();
	const { changeRefreshing } = useContext(AuthContext);
	return (
		<TouchableOpacity
			style={{ width: 30, height: 25 }}
			activeOpacity={0.6}
			onPress={() => {
				changeRefreshing(true);
				props.navigation.goBack(null);
			}}>
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
