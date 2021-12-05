import React, { useState, useEffect, useContext } from 'react';
import {
	View,
	Image,
	Animated,
	SafeAreaView,
	RefreshControl,
} from 'react-native';

import styles from '../styling/HabitsScreen';
import Habits from '../components/Habits';
import MenuHeader from '../components/MenuHeader';

import ExperienceBar from '../components/ExperienceBar';

import { useTheme } from '@react-navigation/native';

import { AuthContext } from '../Context';

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
	const { colors } = useTheme();

	const [level, setLevel] = useState('');
	const [displayed, setDisplayed] = useState(false);

	const scrolling = React.useRef(new Animated.Value(0)).current;

	const { getToken, getRefreshing, changeRefreshing } = useContext(AuthContext);

	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		changeRefreshing(true);
		displayHabits();
		updateHp();
	}, []);

	useEffect(() => {
		if (habits.length == 0 && !displayed) displayHabits();
		updateHp();
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

					const expValue = parseInt(data.expValue);
					setTimeout(() => {
						setHabits(data.habitList);
						setUserHabitId(data._id);
						setExperience((expValue % 100).toString());
						setLevel(Math.floor(expValue / 100).toString());
						setDisplayed(true);
						setRefreshing(false);
						changeRefreshing(false);
					}, 1000);
				}),
			)
			.catch();
	};

	const updateHp = () => {
		fetch('http://localhost:5000/api/v1.0.0/pets/get_health', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'authentication-token': getToken,
			},
		})
			.then((res) =>
				res.json().then((hpValue) => {
					let tempHeartValue = heartValue;
					tempHeartValue.view.height = hpValue * (heartSize/maxHealth);
					tempHeartValue.view.marginTop = heartSize - tempHeartValue.view.height;
					tempHeartValue.image.bottom = tempHeartValue.view.marginTop;
					tempHeartValue.value = Math.ceil(
						tempHeartValue.view.height * (maxHealth/heartSize),
					);

					setHeartValue(tempHeartValue);
				}),
			)
			.catch();
	};

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
					width={experience + '%'}
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
										remainingToLevel={100 - experience}
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
