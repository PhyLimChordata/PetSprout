import React, {useState} from 'react';
import {View, Image, TouchableHighlight} from 'react-native';

import styles from '../styling/Habits';

function Ellipsis(props) {
    return (
        <View style={styles.horizontalContainer}>
            <View style={styles.EllipsisCircle}/>
            <View style={styles.EllipsisCircle}/>
            <View style={styles.EllipsisCircle}/>
        </View>
    );
}

export default Ellipsis;