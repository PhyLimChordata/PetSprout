import React, {useState} from 'react';
import {View, Image, TouchableHighlight} from 'react-native';

import styles from '../styling/Habits';

function Frequency(props) {
    return (
        <View style={styles.horizontalContainer}>
            <View style={styles.ellipsisCircle}/>
            <View style={styles.ellipsisCircle}/>
            <View style={styles.ellipsisCircle}/>
        </View>
    );
}

export default Frequency;