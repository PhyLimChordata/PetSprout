import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

function Menu(props) {
	return (
		<TouchableOpacity activeOpacity={0.6} onPress={() => menuClicked}>
			<Image
				style={{ width: 30, height: 25 }}
				source={require('../resources/images/Menu.png')}
			/>
		</TouchableOpacity>
	);
}

export default Menu;
