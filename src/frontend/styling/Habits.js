import { StyleSheet, Platform } from 'react-native';
import ColorSet from '../resources/themes/Global';

export default StyleSheet.create({
    container: {
        backgroundColor: ColorSet.SecondaryGreen,
        margin: 20,
    },
    leftContainer: {
        flex: 2,
        padding: 15
    },
    rightContainer: {
        flex: 1
    },
    horizontalContainer: {
        flexDirection: 'row',
        borderRadius: 8,
        backgroundColor: ColorSet.SecondaryGreen,
        marginBottom: 15
    },
    textInput: {
        flex: 0.1,
        marginTop: Platform.OS === 'ios' ? 0 : 12,
        marginBottom: 12,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        color: ColorSet.someColor,
    },
    textTitle: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 20,
        color: ColorSet.QuinaryGreen
    },
    AuthenticationLogo: {
        height:200,
        width: 200,
        marginBottom: 50
    },
    AuthenticationInput: {
        backgroundColor: ColorSet.SecondaryGreen,
        padding: 10,
        borderWidth: 0,
        borderStyle: 'solid',
        fontSize:15,
        borderRadius: 5,
        marginBottom: 20,
        width: 300
    },
    AuthenticationText: {
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 5,
        color: ColorSet.QuaternaryGreen
    },
    inputContainer: {
        alignItems:"flex-start"
    },
    AuthenticationButton: {
        backgroundColor: ColorSet.QuaternaryGreen,
        borderRadius: 30,
        padding: 10,
        paddingLeft: 40,
        paddingRight: 40,
        marginBottom: 20,
    },
    AuthenticationButtonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: ColorSet.white
    },
    SignupText: {
        color: ColorSet.QuaternaryGreen,
        fontWeight: "bold",
    },
    subText: {
        color: ColorSet.grey,
        fontWeight: "bold",
    },
    Circle: {
        width: 10,
        height: 10,
        marginRight: 5,
        borderRadius: 5,
        backgroundColor: ColorSet.QuaternaryGreen
    },
    TodayCircle: {
        width: 10,
        height: 10,
        marginRight: 5,
        borderRadius: 5,
        borderWidth: 2, 
        borderColor: ColorSet.QuinaryGreen,
        backgroundColor: ColorSet.QuaternaryGreen
    },
    Checkmark: {
        width: 30,
        height: 30
    },
    EllipsisCircle: {
        width: 6,
        height: 6,
        marginRight: 3,
        borderRadius: 3,
        backgroundColor: ColorSet.QuaternaryGreen
    },
    Menu: {
        flex:1, 
        width: 30,
        height: 25
    },
    expBar: {
        width: "100%",
        height: 15,
        backgroundColor: ColorSet.lightgrey,
        borderRadius: 10
    },
    experienceContainer: {
        width: "60%",
    },
    horizontalExperienceContainer: {
        flexDirection: 'row'
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
    }
});