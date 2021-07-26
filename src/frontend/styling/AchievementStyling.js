import { StyleSheet, Platform } from 'react-native';
import ColorSet from '../resources/themes/Global';

const iconWdith = '8vh';

export default StyleSheet.create({
    headContainer: {
        flex: 1,
        alignItems: 'center',
    },
    achievementContainer: {
        width: iconWdith,
        margin: '2.5vw',
        marginTop: '1vw'
    },  
    achievementRow: {
        display: 'flex',
        flexDirection: 'row',
    }, 
    achievementIcon: {
        resizeMode: 'contain',
        width: iconWdith,
        height: iconWdith,
        borderRadius: '50%',
        borderWidth: '1vh',
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
        height: '1vh',
        borderRadius: 10,
        marginTop: '2vh',
    },
    textStyles:{
        fontStyle: "normal",
        fontWeight: "700",
        color: ColorSet.QuinaryGreen,
    },
    achievementName: {
        alignSelf: 'center',
        marginTop: '4vh'
    },
    achievementHeader: {
        fontSize: 24,
        alignSelf: 'left'
    }
});