import { StyleSheet } from 'react-native';
import ColorSet from '../resources/global/themes';

const styles = (theme) => StyleSheet.create({
	headContainer: {
		flex: 1,
		backgroundColor: ColorSet.white
	},
	header: {
		flexDirection: 'row',
		paddingLeft: 20,
		paddingRight: 20,
	},
	middleComponent: {
		flex: 8,
	},
	headerText: {
		fontSize: 18,
		height:25,
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

export default styles;