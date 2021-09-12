import { StyleSheet } from 'react-native';
import Colours from '../resources/themes/Colours';
import SupportUs from '../screens/SupportUs';

const supportUsStyle = (theme) =>
	StyleSheet.create({
		container: {
			alignItems: 'center',
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
            alignItems: "center",
        },
        textFooter: {
            fontSize: 25,
            color: theme.Quaternary,
            marginTop: 20,
        },
		supportUsLogo: {
			height: 200,
			width: 200,
			marginBottom: 50,
            resizeMode: "contain",
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
            alignItems: "center"
        },
        supportUsButtonText: {
            fontSize: 20,
			fontWeight: 'bold',
			color: theme.background,
        }
	});

export default supportUsStyle;
