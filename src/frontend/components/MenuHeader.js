import React from 'react';
import {View, Text} from 'react-native';

import styles from '../styling/Header';
import Menu from './Menu';

function Header(props) {
    return (
        <View style={styles.header}>
            <Menu/>
            <Text style={styles.Text}>{props.text}</Text>
            <View style={styles.MiddleComponent}/>
        </View>
    );
}

export default Header;