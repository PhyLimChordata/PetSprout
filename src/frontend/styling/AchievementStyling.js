import { StyleSheet } from 'react-native';

const iconWidth = '8vh';

const styles = (theme) => StyleSheet.create({
    headContainer: {
        flex: 1,
        alignItems: 'center',
    },
    achievementContainer: {
        width: iconWidth,
        margin: '2.5vw',
        marginTop: '1vw'
    },  
    achievementRow: {
        display: 'flex',
        flexDirection: 'row',
    }, 
    achievementIcon: {
        resizeMode: 'contain',
        width: iconWidth,
        height: iconWidth,
        borderRadius: 50,
        borderWidth: 5,
    },
    achievementBronze: {
        borderColor: theme.Bronze,
    },
    achievementSilver: {
        borderColor: theme.Silver,
    },
    achievementGold: {
        borderColor: theme.Gold
    },
    progressBar: {
        height: '1vh',
        borderRadius: 10,
        marginTop: '2vh',
    },
    textStyles:{
        fontStyle: "normal",
        fontWeight: "700",
        color: theme.Quinary,
    },
    achievementName: {
        alignSelf: 'center',
        marginTop: '4vh'
    },
    achievementHeader: {
        fontSize: 24
    }
});

export default styles;