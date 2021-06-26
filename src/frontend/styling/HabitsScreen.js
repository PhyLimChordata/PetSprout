import { StyleSheet, Platform } from 'react-native';
import ColorSet from '../resources/themes/Global';

export default StyleSheet.create({
    headContainer: {
        flex: 1,
        backgroundColor: ColorSet.white
    },
    header: {
        flex: 1.5,
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingLeft:20,
        paddingRight:20,
        paddingTop: 50
        
    },
    verticalContainer: {
        flex: 10,
        backgroundColor: ColorSet.white,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
    },
    middleComponent: {
        flex:8
    },
    creature: {
        width: "70%",
        height: "70%",
        resizeMode: 'contain',
        marginBottom: 5
    },
    scrollViewContainer: {
       flex: 20,
       marginLeft: 60,
       marginRight: 60
    }
});