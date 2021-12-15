import React, { useState, useEffect, useContext } from 'react';
import { View, Image, Animated, SafeAreaView } from 'react-native';

import styles from '../styling/HabitsScreen';
import Habits from '../components/Habits';
import MenuHeader from '../components/MenuHeader';

import { useTheme } from '@react-navigation/native';

import { AuthContext } from '../Context';

function AllHabitsScreen(props) {
	const [habits, setHabits] = useState([]);
	const [userHabitId, setUserHabitId] = useState('');
	const { colors } = useTheme();
	const [displayed, setDisplayed] = useState(false);
	const scrolling = React.useRef(new Animated.Value(0)).current;

	const { getToken } = useContext(AuthContext);

	useEffect(() => {
		if (habits.length == 0 && !displayed) displayHabits();
	});

	const displayHabits = () => {
		setDisplayed(true);
		fetch('http://localhost:5000/api/v1.0.0/habit/show_all_user_habit/', {
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
					setDisplayed(true);
				}),
			)
			.catch();
	};

	return (
		<SafeAreaView style={styles(colors).headContainer}>
			<MenuHeader back={true} text='All Habits' navigation={props.navigation} />
			<View
				style={{ flex: 20, marginLeft: 60, marginRight: 60, marginTop: 40 }}
			>
				<Animated.ScrollView
					showsVerticalScrollIndicator={false}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { y: scrolling } } }],
						{ useNativeDriver: true },
					)}
					decelerationRate={'normal'}
				>
					{habits.map((data, index) => {
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
											enableLeft={true}
											navigation={props.navigation}
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
						}
					})}
				</Animated.ScrollView>
			</View>
		</SafeAreaView>
	);
}

export default AllHabitsScreen;
