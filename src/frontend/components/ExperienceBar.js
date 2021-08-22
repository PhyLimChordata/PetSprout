import React, { useState } from 'react';
import {View, Text} from 'react-native';

import styles from '../styling/Habits';
import ColorSet from '../resources/themes/Global';

function ExperienceBar(props) {
    // const [experience, setExperience] = useState({});

    var experience = {
        width: props.width,
        height: 15,
        backgroundColor: ColorSet.Blue.Tertiary,
        borderRadius: 10
    }
    return (
        <View style={styles.experienceContainer}>
            <View style={styles.horizontalExperienceContainer}>
                <Text style={styles.levelText}>Level x</Text>
                <View style={styles.rightText}>
                    <Text style={styles.expText}>0/0</Text>
                </View>
            </View>
            <View style={styles.expBar}>
                <View style={experience}/>
            </View>
        </View>
    );
}

export default ExperienceBar;