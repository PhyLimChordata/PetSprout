import { StyleSheet } from 'react-native';

const habitsScreenStyles = (theme) =>
	StyleSheet.create({
		headContainer: {
			flex: 1,
			backgroundColor: theme.white,
		},
		header: {
			flex: 1.5,
			flexDirection: 'row',
			alignItems: 'flex-start',
			paddingLeft: 20,
			paddingRight: 20,
			paddingTop: 50,
		},
		verticalContainer: {
			flex: 10,
			backgroundColor: theme.white,
			alignItems: 'center',
			justifyContent: 'center',
			marginBottom: 10,
		},
		middleComponent: {
			flex: 8,
		},
		creature: {
			width: '70%',
			height: '70%',
			resizeMode: 'contain',
			marginBottom: 5,
		},
		scrollViewContainer: {
			flex:1,
			marginHorizontal: 60,
			marginTop:10
		},
	});

export default habitsScreenStyles;
