import React, {useState} from 'react';
import {View, TouchableHighlight} from 'react-native';

import styles from '../styling/Habits';

function DayPicker(props) {
    const [x, setX] = useState({props});
    //Check for the day
    if (1) {
        return (
                <TouchableHighlight style={styles.Circle} onPress={() => changeCompletion}>
                <View />
                </TouchableHighlight>
        );
    }

    return (
        <TouchableHighlight style={styles.TodayCircle} onPress={() => changeCompletion}>
            <View />
        </TouchableHighlight>
    );
}

export default DayPicker;