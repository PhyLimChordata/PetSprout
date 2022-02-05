import React, { useState, useEffect, useContext } from 'react';
import { View, Image, Animated, SafeAreaView } from 'react-native';
import androidSafeAreaView from '../styling/AndroidSafeAreaView';
import styles from '../styling/HabitsScreen';
import Habits from '../components/Habits';
import MenuHeader from '../components/MenuHeader';

import { useTheme } from '@react-navigation/native';

import { AuthContext } from '../Context';
import DeleteHabitPopup from '../components/DeleteHabitPopup';

function AllHabitsScreen(props) {
	const [habits, setHabits] = useState([]);
	const [userHabitId, setUserHabitId] = useState('');
	const { colors } = useTheme();
	const [displayed, setDisplayed] = useState(false);
	const scrolling = React.useRef(new Animated.Value(0)).current;
	const [selected, setSelected] = useState(null);
	const [deleteVisible, setDeleteVisible] = useState(false);

	const { getToken, getRefreshing } = useContext(AuthContext);

	const deleteHabit = (habit) => {
		setSelected(habit);
		setDeleteVisible(true);
		console.log(habit);
		console.log('eh');
	};
	useEffect(() => {
		if (habits.length == 0 && !displayed) displayHabits();
	});

	useEffect(() => {
		if (getRefreshing) {
			displayHabits();
		}
	}, [getRefreshing]);
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
					// console.log(data);
					console.log(data.habitList.length);
					const expValue = parseInt(data.expValue);
					setHabits(data.habitList);
					setUserHabitId(data._id);
					setDisplayed(true);
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
				androidSafeAreaView().AndroidSafeArea,
			]}
		>
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
						const scale = scrolling.interpolate({
							inputRange: [-1, 0, 115 * index, 115 * (index + 1)],
							outputRange: [1, 1, 1, 0],
						});

						const opacity = scrolling.interpolate({
							inputRange: [-1, 0, 115 * index, 115 * (index + 0.8)],
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
										deleteHabit={(selected) => deleteHabit(selected)}
									></Habits>
									<View style={{ height: 15 }}></View>
								</Animated.View>
							</View>
						);
					})}
				</Animated.ScrollView>
			</View>
			{selected != null && (
				<DeleteHabitPopup
					visible={deleteVisible}
					setVisible={setDeleteVisible}
					habitTitle={selected.habitTitle}
					goBack={false}
					userHabitId={selected.userHabitId}
					habitId={selected.habitId}
				/>
			)}
		</SafeAreaView>
	);
}

export default AllHabitsScreen;
