import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import MenuPagesStyles from '../styling/MenuPages';

function HomeButton(props) {
	let menuPageStyles = MenuPagesStyles(props.colors);

	return (
		<View style={menuPageStyles.bottom}>
			<TouchableOpacity
				style={menuPageStyles.homeButton}
				onPress={() => props.navigation.navigate('HomeScreen')}
			>
				<Image
						source={require('../resources/images/Home.png')}
						style={menuPageStyles.homeIcon}
				/>
			</TouchableOpacity>
		</View>
	);
}
export default HomeButton;
