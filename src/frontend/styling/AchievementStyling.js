import { StyleSheet, Platform } from 'react-native';
import ColorSet from '../resources/themes/Global';

const iconWdith = '10vh';

export default StyleSheet.create({
    headContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: ColorSet.white
    },
    achivementContainer: {
        width: iconWdith,
        margin: '2vw'
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
        borderWidth: '1.5vh',
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
    progresBar: {
        height: '1vh',
        borderRadius: 10,
        marginTop: '2vh',
    }
});