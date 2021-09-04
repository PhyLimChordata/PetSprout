import { StyleSheet, Platform } from 'react-native';
import ColorSet from '../resources/themes/Global';

export default class StyleSheetFactory {
    static getSheet(width, height) {
        const iconWidth = width * 0.1415;
        console.log(width);
        console.log(height);
        return StyleSheet.create({
            headContainer: {
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
            },
            achievementContainer: {
                width: iconWidth,
                margin: 0.025*width,
            },  
            achievementRow: {
                display: 'flex',
                flexDirection: 'row',
            }, 
            achievementIcon: {
                width: iconWidth,
                height: iconWidth,
                borderWidth: iconWidth * 0.13043,
                borderRadius: iconWidth/2,
                overflow: 'hidden',
            },
            achievementBronze: {
                borderColor: ColorSet.Bronze,
            },
            achievementSilver: {
                borderColor: ColorSet.Silver,
            },
            achievementGold: {
                borderColor: ColorSet.Gold
            },
            progressBar: {
                height: 0.0084 * height,
                borderRadius: 10,
                marginTop: '20%',
            },
            textStyles:{
                fontStyle: "normal",
                fontWeight: "900",
                color: ColorSet.Green.Quinary,
            },
            achievementName: {
                alignSelf: 'center',
                marginTop: '7%',
            },
            achievementHeader: {
                fontSize: 24
            }
        });
    }
}
