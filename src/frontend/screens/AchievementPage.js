import React from 'react';
import {View, Text, Image } from 'react-native';
import styles from '../styling/AchievementStyling'
import { ProgressBar, Colors } from 'react-native-paper';
import MenuHeader from '../components/MenuHeader'

let achievements = [
    {
        category: 'Streaks',
        progresses: [
            {
                progress: 0.3,
                iconSrc: require('../resources/assets/icon.png'),
            },
            {
                progress: 0.5,
                iconSrc: require('../resources/assets/icon.png'),
            },
            {
                progress: 0.8,
                iconSrc: require('../resources/assets/icon.png'),
            },
        ]
    },
    {
        category: 'Creature',
        progresses: [
            {
                progress: 0.3,
                iconSrc: require('../resources/assets/icon.png'),
            },
            {
                progress: 0.3,
                iconSrc: require('../resources/assets/icon.png'),
            },
            {
                progress: 0.3,
                iconSrc: require('../resources/assets/icon.png'),
            },
        ]
    },
    {
        category: 'Accountability',
        progresses: [
            {
                progress: 0.3,
                iconSrc: require('../resources/assets/icon.png'),
            },
            {
                progress: 0.8,
                iconSrc: require('../resources/assets/icon.png'),
            },
            {
                progress: 0.5,
                iconSrc: require('../resources/assets/icon.png'),
            },
        ]
    },
]

function AchievementPage() {
    return(
        <View>
            <View style={styles.achievementRow}>
                <MenuHeader text="Acheivement"/>
            </View>
            
            <View style={styles.headContainer}>
                {achievements.map(item => (
                    <OneCategory key={item.category} category={item.category} progresses={item.progresses}/>
                ))}
            </View>  
        </View>
        
    );
}

const OneCategory = (props) => {
    return(
        <View key={props.key}>
        <Text style={[styles.achievementName, styles.textStyles]}>{props.category}</Text>
            <View style={styles.achievementRow}>
                {(props.progresses).map(item => (
                    <OneAchievement key={item} progress={item.progress} srcPath={item.iconSrc}/>
                ))}
            </View>
        </View>
    )
}

const OneAchievement = (props) => {
    const sty = (props.progress > 0.33) ? (props.progress > 0.66 ? styles.achievementGold : styles.achievementSilver) : styles.achievementBronze;
    return(
        <View style={styles.achievementContainer}>
            <Image style={[styles.achievementIcon, sty]} source={props.srcPath}/>
            <ProgressBar progress={props.progress} style={styles.progressBar} color='#75D6FF' />
        </View>
        
    );
}

export default AchievementPage