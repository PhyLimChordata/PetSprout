import React, {useState} from 'react';
import {View, Text, Image, TouchableHighlight} from 'react-native';

import styles from '../styling/Habits';

function Streaks(props) {
    return (
        <View style={styles.horizontalContainerPaddingRight}>
            <Text style={styles.levelText}>{props.quantity}</Text>
            <Text style={styles.expText}>x</Text>
        </View>
    );
}

export default Streaks;