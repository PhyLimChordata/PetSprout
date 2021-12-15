import React, { useState, useEffect, useContext } from 'react';

import {
	View,
	Image,
	Animated,
	SafeAreaView,
	RefreshControl,
	StatusBar,
} from 'react-native';

import AndroidSafeView from '../styling/AndroidSafeAreaView';
import styles from '../styling/HabitsScreen';
import Habits from '../components/Habits';
import MenuHeader from '../components/MenuHeader';

import ExperienceBar from '../components/ExperienceBar';

import { useTheme } from '@react-navigation/native';

import { AuthContext } from '../Context';
import { LevelMapping } from '../resources/mappings/LevelMapping';

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

	const { getToken, getRefreshing, changeRefreshing, getPet } =
		useContext(AuthContext);

	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		changeRefreshing(true);
		displayHabits();
		updatePet();
	}, []);

	useEffect(() => {
		if (habits.length == 0 && !displayed) {
			displayHabits();
			updatePet();
		}
	});

	useEffect(() => {
		if (getRefreshing) {
			displayHabits();
			updatePet();
		}
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
					var tempHeartValue = {
						size: heartSize,
						view: {
							position: 'absolute',
							height: heartSize,
							width: heartSize,
							marginTop: 0,
							overflow: 'hidden',
						},
						image: {
							height: heartSize,
							width: heartSize,
							bottom: 0,
							zIndex: 1,
						},
						value: 100,
					};
					tempHeartValue.view['height'] =
						currentPet.hp * (heartSize / maxHealth);
					tempHeartValue.view.marginTop =
						heartSize - tempHeartValue.view.height;
					tempHeartValue.image.bottom = tempHeartValue.view.marginTop;

					tempHeartValue.value = Math.ceil(
						tempHeartValue.view.height * (maxHealth / heartSize),
					);
					console.log(tempHeartValue);
					setHeartValue(tempHeartValue);
					console.log(heartValue);
					if (currentPet.readyToEvolve) {
						//set some visibility
					}

					if (currentPet.readyToHatch) {
						//set some visibility
					}

					const petsLevel = currentPet.level;
					setLevel(currentPet.level);
					setNextLevelToEvolve();
					setTotalXPCap(LevelMapping[petsLevel].totalXP);

					//Cap for exp bar
					setXpLevelCap(LevelMapping[petsLevel].xpLevelCap);

					if (petsLevel == 0) {
						setExperience(currentPet.expValue);
					} else {
						let previousLevel = petsLevel - 1;
						var previousTotalXPCap = LevelMapping[previousLevel].totalXP;
						setExperience(currentPet.expValue - previousTotalXPCap);
					}
				}),
			)
			.catch((err) => {
				console.log(err);
			});
	};

	const setNextLevelToEvolve = () => {
		if (level == 40) {
			setLevelToEvolveNext(-1);
		} else {
			setLevelToEvolveNext(level + 10 - (level % 10));
		}
	};

	return (
		<SafeAreaView
			style={[
				styles(colors).headContainer,
				{ paddingTop: StatusBar.currentHeight },
			]}
		>
			<MenuHeader text='' navigation={props.navigation} hp={heartValue} />
			<View style={styles(colors).verticalContainer}>
				<Image style={styles(colors).creature} source={getPet} />
				<ExperienceBar level={level} exp={experience} xpLevelCap={xpLevelCap} />
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
