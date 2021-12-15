import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';

import styles from '../styling/Header';
import Menu from './Menu';
import BackButton from './BackButton';
import SideMenu from './SideMenu';
import LogoutConfirmation from './LogoutPopup';

import { useTheme } from '@react-navigation/native';
import Colours from '../resources/themes/Colours';

function MenuHeader(props) {
	const { colors } = useTheme();
	const [modalVisible, setModalVisible] = useState(false);
	const [logoutVisible, setLogoutVisible] = useState(false);

	var heartSize = props.hp ? props.hp.size : 0;
	var hpViewStyle = props.hp ? props.hp.view : {};
	var hpImageStyle = props.hp ? props.hp.image : {};

	return (
		<View style={styles(colors).header}>
			<View style={styles(colors).menuTitle}>
				{!props.hideRight &&
					(props.back ? (
						<BackButton navigation={props.navigation} />
					) : (
						<Menu menuClicked={() => setModalVisible(true)} />
					))}

				<Text style={styles(colors).headerText}>{props.text}</Text>
			</View>
			{!props.hideRight && !props.back && (
				<SideMenu
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					logoutVisible={logoutVisible}
					setLogoutVisible={setLogoutVisible}
					navigation={props.navigation}
				/>
			)}
			{props.children}

			{props.hp && (
				<View
					style={{
						height: heartSize,
						width: heartSize,
						textAlign: 'center',
						alignItems: 'center',
						textAlignVertical: 'center',
						paddingRight: 30,
						paddingTop: 10,
					}}
				>
					<Text
						style={{
							position: 'absolute',
							top: '40%',
							color: Colours.Red.HeartValue,
							fontSize: 20,
							fontWeight: 'bold',
							zIndex: 2,
						}}
					>
						{props.hp ? props.hp.value : ''}
					</Text>
					<Image
						style={{ height: heartSize, width: heartSize, zIndex: 0 }}
						source={require('../resources/images/DeadHeart.png')}
					/>
					<View style={hpViewStyle}>
						<Image
							style={hpImageStyle}
							source={require('../resources/images/Heart.png')}
						/>
					</View>
				</View>
			)}
			<View style={{ alignContent: 'flex-end', height: 25 }}>
				{props.right}
			</View>
			<View>
				<LogoutConfirmation
					logoutVisible={logoutVisible}
					setLogoutVisible={setLogoutVisible}
				></LogoutConfirmation>
			</View>
		</View>
	);
}

export default MenuHeader;
