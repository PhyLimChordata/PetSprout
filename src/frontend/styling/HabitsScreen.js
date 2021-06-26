import { StyleSheet, Platform } from 'react-native';
import ColorSet from '../resources/themes/Global';

export default StyleSheet.create({
    headContainer: {
        flex: 19,
        backgroundColor: ColorSet.white,
        padding: 20
    },
    container: {
        flex: 19,
        backgroundColor: ColorSet.white,
        alignItems: "center",
        justifyContent: "center"
    },
    creature: {
        width: 200,
        height: 200,
        marginBottom: 30
    },
    header: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    middleComponent: {
        flex:8
    },
    scrollViewContainer: {
       flex: 19,
       marginLeft: 60,
       marginRight: 60
    }
});