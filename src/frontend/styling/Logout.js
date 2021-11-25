import { StyleSheet } from 'react-native';
import Colours from '../resources/themes/Colours';

const Logout = (theme) =>
	StyleSheet.create({
        confirmation: {
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.Quaternary,
            height: 360,
            width: 300,
            borderRadius: 30,
            padding: 20,
        }
	});

export default Logout;
