import { StyleSheet, Platform } from 'react-native';
import ColorSet from '../resources/global/themes';

const styles = (theme) => StyleSheet.create({
    headContainer: {
        flex: 1,
        backgroundColor: theme.white
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
        backgroundColor: theme.white,
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

export default styles;