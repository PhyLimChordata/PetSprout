import { StyleSheet, Platform } from 'react-native';
import ColorSet from '../resources/themes/Global';

export default StyleSheet.create({
    horizontalContainer: {
        flexDirection: 'row',
        borderRadius: 8,
        backgroundColor: ColorSet.SecondaryGreen,
        marginBottom: 15
    },
    leftContainer: {
        flex: 2,
        padding: 15
    },
    container: {
        backgroundColor: ColorSet.SecondaryGreen,
        margin: 20,
    },
    experienceContainer: {
        width: "60%",
    },
    horizontalExperienceContainer: {
        flexDirection: 'row'
    },
    menu: {
        flex:1, 
        width: 30,
        height: 25
    },
    textTitle: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 20,
        color: ColorSet.QuinaryGreen
    },
    circle: {
        width: 10,
        height: 10,
        marginRight: 5,
        borderRadius: 5,
        backgroundColor: ColorSet.QuaternaryGreen
    },
    todayCircle: {
        width: 10,
        height: 10,
        marginRight: 5,
        borderRadius: 5,
        borderWidth: 2, 
        borderColor: ColorSet.QuinaryGreen,
        backgroundColor: ColorSet.QuaternaryGreen
    },
    ellipsisCircle: {
        width: 6,
        height: 6,
        marginRight: 3,
        borderRadius: 3,
        backgroundColor: ColorSet.QuaternaryGreen
    },
    checkmark: {
        width: 30,
        height: 30
    },
    levelText: {
        fontSize: 20,
        flex: 1,
        fontWeight: "bold",
        color: ColorSet.QuaternaryGreen
    },
    rightText: {
        alignItems: 'flex-end',
    },
    expText: {
        color: ColorSet.QuaternaryGreen,
        fontSize: 20
    },
    expBar: {
        width: "100%",
        height: 15,
        backgroundColor: ColorSet.lightgrey,
        borderRadius: 10
    },
    expBars: {
        width: "28%",
        height: 15,
        backgroundColor: ColorSet.SecondaryBlue,
        borderRadius: 10
    }
});