import React, { useState, useEffect, useContext } from 'react';
import {
	View,
	Image,
	Animated,
	RefreshControl,
} from 'react-native';

import SafeAreaView from '../styling/SafeAreaView'

import styles from '../styling/HabitsScreen';
import Habits from '../components/Habits';
import MenuHeader from '../components/MenuHeader';

import ExperienceBar from '../components/ExperienceBar';

import { useTheme } from '@react-navigation/native';

import { AuthContext } from '../Context';

const levelMapping = {
	0: { xpLevelCap: 100, totalXP: 100},
	1: { xpLevelCap: 400, totalXP: 500 },
	2: { xpLevelCap: 725, totalXP: 1225 },
	3: { xpLevelCap: 950, totalXP: 2175 },
	4: { xpLevelCap: 1175, totalXP: 3350 },
	5: { xpLevelCap: 1400, totalXP: 4750 },
	6: { xpLevelCap: 1625, totalXP: 6375 },
	7: { xpLevelCap: 1850, totalXP: 8225 },
	8: { xpLevelCap: 2075, totalXP: 10300 },
	9: { xpLevelCap: 2300, totalXP: 12600 },
	10: { xpLevelCap: 2525, totalXP: 15125 },
	11: { xpLevelCap: 2575, totalXP: 17700 },
	12: { xpLevelCap: 2625, totalXP: 20325 },
	13: { xpLevelCap: 2675, totalXP: 23000 },
	14: { xpLevelCap: 2725, totalXP: 25725 },
	15: { xpLevelCap: 2775, totalXP: 28500 },
	16: { xpLevelCap: 2825, totalXP: 31325 },
	17: { xpLevelCap: 2875, totalXP: 34200 },
	18: { xpLevelCap: 2925, totalXP: 37125 },
	19: { xpLevelCap: 2975, totalXP: 40100 },
	20: { xpLevelCap: 3025, totalXP: 43125 },
	21: { xpLevelCap: 3100, totalXP: 46225 },
	22: { xpLevelCap: 3150, totalXP: 49375 },
	23: { xpLevelCap: 3200, totalXP: 52575 },
	24: { xpLevelCap: 3250, totalXP: 55825 },
	25: { xpLevelCap: 3300, totalXP: 59125 },
	26: { xpLevelCap: 3350, totalXP: 62475 },
	27: { xpLevelCap: 3400, totalXP: 65875 },
	28: { xpLevelCap: 3450, totalXP: 69325 },
	29: { xpLevelCap: 3500, totalXP: 72825 },
	30: { xpLevelCap: 3550, totalXP: 76375 },
	31: { xpLevelCap: 3600, totalXP: 79975 },
	32: { xpLevelCap: 3650, totalXP: 83625 },
	33: { xpLevelCap: 3700, totalXP: 87325 },
	34: { xpLevelCap: 3750, totalXP: 91075 },
	35: { xpLevelCap: 3800, totalXP: 94875 },
	36: { xpLevelCap: 3850, totalXP: 98725 },
	37: { xpLevelCap: 3900, totalXP: 102625 },
	38: { xpLevelCap: 3950, totalXP: 106575 },
	39: { xpLevelCap: 4000, totalXP: 110575 },
	40: { xpLevelCap: 4050, totalXP: 114625 },
};

