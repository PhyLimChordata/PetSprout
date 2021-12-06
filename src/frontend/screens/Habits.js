import React, { useState, useEffect, useContext } from 'react';

import { StatusBar } from 'react-native';

import { View, Image, Animated, SafeAreaView } from 'react-native';

import AndroidSafeView from '../styling/AndroidSafeAreaView';
import styles from '../styling/HabitsScreen';
import Habits from '../components/Habits';
import MenuHeader from '../components/MenuHeader';

import ExperienceBar from '../components/ExperienceBar';

import { useTheme } from '@react-navigation/native';

import { AuthContext } from '../Context';

function HabitsScreen(props) {
	const [habits, setHabits] = useState([]);
	const [hearts, setHearts] = useState([]);
	const [userHabitId, setUserHabitId] = useState('');
	const [experience, setExperience] = useState('');
	const { colors } = useTheme();

	const [level, setLevel] = useState('');
	const [displayed, setDisplayed] = useState(false);
	const scrolling = React.useRef(new Animated.Value(0)).current;

	const { getToken } = useContext(AuthContext);

	useEffect(() => {
		if (habits.length == 0 && !displayed) displayHabits();
	});

	const displayHabits = () => {
		setDisplayed(true);
		const date = new Date().getDay();
		fetch('http://192.168.0.25:5000/api/v1.0.0/habit/show_user_habit/' + date, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'authentication-token': getToken,
			},
		})
			.then((res) =>
				res.json().then((data) => {
					const expValue = parseInt(data.expValue);
					setHabits(data.habitList);
					setUserHabitId(data._id);
					setExperience((expValue % 100).toString());
					setLevel(Math.floor(expValue / 100).toString());

					console.log(getToken);
					//Displaying purposes
					const heartValue = [];
					for (var i = 0; i < data.heart; i++) {
						heartValue.push(i);
					}
					setHearts(heartValue);
					setDisplayed(true);
					console.log(data);
				})
			)
			.catch();
	};

	return (
		<SafeAreaView style={[styles(colors).headContainer, { paddingTop: StatusBar.currentHeight }]}>
			<MenuHeader text='' navigation={props.navigation} hp={hearts} />
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
			<View style={styles(colors).scrollViewContainer}>
				<Animated.ScrollView
					showsVerticalScrollIndicator={false}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { y: scrolling } } }],
						{ useNativeDriver: true }
					)}
					decelerationRate={'normal'}>
					{habits.map((data, index) => {
						console.log(habits);
						console.log('dud');
						if (data.times - data.todo > 0) {
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
											navigation={props.navigation}
											habitId={data._id}
											name={data.title}
											streak={1}
											frequency={data.times - data.todo}
											habitId={data._id}
											userHabitId={userHabitId}
											exp={experience}></Habits>
										<View style={{ height: 15 }}></View>
									</Animated.View>
								</View>
							);
						}
					})}
				</Animated.ScrollView>
			</View>
		</SafeAreaView>
	);
}

export default HabitsScreen;
