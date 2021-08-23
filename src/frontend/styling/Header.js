import { StyleSheet } from 'react-native';
import ColorSet from '../resources/themes/Global';

export default StyleSheet.create({
	header: {
		flex: 1.5,
		flexDirection: 'row',
		alignItems: 'flex-start',
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 50,
		display: 'flex',
	},
	middleComponent: {
		flex: 8,
	},
	headerText: {
		fontSize: 18,
		color: ColorSet.Green.Quaternary,
		fontWeight: "700",
		marginLeft: 15,
	},
	menuTitle: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
	},
});