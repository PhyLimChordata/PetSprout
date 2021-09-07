import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

import styles from '../styling/Habits';

import {useTheme} from '@react-navigation/native';

function Trash(props) {
    const {colors} = useTheme();
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
            <Image style={styles(colors).swipeIcon} resizeMode={'contain'} source={require('../resources/images/Trash.png')}/>
        </TouchableOpacity>
    );
}

export default Trash;
