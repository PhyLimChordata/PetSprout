import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';

import styles from '../styling/Habits';

function DayPicker(props) {
    const [x, setX] = useState({props});
    //Check for the day
    if (1) {
        return (
                <TouchableOpacity activeOpacity={0.6} style={styles.circle} onPress={() => changeCompletion}>
                <View />
                </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity activeOpacity={0.6} style={styles.todayCircle} onPress={() => changeCompletion}>
            <View />
        </TouchableOpacity>
    );
}

export default DayPicker;