import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from '@react-navigation/native';

import styles from '../styling/Popup';

function Popup(props) {
	const { colors } = useTheme();
	const style = styles(colors);
	const hasButton = props.button;
	let button;

	

	if(hasButton) {
		button = (
		<View style={style.popupButtonContainer}>
			<TouchableOpacity
				activeOpacity={0.6}
				style={style.popupButton}>
				<Text style={style.popupButtonText}>Yes</Text>
			</TouchableOpacity>
			<TouchableOpacity
				activeOpacity={0.6}
				style={style.popupButton}>
				<Text style={style.popupButtonText}>No</Text>
			</TouchableOpacity>
		</View>);
	} else {
		button = "";
	}

	return (
		<View>
			<Modal
				isVisible={props.modalVisible}
				onBackdropPress={() => props.setModalVisible(false)}
				onSwipeComplete={(e) => {
					props.setModalVisible(false);
				}}
				useNativeDriverForBackdrop
				swipeDirection={['down']}
				style={{ justifyContent: "center", alignItems: "center" }}>
				<View style={style.container}>
					<View style={props.style}>
						<Image
							style={style.popupImage}
							source={props.image}
						/>
						<Text style={style.title}>{props.title}</Text>
						<Text style={style.text}>{props.text}</Text>
					</View>
				</View>
			</Modal>
		</View>
	);
}

export default Popup;