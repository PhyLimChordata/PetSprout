import { StyleSheet } from "react-native";
import ColorSet from '../resources/themes/Global';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorSet.white,
        alignItems: 'center',
        paddingTop: '10%'
    },
    formContainer: {
        width: '80%',
        alignItems: 'center'
    },
    textInput: {
        flex: 0.1,
        width: '96%',
        marginBottom: 12,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 0,
        borderColor: ColorSet.white,
        color: ColorSet.QuinaryGreen,
    },
    textMultiInput: {
        flex: 0.1,
        width: '93%',
        marginBottom: 12,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderColor: ColorSet.white,
        color: ColorSet.white,
        backgroundColor: ColorSet.SecondaryGreen
    },
    baseText: {
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "900"
    },
    textTitle: {
        fontSize: 13,
        width: '100%',
        textAlign: 'left',
        color: ColorSet.QuaternaryGreen
        
    },
    textNormal: {
        fontSize: 13,
        textAlign: 'left',
        color: ColorSet.TertiaryGreen
    }

})