import { StyleSheet } from 'react-native';

const SupportUs = (theme) =>
	StyleSheet.create({
		container: {
			alignItems: 'center',
			textAlign: 'center',
			justifyContent: 'center',
		},
		textTitle: {
			marginTop: 20,
			fontSize: 31,
			fontWeight: 'bold',
			color: theme.Quaternary,
		},
		text: {
			fontSize: 16,
			color: theme.Quaternary,
			marginVertical: 20,
			alignItems: 'center',
			textAlign: 'center',
		},
		textThanks: {
			fontSize: 25,
			color: theme.Quaternary,
			fontWeight: 'bold',
			marginBottom: 20,
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
		},
		supportUsButtonText: {
			fontSize: 20,
			textAlign: 'center',
			fontWeight: 'bold',
			color: theme.background,
		},
	});

export default SupportUs;
