import React, {useState} from 'react';
import {View, TouchableHighlight} from 'react-native';

import styles from '../styling/Habits';

function DayPicker(props) {
    const [x, setX] = useState({props});
    //Check for the day
    if (1) {
        return (
                <TouchableHighlight style={styles.circle} onPress={() => changeCompletion}>
                <View />
                </TouchableHighlight>
        );
    }

    return (
        <TouchableHighlight style={styles.todayCircle} onPress={() => changeCompletion}>
            <View />
        </TouchableHighlight>
    );
}

export default DayPicker;