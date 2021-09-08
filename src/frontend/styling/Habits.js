import { StyleSheet } from 'react-native';
import Colours from '../resources/themes/Colours';

const habitsStyles = (theme) =>
	StyleSheet.create({
		horizontalContainer: {
			flexDirection: 'row',
			borderRadius: 8,
			backgroundColor: theme.Secondary,
		},
		horizontalContainerBottom: {
			flexDirection: 'row',
			position: 'absolute',
			bottom: 0,
			borderRadius: 8,
			backgroundColor: theme.Secondary,
		},
		horizontalContainerPaddingRight: {
			flexDirection: 'row',
			borderRadius: 8,
			backgroundColor: theme.Secondary,
			paddingRight: 20,
			paddingTop: 10,
		},
		leftContainer: {
			flex: 2,
			padding: 20,
			paddingBottom: 30,
		},
		container: {
			backgroundColor: theme.Secondary,
			margin: 20,
			alignItems: 'center',
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
			color: theme.Quinary,
		},
		levelText: {
			fontSize: 20,
			flex: 1,
			fontWeight: 'bold',
			color: theme.Quaternary,
		},
		rightText: {
			alignItems: 'flex-end',
		},
		expText: {
			color: theme.Quaternary,
			fontSize: 20,
		},
		expBar: {
			width: '100%',
			height: 15,
			backgroundColor: Colours.Grey.ExpBarBackground,
			borderRadius: 10,
		},
		ellipsisCircle: {
			width: 6,
			height: 6,
			marginRight: 3,
			borderRadius: 3,
			backgroundColor: theme.Quaternary,
		},
		swipeIcon: {
			width: 30,
			height: 30,
		},
	});

export default habitsStyles;
