import { StyleSheet } from 'react-native';

const SupportUs = (theme) =>
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
		text: {
			fontSize: 16,
			color: theme.Quaternary,
			marginTop: 30,
			marginBottom: 30,
			alignItems: 'center',
			textAlign: 'center',
		},
		textFooter: {
			fontSize: 25,
			color: theme.Quaternary,
			marginTop: 20,
			fontWeight: 'bold',
		},
		supportUsLogo: {
			marginTop: 20,
			height: 200,
			width: 200,
			resizeMode: 'contain',
			// tintColor: theme.Quaternary,
			// TODO
		},
		supportUsButton: {
			backgroundColor: theme.Tertiary,
			borderRadius: 10,
			width: 250,
			padding: 10,
			paddingLeft: 40,
			paddingRight: 40,
			marginBottom: 20,
			textAlign: 'center',
		},
		supportUsButtonText: {
			fontSize: 20,
			fontWeight: 'bold',
			color: theme.background,
		},
	});

export default SupportUs;
