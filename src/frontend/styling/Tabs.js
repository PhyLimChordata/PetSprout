import { StyleSheet, Platform } from 'react-native';
import ColorSet from '../resources/themes/Global';

export default StyleSheet.create({
    headContainer: {
        flex: 1,
        backgroundColor: ColorSet.white
    },
    container: {
        flex: 10,
        alignItems: 'center',
        justifyContent: 'center',
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
        fontSize: 20,
        fontWeight: "bold"
    }
});