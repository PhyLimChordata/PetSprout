import React, {useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';

import styles from '../styling/Habits';

function Trash(props) {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={() => changeCompletion}>
            <Image style={styles.swipeIcon} source={require('../resources/images/Trash.png')}/>
        </TouchableOpacity>
    );
}

export default Trash;