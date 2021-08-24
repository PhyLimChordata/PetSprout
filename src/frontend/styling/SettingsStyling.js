import { StyleSheet } from "react-native";
import ColorSet from '../resources/themes/Global';

const fontSize = 13;

export default StyleSheet.create({
    container: {
        display: 'flex',
        // flexDirection: 'col',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
		flex: 1.5,
		flexDirection: 'row',
		alignItems: 'flex-start',
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 50,
	},
    settingContainer: {
        width: '80vw',
    },
    oneSettingContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '1vh',
        marginBottom: '1vh',
    },
    text:{
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: fontSize,
    },
    textDisplayMargin: {
        paddingLeft: '7vw',
        marginRight: 100,
        marginTop: 0,
        marginBottom: '2vh',
    },
    textDisplay: {
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: fontSize,
    },
    textTitle: {
        width: '100%',
        textAlign: 'left',
        color: ColorSet.TertiaryGreen
        
    },
    textNormal: {
        textAlign: 'left',
        color: ColorSet.QuaternaryGreen
    },
    switchStyling: {
        justifyContent: "center",
        height: '3vh',
    }

})
