import React, { useEffect } from 'react';
import {View, Text, ColorPropType} from 'react-native';
import styles from '../styling/AchievementStyling'
import { Image, StyleSheet, TextInput } from "react-native";
import { onChange } from 'react-native-reanimated';
import ColorSet from '../resources/themes/Global';

import icon from '../resources/assets/icon.png'

function AchievementPage(props) {
    return(
        <View>
            <Text>Acheivements</Text>
            <Image source={require('../resources/assets/icon.png')}/>

        </View>
    );
}

const OneAchievement = (props) => {
    const sty = (props.progress > 33) ? (props.progress > 66 ? styles.achievementGold : styles.achievementSilver) : styles.achievementBronze;
    return(
        <Image source={props.icon} styles={[styles.achivementIcon, sty]}/>
    );
}

export default AchievementPage