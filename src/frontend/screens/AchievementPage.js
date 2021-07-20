import React from 'react';
import {View, Text, Image } from 'react-native';
import styles from '../styling/AchievementStyling'
import { ProgressBar, Colors } from 'react-native-paper';

function AchievementPage() {
    return(
        <View style={styles.headContainer}>
            <View>
            <Text style={styles.achievementName}>Streaks</Text>
                <View style={styles.achivementRow}>
                    <OneAchievement progress={0.3} srcPath={require('../resources/assets/icon.png')}/>
                    <OneAchievement progress={0.8} srcPath={require('../resources/assets/icon.png')}/>
                    <OneAchievement progress={0.6} srcPath={require('../resources/assets/icon.png')}/>
                </View>
            </View>

        </View>
    );
}

const OneAchievement = (props) => {
    const sty = (props.progress > 0.33) ? (props.progress > 0.66 ? styles.achievementGold : styles.achievementSilver) : styles.achievementBronze;
    return(
        <View style={styles.achivementContainer}>
            <Image style={[styles.achievementIcon, sty]} source={props.srcPath}/>
            <ProgressBar progress={props.progress} style={styles.progressBar} color='#75D6FF' />
        </View>
        
    );
}

export default AchievementPage