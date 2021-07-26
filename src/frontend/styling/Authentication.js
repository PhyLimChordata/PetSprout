import { StyleSheet, Platform } from 'react-native';
import ColorSet from '../resources/themes/Global';

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
	},
	AuthenticationLogo: {
		height: 200,
		width: 200,
		marginBottom: 50,
	},
	AuthenticationInput: {
		backgroundColor: ColorSet.SecondaryGreen,
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
		color: ColorSet.QuaternaryGreen,
	},
	inputContainer: {
		alignItems: 'flex-start',
	},
	AuthenticationButton: {
		backgroundColor: ColorSet.QuaternaryGreen,
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
		color: ColorSet.QuaternaryGreen,
		fontWeight: 'bold',
	},
	subText: {
		color: ColorSet.grey,
		fontWeight: 'bold',
	},
});
