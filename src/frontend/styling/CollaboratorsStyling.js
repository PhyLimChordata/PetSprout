import { StyleSheet } from 'react-native';

const collaboratorsStyles = (theme) =>
	StyleSheet.create({
		text: {
            fontSize: 20,
            fontWeight: 'bold',
            fontStyle: "normal",
            color: theme.Quaternary,
            paddingBottom: 25,
        },
        textTitle: {
            fontSize: 40,
            fontWeight: 'bold',
            color: theme.Quaternary,
            paddingBottom: 30
        },
        collabImg: {
            height: 200,
			width: 200,
			marginBottom: 25,
            resizeMode: "contain"
        },
        container: {
            alignItems: 'center',
            flexDirection: 'column',
        },
        headContainer: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
        },
	});

export default collaboratorsStyles;
