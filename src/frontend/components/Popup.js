import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from '@react-navigation/native';

import styles from '../styling/Popup';

function Popup(props) {
	const { colors } = useTheme();
	const style = styles(colors);
	let confirmation_button = (
		<View style={{ flexDirection: 'row' }}>
			<TouchableOpacity
				activeOpacity={0.6}
				style={style.popupButton}
				onPress={() => {
					props.setModalVisible(false);
					if (props.successFunction) {
						props.successFunction();
					}
				}}
			>
				<Text style={style.popupButtonText}>
					{' '}
					{props.successText ? props.successText : 'Yes'}{' '}
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				activeOpacity={0.6}
				style={style.popupButton}
				onPress={() => {
					props.setModalVisible(false);
					if (props.failureFunction) {
						props.failureFunction();
					}
				}}
			>
				<Text style={style.popupButtonText}>
					{' '}
					{props.failureText ? props.failureText : 'No'}{' '}
				</Text>
			</TouchableOpacity>
		</View>
	);
	let continue_button = (
		<View style={{ flexDirection: 'row' }}>
			<TouchableOpacity
				activeOpacity={0.6}
				style={style.popupButton}
				onPress={() => {
					props.setModalVisible(false);
					if (props.successFunction) {
						props.successFunction();
					}
				}}
			>
				<Text style={style.popupButtonText}>
					{' '}
					{props.successText ? props.successText : 'Continue'}
				</Text>
			</TouchableOpacity>
		</View>
	);

	return (
		<View>
			<Modal
				isVisible={props.modalVisible}
				onBackdropPress={() => {
					if (!props.disableHideOnBackPress) {
						props.setModalVisible(false)
					}
				}}
				onSwipeComplete={(e) => {
					props.setModalVisible(false);
				}}
				useNativeDriverForBackdrop
				swipeDirection={['down']}
				style={{ justifyContent: 'center', alignItems: 'center' }}
			>
				<View style={style.container}>
					<View style={props.style}>
						<View
							style={{
								flex: 1,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Image style={style.popupImage} source={props.image} />
							<Text style={style.title}>{props.title}</Text>
							<Text style={[style.text, { textAlign: 'center' }]}>
								{props.text}
							</Text>
						</View>
						{props.buttonType == 'confirmation' && confirmation_button}
						{props.buttonType == 'continue' && continue_button}
					</View>
				</View>
			</Modal>
		</View>
	);
}

export default Popup;
