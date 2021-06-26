import React from 'react';
import {View, Text} from 'react-native';

import styles from '../styling/Habits';

function ExperienceBar(props) {
    return (
        <View style={styles.experienceContainer}>
            <View style={styles.horizontalExperienceContainer}>
                <Text style={styles.levelText}>Level x</Text>
                <View style={styles.rightText}>
                    <Text style={styles.expText}>0/0</Text>
                </View>
            </View>
            <View style={styles.expBar}/>
            
        </View>
    );
}

export default ExperienceBar;