import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from '@react-navigation/native';
import { AuthContext } from '../Context';

import styles from '../styling/Popup';

function Popup(props) {
	const { colors } = useTheme();
	const style = styles(colors);
	let confirmation_button = (
		<View style={style.popupButtonContainer}>
			<TouchableOpacity
				activeOpacity={0.6}
				style={style.popupButton}
				onPress={() => {
					props.setModalVisible(false);
					props.successFunction()
				}}
			>
				<Text style={style.popupButtonText}>Yes</Text>
			</TouchableOpacity>
			<TouchableOpacity
				activeOpacity={0.6}
				style={style.popupButton}
				onPress={() => {
					props.setModalVisible(false);
					props.failureFunction()
				}}
			>
				<Text style={style.popupButtonText}>No</Text>
			</TouchableOpacity>
		</View>
	);
	let continue_button = (
		<View style={style.popupButtonContainer}>
			<TouchableOpacity
				activeOpacity={0.6}
				style={style.popupButton}
				onPress={() => {
					props.setModalVisible(false);
					props.successFunction()
				}}
			>
				<Text style={style.popupButtonText}>Yes</Text>
			</TouchableOpacity>
		</View>
	)

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
				style={{ justifyContent: 'center', alignItems: 'center' }}
			>
				<View style={style.container}>
					<View style={props.style}>
						<View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
							<Image style={style.popupImage} source={props.image} />
							<Text style={style.title}>{props.title}</Text>
							<Text style={[style.text, { textAlign: 'center' }]}>
								{props.text}
							</Text>
						</View>
						<View style={{marginBottom:10}}>
							{props.buttonType == 'confirmation' && confirmation_button}
							{props.buttonType == 'continue' && continue_button}
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
}

export default Popup;
