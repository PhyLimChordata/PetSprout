import React, {useState} from 'react';
import {Image, TouchableHighlight} from 'react-native';

import styles from '../styling/Habits';

function Checkmark(props) {
    return (
        <TouchableHighlight onPress={() => changeCompletion}>
            <Image style={styles.checkmark} source={require('../resources/images/Checkmark.png')}/>
        </TouchableHighlight>
    );
}

export default Checkmark;