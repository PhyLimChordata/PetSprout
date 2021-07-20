import { StyleSheet, Platform } from 'react-native';
import ColorSet from '../resources/themes/Global';

const iconWdith = '8vh';

export default StyleSheet.create({
    headContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: ColorSet.white
    },
    achivementContainer: {
        width: iconWdith,
        margin: '2.5vw',
        marginTop: '1vw'
    },  
    achivementRow: {
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
        borderColor: '#C6895E'
    },
    achievementSilver: {
        borderColor: '#A7BFCA'
    },
    achievementGold: {
        borderColor: '#FFC93E'
    },
    progressBar: {
        height: '1vh',
        borderRadius: 10,
        marginTop: '2vh',
    },
    achievementName: {
        fontStyle: "normal",
        fontWeight: "700",
        color: ColorSet.QuinaryGreen,
        alignSelf: 'center',
        marginTop: '4vh'
    }
});