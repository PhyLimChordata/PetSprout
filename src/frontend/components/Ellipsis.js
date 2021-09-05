import React, {useState} from 'react';
import {View, Image, TouchableHighlight} from 'react-native';

import styles from '../styling/Habits';

import {useTheme} from '@react-navigation/native';

function Ellipsis(props) {
    const {colors} = useTheme();
    return (
        <View style={styles(colors).horizontalContainer}>
            <View style={styles(colors).ellipsisCircle}/>
            <View style={styles(colors).ellipsisCircle}/>
            <View style={styles(colors).ellipsisCircle}/>
        </View>
    );
}

export default Ellipsis;