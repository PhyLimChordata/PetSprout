import { StyleSheet } from 'react-native';
const fontSize = 13;

function settingStyles(theme, width, height) {
	return StyleSheet.create({
		container: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			marginTop: height * 0.06,
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
			marginRight: '5%',
			marginLeft: '5%',
			width: width * 0.8,
		},
		oneSettingContainer: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			marginTop: '7%',
			marginBottom: '2%',
		},
		text: {
			fontStyle: 'normal',
			fontWeight: '700',
			fontSize: fontSize,
		},
		textDisplayMargin: {
			paddingLeft: '7%',
			marginRight: 100,
			marginTop: 0,
			marginBottom: '2%',
		},
		textDisplay: {
			fontStyle: 'normal',
			fontWeight: '700',
			fontSize: fontSize,
		},
		textTitle: {
			width: '100%',
			textAlign: 'left',
			color: theme.Quinary,
		},
		textNormal: {
			textAlign: 'left',
			width: '100%',
			color: theme.Quaternary,
		},
		switchStyling: {},
	});
}

export default settingStyles;
