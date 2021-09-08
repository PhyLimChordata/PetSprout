import { StyleSheet, Platform } from 'react-native';
import Colours from '../resources/themes/Colours';

const exampleStyles = (theme) =>
	StyleSheet.create({
		headContainer: {
			flex: 1,
			backgroundColor: theme.white,
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
			color: Colours.Grey.TextInput,
		},
		textTitle: {
			fontSize: 20,
			fontWeight: 'bold',
		},
		authenticationLogo: {
			height: 200,
			width: 200,
			marginBottom: 50,
		},
		authenticationInput: {
			backgroundColor: theme.Secondary,
			padding: 10,
			borderWidth: 0,
			borderStyle: 'solid',
			fontSize: 15,
			borderRadius: 5,
			marginBottom: 20,
			width: 300,
		},
		authenticationText: {
			fontSize: 20,
			fontWeight: 'bold',
			paddingBottom: 5,
			color: theme.Quaternary,
		},
		inputContainer: {
			alignItems: 'flex-start',
		},
		authenticationButton: {
			backgroundColor: theme.Quaternary,
			borderRadius: 30,
			padding: 10,
			paddingLeft: 40,
			paddingRight: 40,
			marginBottom: 20,
		},
		authenticationButtonText: {
			fontSize: 20,
			fontWeight: 'bold',
			color: theme.white,
		},
		signupText: {
			color: theme.Quaternary,
			fontWeight: 'bold',
		},
		subText: {
			color: Colours.Grey.Default,
			fontWeight: 'bold',
		},
		creature: {
			width: 200,
			height: 200,
			marginBottom: 30,
		},
		header: {
			flex: 2,
			flexDirection: 'row',
			alignItems: 'flex-start',
		},
		middleComponent: {
			flex: 8,
		},
		c: {
			flex: 19,
			marginLeft: 60,
			marginRight: 60,
		},
	});

export default exampleStyles;
