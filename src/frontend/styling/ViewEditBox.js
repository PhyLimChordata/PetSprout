import { StyleSheet } from 'react-native';

const fontSize = 13;

const viewEditBoxStyles = (theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			alignItems: 'center',
			paddingTop: '10%',
		},
		formContainer: {
			width: '80%',
			alignItems: 'center',
		},
		text: {
			fontStyle: 'normal',
			fontWeight: '700',
			fontSize: fontSize,
		},
		textInput: {
			flex: 0.1,
			width: '96%',
			marginBottom: 12,
			paddingLeft: 10,
			paddingRight: 10,
			borderWidth: 0,
			paddingBottom: 2,
			color: theme.Quinary,
			fontSize: fontSize,
		},
		textInputSelected: {
			borderBottomWidth: 2,
			paddingBottom: 0,
			borderColor: theme.Quaternary,
		},
		textMultiInput: {
			flex: 0.1,
			width: '93%',
			marginBottom: 12,
			paddingLeft: 10,
			paddingRight: 10,
			borderWidth: 1,
			borderColor: theme.white,
			color: theme.black,
			fontWeight: '300',
			backgroundColor: theme.Secondary,
		},
		baseText: {
			fontFamily: 'Roboto',
			fontStyle: 'normal',
			fontWeight: '900',
		},
		textTitle: {
			fontSize: fontSize,
			width: '100%',
			textAlign: 'left',
			color: theme.Quaternary,
		},
		textNormal: {
			fontSize: fontSize,
			textAlign: 'left',
			color: theme.Tertiary,
		},
		submitButton: {
			color: theme.white,
			backgroundColor: theme.Quaternary,
			borderRadius: 30,
			width: 110,
			height: 26,
			alignItems: 'center',
		},
		submitButtonText: {
			color: theme.white,
			fontWeight: '900',
			fontSize: 18,
			textAlign: 'center',
			textAlignVertical: 'center',
		},
		submitButtonPosition: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'flex-end',
			marginRight: '5vw',
			width: '80%',
		},
	});

export default viewEditBoxStyles;
