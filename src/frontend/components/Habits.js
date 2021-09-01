import React, { useState, useContext } from 'react';
import { View, Image, Text } from 'react-native';

import styles from '../styling/Habits';
import Ellipsis from './Ellipsis';
import Streaks from './Streaks';
import ScrollViewElement from './ScrollViewElement';

import { AuthContext } from '../context';

function Habits(props) {
	const [streak, setStreak] = useState(props.streak);
	const { getToken } = useContext(AuthContext);

	//useState

	const deleteHabit = () => {
		setStreak(streak - 1);

		fetch(
			'http://localhost:5000/api/v1.0.0/habit/mark_TODO/' +
				props.userHabitId +
				'/' +
				props.habitId,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'authentication-token': getToken,
				},
				body: {
					expValue: 3,
				},
			}
		)
			.then((res) =>
				res.json().then((data) => {
					//update useState
					console.log(data);
				})
			)
			.catch();

		//Check if times is zero, update
	};

	const completeHabit = () => {
		console.log('it works!');
	};

	return (
		<ScrollViewElement
			leftFunction={deleteHabit}
			rightFunction={completeHabit}
			text={props.name}
			content={
				<View style={styles.horizontalContainer}>
					<View style={styles.leftContainer}>
						<Text style={styles.textTitle}>{Capitalize(props.name)}</Text>
					</View>
					<View style={styles.container}>
						<Ellipsis />
						<View style={styles.horizontalContainerBottom}>
							<Streaks quantity={streak} />
							<Streaks quantity={streak} />
						</View>
					</View>
				</View>
			}
		/>
	);
}

function Capitalize(str) {
	if (str != null) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	return '';
}

export default Habits;
