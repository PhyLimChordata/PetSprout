import { StyleSheet } from 'react-native';

const Popup = (theme) =>
	StyleSheet.create({
		text: {
			fontSize: 16,
			fontStyle: 'normal',
			color: 'white',
			marginHorizontal: 10,
		},
		title: {
			fontSize: 25,
			fontStyle: 'normal',
			color: 'white',
			marginBottom: 10,
			textAlign:'center'
		},
		popupButton: {
			flex:1,
			alignItems: 'center'
		},
		popupButtonText: {
			fontSize: 20,
			color: 'white',
		},
		popupButtonContainer: {
			alignItems: 'center',
			textAlign: 'center',
			justifyContent: 'space-between',
			flexDirection: 'row',
		},
		popupImage: {
			height: 100,
			width: 100,
			marginTop:-40,
			resizeMode: 'contain',
			alignContent: 'center',
			justifyContent: 'center',
			alignItems: 'center',
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
