import { StyleSheet } from 'react-native';
import Colours from '../resources/themes/Colours';

const ReportABug = (theme) =>
	StyleSheet.create({
		text: {
            fontSize: 14,
            fontStyle: "normal",
            color: theme.Quaternary,
            margin: 15,
            marginBottom: 10,
        },
        textbox: {
            backgroundColor: theme.Secondary,
            padding: 10,
            borderWidth: 0,
            height: 300,
            width: 300,
            borderStyle: 'solid',
            fontSize: 15,
            borderRadius: 5,
        },
        reportABugButton: {
			backgroundColor: theme.Quaternary,
			borderRadius: 30,
			padding: 10,
			paddingLeft: 40,
			paddingRight: 40,
			marginBottom: 20,
		},
		reportABugButtonText: {

			fontSize: 20,
			fontWeight: 'bold',
			color: theme.background,
		},
        reportABugImg: {
            height: 35,
			width: 35,
			resizeMode: 'contain',
			// tintColor: theme.Quaternary,
			// TODO
		},
		bugConfirmation: {
			textAlign: 'center',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: theme.Quaternary,
			height: 330,
			width: 300,
			borderRadius: 30,
		},
		bugError: {
			textAlign: 'center',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: Colours.Red.Error,
			color: Colours.Red.Error,
			height: 330,
			width: 300,
			borderRadius: 30,
		},
		container: {
			alignItems: 'center',
			flexDirection: 'column',
			marginTop: 50,
		},
	});

export default ReportABug;
