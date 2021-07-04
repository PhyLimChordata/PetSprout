import { StyleSheet, Platform } from 'react-native';
import ColorSet from '../resources/themes/Global';

export default StyleSheet.create({
    achievementIcon: {
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 5,
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