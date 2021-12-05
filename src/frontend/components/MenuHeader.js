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

			<View style={{ height: 70, width: 70, textAlign: 'center', alignItems: 'center', textAlignVertical: 'center', paddingRight: 30, paddingTop: 10}}>
				<Text style={{position: 'absolute', top: '40%', color: Colours.Red.HeartValue, fontSize: 20, fontWeight: 'bold', zIndex: 2}}>
						{props.hp.value}
					</Text>
				<Image style={{height: props.hp.size, width: props.hp.size, zIndex: 0}}
				source={require('../resources/images/DeadHeart.png')}/>
				<View
					style={props.hp.view}
				>
					
					<Image
						style={props.hp.image}
						source={require('../resources/images/Heart.png')}
					/>
				</View>
			</View>

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
