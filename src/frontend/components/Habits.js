import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';

import styles from '../styling/Habits';
import DayPicker from '../components/DayPicker';
import Ellipsis from '../components/Ellipsis';
import Checkmark from '../components/Checkmark';

function Habits(props) {
    return (
        <View style={styles.horizontalContainer}>
            <View style={styles.leftContainer}>
                <Text style={styles.textTitle}>{Capitalize(props.name)}</Text>
                <View style={styles.horizontalContainer}>
                    {props.arr.map((data, index) => {
                        return (<DaysOfTheWeek/>)
                    })}
                </View>
            </View>
            <View style={styles.container}>
                <Ellipsis/>
                <Checkmark/>
            </View>
        </View>
    );
}

function Capitalize(str){
    if (str != null) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return "";
}

function DaysOfTheWeek(arr) {
    return (
        <DayPicker/>
    );
}

export default Habits;
