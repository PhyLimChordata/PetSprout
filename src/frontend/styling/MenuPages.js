import { StyleSheet } from 'react-native';

const MenuPagesStyles = (theme) =>
	StyleSheet.create({
		homeButton: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
			backgroundColor: theme.Tertiary,
			borderRadius: 50,
			borderWidth: 5,
			borderColor: theme.Quinary,
			width: 60,
			height: 60,
		},
        homeIcon: {
            height: 30,
            width: 30,
            bottom: 2
        },
        bottom: {
            position: 'absolute',
            bottom: 40,
            width: "100%",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
	});

export default MenuPagesStyles;
