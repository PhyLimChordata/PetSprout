import { StyleSheet } from 'react-native';

const styles = (theme) => StyleSheet.create({
	headContainer: {
		flex: 1,
		backgroundColor: theme.white,
	},
	container: {
		flex: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	Logo: {
		height: 200,
		width: 200,
		marginBottom: 50,
	},
	Creature: {
		height: 150,
		width: '100%',
		resizeMode: 'stretch'
	},
	ComingSoonText: {
		fontSize: 50,
		fontWeight: 'bold',
		paddingBottom: 5,
		color: theme.Quaternary,
	},
});

export default styles;