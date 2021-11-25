import { StyleSheet } from 'react-native';
import Colours from '../resources/themes/Colours';

const fontSize = 13;
const formRatio = 0.8;

function profileStyles(theme, width, height) {
	return StyleSheet.create({
		container: {
			display: 'flex',
			alignItems: 'center',
			marginTop: 20,
			flexDirection: 'column',
		},
		formContainer: {
			alignItems: 'center',
		},
		text: {
			fontStyle: 'normal',
			fontWeight: '700',
			fontSize: fontSize,
		},
		textInput: {
			width: 0.96 * formRatio * width,
			marginBottom: 12,
			paddingLeft: 10,
			paddingRight: 10,
			borderWidth: 0,
			paddingBottom: 2,
			color: theme.Quaternary,
			fontSize: fontSize,
		},
		textInputError: {
			color: 'red',
		},
		textInputSelected: {
			borderBottomWidth: 2,
			paddingBottom: 0,
			borderColor: theme.Quaternary,
		},
		textMultiInput: {
			width: 0.93 * formRatio * width,
			marginBottom: 12,
			padding: 10,
			color: Colours.Unique.Black,
			fontSize: fontSize,
			fontWeight: '300',
			textAlignVertical: 'top',
			backgroundColor: theme.Secondary,
			borderRadius: 2,
		},
		baseText: {
			fontFamily: 'Roboto',
			fontStyle: 'normal',
			fontWeight: '900',
		},
		textTitle: {
			fontSize: fontSize,
			width: width * formRatio,
			textAlign: 'left',
			color: theme.Quinary,
		},
		textNormal: {
			fontSize: fontSize,
			textAlign: 'left',
			color: theme.Tertiary,
		},
		submitButton: {
			color: theme.background,
			backgroundColor: theme.Quaternary,
			borderRadius: 30,
			width: 110,
			height: 26,
			alignItems: 'center',
			justifyContent: 'center'

		},
		submitButtonText: {
			color: theme.background,
			fontWeight: '900',
			fontSize: 18,
			textAlign: 'center',
			textAlignVertical: 'center',
		},
		submitButtonPosition: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'flex-end',
			marginRight: 0.05 * width,
			width: 0.8 * width,
		},
	});
}

export default profileStyles;
