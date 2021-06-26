import React, {useState} from 'react';
import {Image, TouchableHighlight} from 'react-native';

import styles from '../styling/Habits';

function Menu(props) {
    return (
        <TouchableHighlight onPress={() => changeCompletion}>
            <Image style={styles.Menu} source={require('../resources/images/Menu.png')}/>
        </TouchableHighlight>
    );
}

export default Menu;