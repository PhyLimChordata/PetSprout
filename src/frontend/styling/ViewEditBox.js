import { StyleSheet } from 'react-native';

const fontSize = 13;
const formRatio = 0.8;

export default class StyleSheetFactory {
	static getSheet(width, height, colors) {
		console.log('proile edit: ' + width);
		console.log('proile edit: ' + height);

		return StyleSheet.create({
			container: {
				display: 'flex',
				alignItems: 'center',
				paddingTop: 0.1 * height,
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
				color: colors.Quaternary,
				fontSize: fontSize,
			},
			textInputError: {
				color: 'red',
			},
			textInputSelected: {
				borderBottomWidth: 2,
				paddingBottom: 0,
				borderColor: colors.Quaternary,
			},
			textMultiInput: {
				width: 0.93 * formRatio * width,
				marginBottom: 12,
				padding: 10,
				color: colors.black,
				fontSize: fontSize,
				fontWeight: '300',
				textAlignVertical: 'top',
				backgroundColor: colors.Secondary,
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
				color: colors.Quinary,
			},
			textNormal: {
				fontSize: fontSize,
				textAlign: 'left',
				color: colors.Tertiary,
			},
			submitButton: {
				color: colors.white,
				backgroundColor: colors.Quaternary,
				borderRadius: 30,
				width: 110,
				height: 26,
				alignItems: 'center',
			},
			submitButtonText: {
				color: colors.background,
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
}
