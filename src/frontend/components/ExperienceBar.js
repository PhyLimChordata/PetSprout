import React, { useState } from 'react';
import {View, Text} from 'react-native';

import styles from '../styling/Habits';
import ColorSet from '../resources/global/themes';

import {useTheme} from '@react-navigation/native';

function ExperienceBar(props) {

    const {colors} = useTheme();
    var experience = {
        width: props.width,
        height: 15,
        backgroundColor: colors.Tertiary,
        borderRadius: 10
    }
    return (
        <View style={styles(colors).experienceContainer}>
            <View style={styles(colors).horizontalExperienceContainer}>
                <Text style={styles(colors).levelText}>Level {props.level}</Text>
                <View style={styles(colors).rightText}>
                    <Text style={styles(colors).expText}>{props.exp}/100</Text>
                </View>
            </View>
            <View style={styles(colors).expBar}>
                <View style={experience}/>
            </View>
        </View>
    );
}

export default ExperienceBar;