import React, {useState} from 'react';
import {View, Text} from 'react-native';

import styles from '../styling/Header';
import Menu from './Menu';
import SideMenu from "./SideMenu";
import BottomPopup from "./BottomPopup";

function Header(props) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
        <View style={styles.header}>
            <Menu menuClicked={() => setModalVisible(true)}/>
            <Text style={styles.Text}>{props.text}</Text>
            <View style={styles.MiddleComponent}/>
            <SideMenu modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        </View>
        </>
    );
}

export default Header;
