import React from 'react';
import {View, Text, Image } from 'react-native';
import styles from '../styling/AchievementStyling'
import { ProgressBar, Colors } from 'react-native-paper';

function AchievementPage(props) {
    return(
        <View style={styles.headContainer}>
            <Text>Acheivements</Text>
            <View style={styles.achivementRow}>
                <OneAchievement progress={0.5}/>
                <OneAchievement progress={0.2}/>
                <OneAchievement progress={0.8}/>
            </View>

            

        </View>
    );
}


const OneAchievement = (props) => {
    const sty = (props.progress > 0.33) ? (props.progress > 0.66 ? styles.achievementGold : styles.achievementSilver) : styles.achievementBronze;
    return(
        <View style={styles.achivementContainer}>
            <Image style={[styles.achievementIcon, sty]} source={require('../resources/assets/icon.png')}/>
            <ProgressBar progress={props.progress} style={styles.progresBar} color='#75D6FF' />
        </View>
        
    );
}

export default AchievementPage