import { StyleSheet } from 'react-native';

const About = (theme) =>
	StyleSheet.create({
		container: {
			alignItems: 'center',
			textAlign: 'center',
			justifyContent: 'center',
		},
		textTitle: {
			fontSize: 31,
			fontWeight: 'bold',
			color: theme.Quaternary,
		},
		scrollView: {
			//paddingBottom: 300,
			textAlign: 'center',
		},
		textSubtitle: {
			fontSize: 20,
			color: theme.Quaternary,
			marginBottom: 5,
		},
		text: {
			fontSize: 16,
			color: theme.Quaternary,
			marginBottom: 10,
			textAlign: 'center',
			justifyContent: 'center',
		},
		aboutLogo: {
			height: 100,
			width: 100,
			marginBottom: 5,
			resizeMode: 'contain',
		},
		aboutButton: {
			backgroundColor: theme.Tertiary,
			borderRadius: 10,
			width: 250,
			padding: 10,
			paddingLeft: 40,
			paddingRight: 40,
			marginBottom: 20,
			textAlign: 'center',
			alignItems: 'center',
			justifyContent: 'center',
		},
		testaboutButton: {
			backgroundColor: theme.Tertiary,
			borderRadius: 10,
			width: 250,
			padding: 10,
			marginBottom: 20,
			textAlign: 'center',
			alignItems: 'center',
			justifyContent: 'center',
		},
		aboutButtonText: {
			fontSize: 20,
			fontWeight: 'bold',
			color: theme.background,
		},
	});

export default About;
