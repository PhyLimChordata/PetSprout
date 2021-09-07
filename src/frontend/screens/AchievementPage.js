import React from 'react';
import {View, Text, Image } from 'react-native';
import styles from '../styling/AchievementStyling'
import { ProgressBar, Colors } from 'react-native-paper';
import MenuHeader from '../components/MenuHeader'
import {SafeAreaView} from 'react-native';
import {useTheme} from '@react-navigation/native';
// data from database

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
    const {colors} = useTheme();
    return(
        <SafeAreaView>
            <View style={styles(colors).achievementRow}>
                <MenuHeader text="Achievement" navigation={props.navigation}>
                    <Text>AchiIcon</Text>
                </MenuHeader>
            </View>
            
            <View style={styles(colors).headContainer}>
                {achievements.map(item => (
                    <OneCategory key={item.category} category={item.category} progresses={item.progresses}/>
                ))}
            </View>  
        </SafeAreaView>
    );
}

const OneCategory = (props) => {
    const {colors} = useTheme();
    return(
        <View key={props.key}>
        <Text style={[styles(colors).achievementName, styles(colors).textstyles(colors)]}>{props.category}</Text>
            <View style={styles(colors).achievementRow}>
                {(props.progresses).map(item => (
                    <OneAchievement key={item} progress={item.progress} srcPath={item.iconSrc}/>
                ))}
            </View>
        </View>
    )
}

const OneAchievement = (props) => {
    const {colors} = useTheme();
    const sty = (props.progress > 0.33) ? (props.progress > 0.66 ? styles(colors).achievementGold : styles(colors).achievementSilver) : styles(colors).achievementBronze;
    return(
        <View style={styles(colors).achievementContainer}>
            <Image style={[styles(colors).achievementIcon, sty]} source={props.srcPath}/>
            <ProgressBar progress={props.progress} style={styles(colors).progressBar} color='#75D6FF' />
        </View>
        
    );
}

export default AchievementPage