function HabitsScreen(props) {
	const heartSize = 70;
	//THIS CAN VARY BASED ON USER's PET
	const maxHealth = 100;
	const [habits, setHabits] = useState([]);
	const [heartValue, setHeartValue] = useState({
		size: heartSize,
		view: {
			position: 'absolute',
			height: heartSize,
			width: heartSize,
			marginTop: 0,
			overflow: 'hidden',
		},
		image: { height: heartSize, width: heartSize, bottom: 0, zIndex: 1 },
		value: 100,
	});
	const [userHabitId, setUserHabitId] = useState('');
	const [experience, setExperience] = useState('');
	const [xpLevelCap, setXpLevelCap] = useState(0);
	const [totalXPCap, setTotalXPCap] = useState(0);
	const { colors } = useTheme();

	const [level, setLevel] = useState('');
	const [levelToEvolveNext, setLevelToEvolveNext] = useState(0);

	const [displayed, setDisplayed] = useState(false);

	const scrolling = React.useRef(new Animated.Value(0)).current;

	const { getToken, getRefreshing, changeRefreshing } = useContext(AuthContext);

	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		changeRefreshing(true);
		displayHabits();
		updatePet();
	}, []);

	useEffect(() => {
		if (habits.length == 0 && !displayed) displayHabits();
		updatePet();
	});

	useEffect(() => {
		if (getRefreshing) displayHabits();
		console.log(habits);
	}, [getRefreshing]);

	const displayHabits = () => {
		setDisplayed(true);
		setRefreshing(true);
		const date = new Date().getDay();
		fetch('http://localhost:5000/api/v1.0.0/habit/show_user_habit/' + date, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'authentication-token': getToken,
			},
		})
			.then((res) =>
				res.json().then((data) => {
					data.habitList.sort(function (a, b) {
						var keyA = a.times - a.todo;
						var keyB = b.times - b.todo;
						if (keyA < keyB) return 1;
						if (keyA > keyB) return -1;
						return 0;
					});
					setTimeout(() => {
						setHabits(data.habitList);
						setUserHabitId(data._id);
						setDisplayed(true);
						setRefreshing(false);
						changeRefreshing(false);
					}, 1000);
				}),
			)
			.catch();
	};

	const updatePet = () => {
		fetch('http://localhost:5000/api/v1.0.0/pets/get_current', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'authentication-token': getToken,
			},
		})
			.then((res) =>
				res.json().then((currentPet) => {
					let tempHeartValue = heartValue;
					tempHeartValue.view.height = currentPet.hp * (heartSize / maxHealth);
					tempHeartValue.view.marginTop =
						heartSize - tempHeartValue.view.height;
					tempHeartValue.image.bottom = tempHeartValue.view.marginTop;
					tempHeartValue.value = Math.ceil(
						tempHeartValue.view.height * (maxHealth / heartSize),
					);

					setHeartValue(tempHeartValue);

					if (currentPet.readyToEvolve) {
						//set some visibility
					}

					if (currentPet.readyToHatch) {
						//set some visibility
					}

					const petsLevel = currentPet.level;
					setLevel(currentPet.level);
					setNextLevelToEvolve();
					setTotalXPCap(levelMapping[petsLevel].totalXP);

					//Cap for exp bar
					setXpLevelCap(levelMapping[petsLevel].xpLevelCap);

					if (petsLevel == 0) {	
						setExperience(currentPet.expValue);					
					} else {
						let previousLevel = petsLevel - 1;
						var previousTotalXPCap = levelMapping[previousLevel].totalXP;
						setExperience(currentPet.expValue - previousTotalXPCap);
					}
					
				}),
			)
			.catch();
	};

	const setNextLevelToEvolve = () => {
		if (level == 40) {
			setLevelToEvolveNext(-1);
		} else {
			setLevelToEvolveNext(level + 10 - (level % 10));
		}
	}

	return (
		<SafeAreaView style={styles(colors).headContainer}>
			<MenuHeader text='' navigation={props.navigation} hp={heartValue} />
			<View style={styles(colors).verticalContainer}>
				<Image
					style={styles(colors).creature}
					source={require('../resources/animations/Egg.gif')}
				/>
				<ExperienceBar
					level={level}
					exp={experience}
					xpLevelCap={xpLevelCap}
				/>
			</View>
			<SafeAreaView style={styles(colors).scrollViewContainer}>
				<Animated.ScrollView
					showsVerticalScrollIndicator={false}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { y: scrolling } } }],
						{ useNativeDriver: true },
					)}
					scrollEventThrottle={16}
					// decelerationRate={'normal'}
					refreshControl={
						<RefreshControl refreshing={getRefreshing} onRefresh={onRefresh} />
					}
					scrollsToTop={true}
					snapToInterval={100}
					decelerationRate='normal'
				>
					{habits.map((data, index) => {
						let completed = data.times - data.todo > 0 ? false : true;
						const scale = scrolling.interpolate({
							inputRange: [-1, 0, 100 * index, 100 * (index + 1)],
							outputRange: [1, 1, 1, 0],
						});

						const opacity = scrolling.interpolate({
							inputRange: [-1, 0, 100 * index, 100 * (index + 0.8)],
							outputRange: [1, 1, 1, 0],
						});

						return (
							<View>
								<Animated.View style={{ opacity, transform: [{ scale }] }}>
									<Habits
										completed={completed}
										enableRight={true}
										navigation={props.navigation}
										habitId={data._id}
										name={data.title}
										streak={1}
										frequency={data.times - data.todo}
										habitId={data._id}
										userHabitId={userHabitId}
										exp={experience}
										totalExp={totalXPCap}
										levelToEvolveNext={levelToEvolveNext}
									></Habits>
									<View style={{ height: 15 }}></View>
								</Animated.View>
							</View>
						);
						// 	}
					})}
				</Animated.ScrollView>
			</SafeAreaView>
		</SafeAreaView>
	);
}

export default HabitsScreen;
