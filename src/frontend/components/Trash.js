import React, {useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';

import styles from '../styling/Habits';

function Trash(props) {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
            <Image style={styles.swipeIcon} resizeMode={'contain'} source={require('../resources/images/Trash.png')}/>
        </TouchableOpacity>
    );
}

export default Trash;
