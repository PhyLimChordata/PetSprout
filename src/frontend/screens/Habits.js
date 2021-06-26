import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';

import styles from '../styling/Habits'

function Habits(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>{Capitalize(props.name)}</Text>
            <View style={styles.horizontalContainer}>
                {props.arr.map((data, index) => {
                    return (<DaysOfTheWeek/>)
                })}
            </View>
        </View>
    );
}

function Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function DaysOfTheWeek(arr) {
    //Set the days of the week to its correct order
    let x;
    return (
        <Text>as</Text>
    );
}

export default Habits;
