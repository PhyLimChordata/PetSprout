import { StyleSheet } from 'react-native';
import Colours from '../resources/themes/Colours';

const Feedback = (theme) =>
	StyleSheet.create({
		text: {
			fontSize: 14,
			fontWeight: 'bold',
			fontStyle: 'normal',
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
		feedbackButton: {
			backgroundColor: theme.Quaternary,
			borderRadius: 30,
			padding: 10,
			paddingLeft: 40,
			paddingRight: 40,
			marginBottom: 20,
		},
		feedbackButtonText: {
			fontSize: 20,
			fontWeight: 'bold',
			color: theme.background,
		},
		feedbackImg: {
			height: 35,
			width: 35,
			resizeMode: 'contain',
			// tintColor: theme.Quaternary,
			// TODO
		},
		container: {
			alignItems: 'center',
			flexDirection: 'column',
			marginTop: 50,
		},
	});

export default Feedback;
