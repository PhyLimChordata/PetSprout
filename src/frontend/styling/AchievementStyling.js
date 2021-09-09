import { StyleSheet } from 'react-native';
import Colours from '../resources/themes/Colours';

export default class StyleSheetFactory {
	static getSheet(width, height) {
		const iconWidth = width * 0.1415;
		console.log(width);
		console.log(height);
		return StyleSheet.create({
			headContainer: {
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
			},
			achievementContainer: {
				width: iconWidth,
				margin: 0.025 * width,
			},
			achievementRow: {
				display: 'flex',
				flexDirection: 'row',
			},
			achievementIcon: {
				width: iconWidth,
				height: iconWidth,
				borderWidth: iconWidth * 0.13043,
				borderRadius: iconWidth / 2,
				overflow: 'hidden',
			},
			achievementBronze: {
				// borderColor: ColorSet.Bronze,
				borderColor: Colours.Unique.Bronze,
			},
			achievementSilver: {
				borderColor: Colours.Unique.Silver,
			},
			achievementGold: {
				borderColor: Colours.Unique.Gold,
			},
			progressBar: {
				height: 0.0084 * height,
				borderRadius: 10,
				marginTop: '20%',
			},
			textStyles: {
				fontStyle: 'normal',
				fontWeight: '900',
				// color: ColorSet.Green.Quinary,
				color: 'red',
			},
			achievementName: {
				alignSelf: 'center',
				marginTop: '7%',
			},
			achievementHeader: {
				fontSize: 24,
			},
		});
	}
}
