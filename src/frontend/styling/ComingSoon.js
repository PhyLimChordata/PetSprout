import { StyleSheet } from 'react-native';

const comingSoonStyles = (theme) =>
	StyleSheet.create({
		headContainer: {
			flex: 1,
			backgroundColor: theme.white,
		},
		container: {
			flex: 10,
			alignItems: 'center',
			justifyContent: 'center',
		},
		logo: {
			height: 200,
			width: 200,
			marginBottom: 50,
		},
		creature: {
			height: 150,
			width: '100%',
			resizeMode: 'stretch',
		},
		comingSoonText: {
			fontSize: 50,
			fontWeight: 'bold',
			paddingBottom: 5,
			color: theme.Quaternary,
		},
	});

export default comingSoonStyles;
