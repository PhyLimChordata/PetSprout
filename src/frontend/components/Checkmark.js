import React, {useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';

import styles from '../styling/Habits';

import {useTheme} from '@react-navigation/native';

function Checkmark(props) {
    const {colors} = useTheme();
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
            <Image style={styles(colors).swipeIcon} source={require('../resources/images/Checkmark.png')}/>
        </TouchableOpacity>
    );
}

export default Checkmark;
