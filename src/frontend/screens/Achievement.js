import React from 'react';
import { View, Text, Image, Dimensions, SafeAreaView } from 'react-native';
import AchievementStyle from '../styling/Achievement';
import { ProgressBar } from 'react-native-paper';
import MenuHeader from '../components/MenuHeader';

import { useFonts, Roboto_900Black } from '@expo-google-fonts/roboto';
import { useTheme } from '@react-navigation/native';

// data from database

let achievements = [
	{
		category: 'Streaks',
		progresses: [
			{
				progress: 0.3,
				iconSrc: require('../resources/assets/icon.png'),
			},
			{
				progress: 0.5,
				iconSrc: require('../resources/assets/icon.png'),
			},
			{
				progress: 0.8,
				iconSrc: require('../resources/assets/icon.png'),
			},
		],
	},
	{
		category: 'Creatures',
		progresses: [
			{
				progress: 0.3,
				iconSrc: require('../resources/assets/icon.png'),
			},
			{
				progress: 0.3,
				iconSrc: require('../resources/assets/icon.png'),
			},
			{
				progress: 0.3,
				iconSrc: require('../resources/assets/icon.png'),
			},
		],
	},
	{
		category: 'Accountability',
		progresses: [
			{
				progress: 0.3,
				iconSrc: require('../resources/assets/icon.png'),
			},
			{
				progress: 0.8,
				iconSrc: require('../resources/assets/icon.png'),
			},
			{
				progress: 0.5,
				iconSrc: require('../resources/assets/icon.png'),
			},
		],
	},
];

// // https://forums.expo.dev/t/text-cut-off-on-oneplus-device/4999/10

// let styles =
// StyleSheetFactory.getSheet(
// 	Dimensions.get('screen').width,
// 	Dimensions.get('screen').height
// );

function AchievementScreen(props) {
	let [fontsLoaded] = useFonts({
		Roboto_900Black,
	});

	const { colors } = useTheme();
	let styles = AchievementStyle(
		colors,
		Dimensions.get('screen').width,
		Dimensions.get('screen').height
	);

	if (!fontsLoaded) {
		return <View></View>;
	} else {
		console.log(props);
		return (
			<SafeAreaView>
				<MenuHeader text='Achievement' navigation={props.navigation} />

				<View style={styles.headContainer}>
					{achievements.map((item) => (
						<OneCategory
							key={item.category}
							category={item.category}
							progresses={item.progresses}
							styles={styles}
						/>
					))}
				</View>
			</SafeAreaView>
		);
	}
}

/*
    
*/

const OneCategory = (props) => {
	return (
		<View key={props.key}>
			<Text
				style={[
					props.styles.achievementName,
					props.styles.textStyles,
					{ fontFamily: 'Roboto_900Black' },
				]}>
				{props.category}
			</Text>
			<View style={props.styles.achievementRow}>
				{props.progresses.map((item, index) => (
					<OneAchievement
						key={index}
						progress={item.progress}
						srcPath={item.iconSrc}
						styles={props.styles}
					/>
				))}
			</View>
		</View>
	);
};

const OneAchievement = (props) => {
	const sty =
		props.progress > 0.33
			? props.progress > 0.66
				? props.styles.achievementGold
				: props.styles.achievementSilver
			: props.styles.achievementBronze;
	return (
		<View style={props.styles.achievementContainer}>
			<Image
				style={[props.styles.achievementIcon, sty]}
				source={props.srcPath}
			/>
			<ProgressBar
				progress={props.progress}
				style={props.styles.progressBar}
				color='#75D6FF'
			/>
		</View>
	);
};

export default AchievementScreen;
