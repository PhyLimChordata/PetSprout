import { StyleSheet, Platform } from 'react-native';
import ColorSet from '../resources/global/themes';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: ColorSet.white,
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
		color: ColorSet.someColor,
	},
	textTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: ColorSet.Green.Quaternary,
	},
	explanationText: {
		fontSize: 15,
		color: ColorSet.Green.Quaternary,
		textAlign: 'center',
		marginBottom: 15,
		paddingLeft: 50,
		paddingRight: 50,
	},
	AuthenticationLogo: {
		height: 200,
		width: 200,
		marginBottom: 50,
	},
	AuthenticationInput: {
		backgroundColor: ColorSet.Green.Secondary,
		padding: 10,
		borderWidth: 0,
		borderStyle: 'solid',
		fontSize: 15,
		borderRadius: 5,
		marginBottom: 20,
		width: 300,
	},
	AuthenticationText: {
		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom: 5,
		color: ColorSet.Green.Quaternary,
	},
	inputContainer: {
		alignItems: 'flex-start',
	},
	header: {
		alignItems: 'center',
		marginBottom: 20,
	},
	AuthenticationButton: {
		backgroundColor: ColorSet.Green.Quaternary,
		borderRadius: 30,
		padding: 10,
		paddingLeft: 40,
		paddingRight: 40,
		marginBottom: 20,
	},
	AuthenticationSpecialButton: {
		backgroundColor: ColorSet.Blue.Authentication,
		borderRadius: 30,
		padding: 10,
		paddingLeft: 40,
		paddingRight: 40,
		marginBottom: 20,
	},
	AuthenticationButtonText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: ColorSet.white,
	},
	SignupText: {
		color: ColorSet.Green.Quaternary,
		fontWeight: 'bold',
	},
	subText: {
		color: ColorSet.grey,
		fontWeight: 'bold',
	},
	forgotPassword: {
		color: ColorSet.Green.Quaternary,
		fontSize: 14,
		fontWeight: 'bold',
		textAlign:'center'
	},
	forgotView: {
		// alignItems: 'flex-end',
		alignItems: 'center',
		width: '100%',
		marginBottom: 20,
	},
	errorView: {
		alignItems:'flex-end',
		width: '100%',
	},
	errorMessage: {
		textAlign: 'center',
		color: "red",
		fontWeight: "500"
	},
	errorMessageRight: {
		alignSelf: 'flex-end',
		color: "red",
		fontWeight: "500",
	}
});
