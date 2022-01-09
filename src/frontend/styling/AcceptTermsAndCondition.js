import { StyleSheet, StatusBar } from 'react-native';

const TermsAndCondition = (theme) =>
	StyleSheet.create({
		text: {
			fontSize: 15,
			fontStyle: 'normal',
			color: theme.Quinary,
			marginBottom: 15,
		},
		textTop: {
			fontSize: 31,
			color: theme.Tertiary,
			fontWeight: 'bold',
			marginBottom: 10,
			marginTop: 10,
		},
		textTitle: {
			fontSize: 20,
			color: theme.Quinary,
			marginBottom: 10,
			marginTop: 10,
		},
		aboutButtonDisabled: {
			backgroundColor: theme.Quaternary,
			borderRadius: 10,
			width: 250,
			padding: 10,
			paddingLeft: 40,
			paddingRight: 40,
			marginBottom: 20,
			textAlign: 'center',
			alignItems: 'center',
			justifyContent: 'center',
		},
		checkbox: {
		},
		checkboxContainer: {
			flexDirection: 'row',
			alignItems: 'flex-start',
			width: 275,
			fontSize: 15,
			fontStyle: 'normal',
			color: theme.Quinary,
		},
		aboutButton: {
			backgroundColor: theme.Quaternary,
			borderRadius: 10,
			width: 250,
			padding: 10,
			paddingLeft: 40,
			paddingRight: 40,
			marginBottom: 20,
			textAlign: 'center',
			alignItems: 'center',
			justifyContent: 'center',
		},
		aboutButtonText: {
			fontSize: 20,
			fontWeight: 'bold',
			color: theme.background,
		},
		termsImg: {
			height: 100,
			width: 100,
			marginBottom: 10,
			marginTop: 10,
			resizeMode: 'contain',
			// tintColor: theme.Quaternary,
			// TODO
		},
		container: {
			flexDirection: 'column',
			//paddingTop: StatusBar.currentHeight,
			alignItems: 'flex-start',
			textAlign: 'left',
		},
		scrollView: {
			paddingHorizontal: 20,
			marginHorizontal: 50,
			borderColor: theme.Quaternary,
			borderWidth: 3,
			marginBottom: 10,
		},
		headContainer: {
			display: 'flex',
			alignItems: 'center',
			textAlign: 'center',
			flexDirection: 'column',
			height: 650,

		},
	});

export default TermsAndCondition;
