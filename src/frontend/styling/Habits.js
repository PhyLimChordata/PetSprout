import { StyleSheet, Platform } from 'react-native';
import ColorSet from '../resources/themes/Global';

export default StyleSheet.create({
	horizontalContainer: {
		flexDirection: 'row',
		borderRadius: 8,
		backgroundColor: ColorSet.Green.Secondary,
	},
	horizontalContainers: {
		flexDirection: 'row',
        flex: 1,
  justifyContent: 'flex-end',
		borderRadius: 8,
		backgroundColor: ColorSet.Green.Secondary,
	},
	leftContainer: {
		flex: 2,
		padding: 20,
		paddingBottom: 30,
	},
	container: {
		backgroundColor: ColorSet.Green.Secondary,
		margin: 20,
		alignItems: 'center',
		borderColor: 'red',
		borderWidth: 5,
	},
	experienceContainer: {
		width: '60%',
	},
	horizontalExperienceContainer: {
		flexDirection: 'row',
	},
	menu: {
		flex: 1,
		width: 30,
		height: 25,
	},
	textTitle: {
		fontSize: 25,
		fontWeight: 'bold',
		marginBottom: 20,
		color: ColorSet.Green.Quinary,
	},
	ellipsisCircle: {
		width: 6,
		height: 6,
		marginRight: 3,
		borderRadius: 3,
		backgroundColor: ColorSet.Green.Quaternary,
	},
	swipeIcon: {
		width: 30,
		height: 30,
	},
	levelText: {
		fontSize: 20,
		flex: 1,
		fontWeight: 'bold',
		color: ColorSet.Green.Quaternary,
	},
	rightText: {
		alignItems: 'flex-end',
	},
	expText: {
		color: ColorSet.Green.Quaternary,
		fontSize: 20,
	},
	expBar: {
		width: '100%',
		height: 15,
		backgroundColor: ColorSet.lightgrey,
		borderRadius: 10,
	},
});
