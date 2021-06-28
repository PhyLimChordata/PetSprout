import React, {useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';

import styles from '../styling/Habits';

function Menu(props) {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={() => changeCompletion}>
            <Image style={styles.menu} source={require('../resources/images/Menu.png')}/>
        </TouchableOpacity>
    );
}

export default Menu;