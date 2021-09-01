import React, { useState, useEffect, useContext } from 'react';
import { View, Image, Animated, SafeAreaView } from 'react-native';

import styles from '../styling/HabitsScreen';
import Habits from '../components/Habits';
import Menu from '../components/Menu';
import MenuHeader from '../components/MenuHeader';

import ExperienceBar from '../components/ExperienceBar';
import Checkmark from '../components/Checkmark';
import Trash from '../components/Trash';
import ScrollViewElement from '../components/ScrollViewElement';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import ColorSet from '../resources/themes/Global';

import { AuthContext } from '../context';

function HabitsScreen(props) {
	const [habits, setHabits] = useState([]);
	const [hearts, setHearts] = useState([]);
	const scrolling = React.useRef(new Animated.Value(0)).current;

	const { getToken } = useContext(AuthContext);

	const deleteHabit = () => {
		console.log('it works!');
	};

	const completeHabit = () => {
		console.log('it works!');
	};

	useEffect(() => {
		if (habits.length == 0) get();
	});

	const get = () => {
		const date = new Date();
		console.log(date.getDay());
		console.log(date);
		fetch('http://localhost:5000/example/get')
			.then((res) => res.json())
			.then((data) => {
				setHabits(data.ex);
				//setHearts(data.heart);
				console.log(habits);
				console.log(getToken);
			})
			.catch();
	};

	return (
		<SafeAreaView style={styles.headContainer}>
			<MenuHeader text="" navigation={props.navigation} />
			<View style={styles.verticalContainer}>
				<Image
					style={styles.creature}
					source={require('../resources/images/Egg.gif')}
				/>
				<ExperienceBar width="28%" />
			</View>
			<View style={styles.scrollViewContainer}>
				<Animated.ScrollView
					showsVerticalScrollIndicator={false}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { y: scrolling } } }],
						{ useNativeDriver: true }
					)}
					decelerationRate={'normal'}
				>
					{habits.map((data, index) => {
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
									<Habits name={data.extra} streak={1}></Habits>
									{/* Need to change to data.streak */}
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
