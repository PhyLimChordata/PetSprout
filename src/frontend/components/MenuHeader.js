import React, { useState } from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import styles from '../styling/Header';
import Menu from './Menu';
import BackButton from './BackButton'
import SideMenu from './SideMenu';

function MenuHeader(props) {
	const [modalVisible, setModalVisible] = useState(false);
	return (
		<View style={styles.header}>
			<View style={styles.menuTitle}>

				{ props.back ? <BackButton navigation={props.navigation}/>:
					<Menu menuClicked={() => setModalVisible(true)} />}
				<Text style={styles.headerText}>{props.text}</Text>
			</View>
			{!props.back && <SideMenu modalVisible={modalVisible} setModalVisible={setModalVisible} navigation={props.navigation} />}
			{props.children}
			<View style={{alignContent:'flex-end', height:25}}>
				{props.right}
			</View>
		</View>
	);
}

export default MenuHeader;
