import { StyleSheet } from 'react-native';

const Popup = (theme) =>
	StyleSheet.create({
		text: {
			fontSize: 16,
			fontStyle: 'normal',
			color: 'white',
			marginRight: 50,
			marginLeft: 50,
		},
		title: {
			fontSize: 25,
			fontStyle: 'normal',
			color: 'white',
			marginBottom: 10,
		},
		popupButton: {
			padding: 10,
			paddingLeft: 50,
			paddingRight: 50,
		},
		popupButtonText: {
			fontSize: 20,
			color: 'white',
		},
		popupButtonContainer: {
			alignItems: 'center',
			textAlign: 'center',
			justifyContent: 'center',
			flexDirection: 'row',
		},
		popupImage: {
			height: 125,
			width: 125,
			marginTop: -20,
			resizeMode: 'contain',
			// tintColor: theme.Quaternary,
			// TODO
		},
		container: {
			justifyContent: 'center',
			textAlign: 'center',
			alignItems: 'center',
			height: 330,
			width: 300,
			borderRadius: 30,
		},
	});

export default Popup;
