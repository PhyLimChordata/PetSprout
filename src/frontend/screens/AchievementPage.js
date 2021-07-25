import React from 'react';
import {View, Text, Image } from 'react-native';
import styles from '../styling/AchievementStyling'
import { ProgressBar, Colors } from 'react-native-paper';
import MenuHeader from '../components/MenuHeader'

function AchievementPage() {
    return(
        <View>
            <View style={styles.achievementRow}>
                <MenuHeader text="Acheivement"/>
            </View>
            
            <View style={styles.headContainer}>
                <View>
                <Text style={[styles.achievementName, styles.textStyles]}>Streaks</Text>
                    <View style={styles.achievementRow}>
                        <OneAchievement progress={0.3} srcPath={require('../resources/assets/icon.png')}/>
                        <OneAchievement progress={0.8} srcPath={require('../resources/assets/icon.png')}/>
                        <OneAchievement progress={0.6} srcPath={require('../resources/assets/icon.png')}/>
                    </View>
                </View>

            </View>  
        </View>
        
    );
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