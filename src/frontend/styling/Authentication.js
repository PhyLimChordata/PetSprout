import { StyleSheet, Platform } from 'react-native';
import Colours from '../resources/themes/Colours';

const authenticationStyles = (theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			margin: 40,
			backgroundColor: theme.white,
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
			color: theme.Quaternary,
		},
		explanationText: {
			fontSize: 15,
			color: theme.Quaternary,
			textAlign: 'center',
			marginBottom: 15,
			paddingLeft: 50,
			paddingRight: 50,
		},
		inputContainer: {
			alignItems: 'flex-start',
			width: '100%',
		},
		header: {
			alignItems: 'center',
			marginBottom: 20,
		},
		authenticationLogo: {
			height: 150,
			width: 150,
			marginBottom: 20,
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
		authenticationButton: {
			backgroundColor: theme.Quaternary,
			borderRadius: 30,
			padding: 10,
			paddingLeft: 40,
			paddingRight: 40,
			marginBottom: 20,
		},
		authenticationSpecialButton: {
			backgroundColor: Colours.Blue.Authentication,
			borderRadius: 30,
			padding: 10,
			paddingLeft: 40,
			paddingRight: 40,
			marginBottom: 20,
		},
		authenticationButtonText: {
			fontSize: 20,
			fontWeight: 'bold',
			color: theme.background,
		},
		signupText: {
			color: theme.Quaternary,
			fontWeight: 'bold',
		},
		subText: {
			color: Colours.Grey.Default,
			fontWeight: 'bold',
		},
		forgotPassword: {
			color: theme.Quaternary,
			fontSize: 14,
			fontWeight: 'bold',
			textAlign: 'center',
		},
		forgotView: {
			alignItems: 'center',
			width: '100%',
			marginBottom: 20,
		},
		errorView: {
			alignItems: 'flex-end',
			width: '100%',
		},
		errorMessage: {
			textAlign: 'center',
			color: Colours.Red.Error,
			fontSize: 14,
			fontWeight: 'bold',
		},
		errorMessageRight: {
			alignSelf: 'flex-end',
			color: Colours.Red.Error,
			fontSize: 14,
			fontWeight: 'bold',
		},
	});

export default authenticationStyles;
