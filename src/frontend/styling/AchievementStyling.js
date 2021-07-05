import { StyleSheet, Platform } from 'react-native';
import ColorSet from '../resources/themes/Global';

export default StyleSheet.create({
    headContainer: {
        flex: 1,
        backgroundColor: ColorSet.white
    },
    achievementIcon: {
        resizeMode: 'contain',
        width: '10vh',
        height: '10vh',
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
});