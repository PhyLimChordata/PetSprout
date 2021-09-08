import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

import styles from '../styling/Habits';

function Ellipsis(props) {
    return (
        <TouchableOpacity style={styles.horizontalContainer} onPress={props.onPress}>
            <View style={styles.ellipsisCircle}/>
            <View style={styles.ellipsisCircle}/>
            <View style={styles.ellipsisCircle}/>
        </TouchableOpacity>
    );
}

export default Ellipsis;
