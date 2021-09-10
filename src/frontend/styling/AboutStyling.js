import { StyleSheet } from 'react-native';
import Colours from '../resources/themes/Colours';
import About from '../screens/About';

const AboutUsStyle = (theme) =>
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
        textSubtitle: {
            fontSize: 20,
            color: theme.Quaternary,
            marginBottom: 30,
        },
        text: {
            fontSize: 16,
            color: theme.Quaternary,
            marginBottom: 30,
            alignItems: "center",
            justifyContent: "center",
        },
		aboutLogo: {
			height: 200,
			width: 200,
			marginBottom: 5,
            resizeMode: "contain",
		},
        aboutButton: {
            backgroundColor: theme.Tertiary,
			borderRadius: 10,
            width: 250,
			padding: 10,
			paddingLeft: 40,
			paddingRight: 40,
			marginBottom: 20,
            alignItems: "center",
            justifyContent: "center",
        },
        aboutButtonText: {
            fontSize: 20,
			fontWeight: 'bold',
			color: theme.background,
        }
	});

export default AboutUsStyle;
