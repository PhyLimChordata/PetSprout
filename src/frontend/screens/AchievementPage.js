import React, { useEffect } from 'react';
import {View, Text, ColorPropType} from 'react-native';
import styles from '../styling/AchievementStyling'
import { Image, StyleSheet, TextInput } from "react-native";

function AchievementPage(props) {
    return(
        <View style={styles.headContainer}>
            <Text>Acheivements</Text>
            <OneAchievement progress={0.5}/>

        </View>
    );
}

const OneAchievement = (props) => {
    const sty = (props.progress > 0.33) ? (props.progress > 0.66 ? styles.achievementGold : styles.achievementSilver) : styles.achievementBronze;
    return(
        <View>
            <Image style={[styles.achievementIcon, sty]} source={require('../resources/assets/icon.png')}/>

        </View>
        
    );
}

export default AchievementPage