import React, { useState, useEffect, useContext } from 'react';

import {
	View,
	Animated,
	SafeAreaView,
	RefreshControl,
	StatusBar,
	Text,
	TouchableOpacity,
} from 'react-native';

import styles from '../styling/HabitsScreen';
import Habits from '../components/Habits';
import MenuHeader from '../components/MenuHeader';

import { useTheme } from '@react-navigation/native';

import { AuthContext } from '../Context';

import { DisplayPet } from '../components/DisplayPet';
import DeleteHabitPopup from '../components/DeleteHabitPopup';
import EvolutionPopup from '../components/EvolutionPopup';

function HabitsScreen(props) {
	const [habits, setHabits] = useState([]);
	const [userHabitId, setUserHabitId] = useState('');

	const { colors } = useTheme();

	const [displayed, setDisplayed] = useState(false);

	const scrolling = React.useRef(new Animated.Value(0)).current;

	const { getToken, getRefreshing, changeRefreshing, getPet } =
		useContext(AuthContext);

	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		changeRefreshing(true);
		displayHabits();
	}, []);

	useEffect(() => {
		if (habits.length == 0 && !displayed) {
			displayHabits();
		}
	});

	useEffect(() => {
		if (getRefreshing) {
			displayHabits();
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
					console.log(data.habitList);
					// data.habitList.sort(function (a, b) {
					// 	var keyA = a.times - a.todo;
					// 	var keyB = b.times - b.todo;
					// 	if (keyA < keyB) return 1;
					// 	if (keyA > keyB) return -1;
					// 	return 0;
					// });
					setTimeout(() => {
						setHabits(data.habitList);
						setUserHabitId(data._id);
						setDisplayed(true);
						setRefreshing(false);
						changeRefreshing(false);
					}, 1000);
				}),
			)
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<SafeAreaView
			style={[
				styles(colors).headContainer,
				{ paddingTop: StatusBar.currentHeight },
			]}
		>
			<MenuHeader text='' navigation={props.navigation} displayHp={true} />
			<DisplayPet navigation={props.navigation} />
			<View style={styles(colors).scrollViewContainer}>
				<TouchableOpacity
					style={{ alignSelf: 'flex-end' }}
					onPress={() => props.navigation.navigate('AllHabitsScreen')}
				>
					<Text
						style={{
							fontSize: 16,
							fontWeight: 'bold',
							color: colors.Quaternary,
						}}
					>
						View All Habits
					</Text>
				</TouchableOpacity>
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
									></Habits>
									<View style={{ height: 15 }}></View>
								</Animated.View>
							</View>
						);
					})}
				</Animated.ScrollView>
			</View>
		</SafeAreaView>
	);
}

export default HabitsScreen;
