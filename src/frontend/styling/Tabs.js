import { StyleSheet, Platform, PixelRatio } from 'react-native';
import ColorSet from '../resources/themes/Global';
//npm install --save react-native-responsive-dimensions
//https://www.npmjs.com/package/react-native-responsive-dimensions

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
    menuImg: {
        width: 100,
        height: 100,
        flex: 1,
        alignItems: "flex-start"
    }
});