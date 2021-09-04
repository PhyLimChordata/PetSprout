import { StyleSheet, Platform } from 'react-native';
// import ColorSet from '../resources/global/themes';

const styles = (theme) => StyleSheet.create({
	container: {
		flex: 1,
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
		color: theme.someColor,
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
	AuthenticationLogo: {
		height: 200,
		width: 200,
		marginBottom: 50,
	},
	AuthenticationInput: {
		backgroundColor: theme.Secondary,
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
		color: theme.Quaternary,
	},
	inputContainer: {
		alignItems: 'flex-start',
	},
	header: {
		alignItems: 'center',
		marginBottom: 20,
	},
	AuthenticationButton: {
		backgroundColor: theme.Quaternary,
		borderRadius: 30,
		padding: 10,
		paddingLeft: 40,
		paddingRight: 40,
		marginBottom: 20,
	},
	AuthenticationSpecialButton: {
		backgroundColor: theme.Authentication,
		borderRadius: 30,
		padding: 10,
		paddingLeft: 40,
		paddingRight: 40,
		marginBottom: 20,
	},
	AuthenticationButtonText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: theme.white,
	},
	SignupText: {
		color: theme.Quaternary,
		fontWeight: 'bold',
	},
	subText: {
		color: theme.grey,
		fontWeight: 'bold',
	},
	forgotPassword: {
		color: theme.Quaternary,
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
})

export default styles;