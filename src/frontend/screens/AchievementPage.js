import React, { useState, useEffect } from 'react';
import {View, Text, Image, Dimensions } from 'react-native';
import StyleSheetFactory from '../styling/AchievementStyling'
import { ProgressBar, Colors } from 'react-native-paper';
import MenuHeader from '../components/MenuHeader'
import {SafeAreaView} from 'react-native';
import {
    useFonts,
    Roboto_900Black,
  } from '@expo-google-fonts/roboto';

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
        category: 'Creatures',
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

// https://forums.expo.dev/t/text-cut-off-on-oneplus-device/4999/10
let styles = StyleSheetFactory.getSheet(Dimensions.get('screen').width,
Dimensions.get('screen').height
);

function AchievementPage() {
    let [fontsLoaded] = useFonts({
        Roboto_900Black,
      });

      if (!fontsLoaded) {
        return (
            <View></View>
        )
      } else {
        return(
            <SafeAreaView>
                <View>
                    <MenuHeader text="Acheivement  ">
                        <Text style={{
                            fontFamily: 'Roboto_900Black',
                        }}>AchiIcons</Text>
                    </MenuHeader>
                </View>
                
                <View style={styles.headContainer}>
                    {achievements.map(item => (
                        <OneCategory key={item.category} category={item.category} progresses={item.progresses}/>
                    ))}
                </View>  
            </SafeAreaView>
        );  
    }
}

/*
    
*/

const OneCategory = (props) => {
    return(
        <View key={props.key}>
        <Text style={[styles.achievementName, styles.textStyles, { fontFamily: 'Roboto_900Black'}]}>{props.category}</Text>
            <View style={styles.achievementRow}>
                {(props.progresses).map((item, index) => (
                    <OneAchievement key={index} progress={item.progress} srcPath={item.iconSrc}/>
                ))}
            </View>
        </View>
    )
}

// 

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