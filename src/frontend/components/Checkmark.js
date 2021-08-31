import React, {useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';

import styles from '../styling/Habits';

function Checkmark(props) {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
            <Image style={styles.swipeIcon} source={require('../resources/images/Checkmark.png')}/>
        </TouchableOpacity>
    );
}

export default Checkmark;
