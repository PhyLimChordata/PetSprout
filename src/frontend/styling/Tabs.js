import { StyleSheet, Platform } from 'react-native';
import redTheme from '../resources/themes/light/redTheme';

const styles = (theme) => StyleSheet.create({
	headContainer: {
		flex: 1,
		backgroundColor: ColorSet.white,
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
		color: theme.someColor,
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
	AuthenticationButton: {
		backgroundColor: theme.Quaternary,
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
	Creature: {
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

export default styles;