import { StyleSheet } from 'react-native';

const Collaborators = (theme) =>
	StyleSheet.create({
		text: {
			fontSize: 20,
			fontWeight: 'bold',
			fontStyle: 'normal',
			color: theme.Quaternary,
			paddingBottom: 25,
		},
		textTitle: {
			fontSize: 40,
			fontWeight: 'bold',
			color: theme.Quaternary,
			paddingBottom: 30,
		},
		collabImg: {
			height: 200,
			width: 200,
			marginBottom: 25,
			marginTop: 10,
			resizeMode: 'contain',
			// tintColor: theme.Quaternary,
			// TODO
		},
		container: {
			alignItems: 'center',
			flexDirection: 'column',
		},
		headContainer: {
			alignItems: 'center',
			textAlign: 'center',
			flexDirection: 'column',
			height:'100%'
		},
	});

export default Collaborators;
