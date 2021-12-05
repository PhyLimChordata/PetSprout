import React, { useState, useContext } from 'react';
import { View, Image, Text } from 'react-native';

import styles from '../styling/Habits';
import Ellipsis from './Ellipsis';
import Counter from './Counter';
import ScrollViewElement from './ScrollViewElement';

import { AuthContext } from '../Context';
import { useTheme } from '@react-navigation/native';
import Colours from '../resources/themes/Colours';

function Habits(props) {
	const [streak, setStreak] = useState(props.streak);
	const [frequency, setFrequency] = useState(props.frequency);

	const [completed, setCompleted] = useState(props.completed);
	const { getToken, changeRefreshing } = useContext(AuthContext);

	const { colors } = useTheme();

	const completeHabit = () => {
		setFrequency(frequency - 1);
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
				body: JSON.stringify({
					expValue: +props.exp + 5,
					date: new Date(),
					remainingToLevel: props.remainingToLevel,
				}),
			},
		)
			.then((res) =>
				res.json().then(() => {
					if (frequency - 1 == 0) {
						setCompleted(true);
						gainXP(300);
					} else {
						gainXP(50);
					}
					changeRefreshing(true);
				}),
			)
			.catch();
	};

	const gainXP = (xp) => {
		fetch(
			'http://localhost:5000/api/v1.0.0/pets/gain_exp',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'authentication-token': getToken,
				},
				body: JSON.stringify({
					expValue: xp,
					totalExp: props.totalExp,
					levelToEvolveNext: props.levelToEvolveNext
				}),
			},
		)
			.then((res) =>
				res.json().then(() => {
					
				}),
			)
			.catch();
	}

	const deleteHabit = () => {
		fetch(
			'http://localhost:5000/api/v1.0.0/habit/delete_habit/' +
				props.userHabitId +
				'/' +
				props.habitId,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'authentication-token': getToken,
				},
			},
		)
			.then((res) =>
				res.json().then((data) => {
					changeRefreshing(true);
					props.navigation.navigate(null);
					//TODOs
				}),
			)
			.catch();
	};

	return (
		<View>
			{!completed ? (
				<ScrollViewElement
					rightFunction={props.enableRight ? completeHabit : undefined}
					leftFunction={props.enableLeft ? deleteHabit : undefined}
					text={props.name}
					content={
						<View style={styles(colors).horizontalContainer}>
							<View style={styles(colors).leftContainer}>
								<Text style={styles(colors).textTitle}>
									{Capitalize(props.name)}
								</Text>
							</View>
							<View style={styles(colors).container}>
								<Ellipsis
									onPress={() =>
										props.navigation.navigate('ModifyHabitScreen', {
											habitId: props.habitId,
											userHabitId: props.userHabitId,
										})
									}
								/>
								<View style={styles(colors).horizontalContainerBottom}>
									<Counter
										quantity={streak}
										supplementalInfo={
											<Image
												source={require('../resources/images/Streak.png')}
												resizeMode='contain'
												style={{
													height: 20,
													width: 20,
													tintColor: colors.Quaternary,
													marginTop: 'auto',
												}}
											/>
										}
									/>
									<Counter
										quantity={frequency}
										supplementalInfo={
											<Text style={styles(colors).expText}>x</Text>
										}
										last={true}
									/>
								</View>
							</View>
						</View>
					}
				/>
			) : (
				<ScrollViewElement
					text={props.name}
					content={
						<View style={styles(colors).completedHabit}>
							<View style={styles(colors).leftContainer}>
								<Text style={styles(colors).completedHabitTextTitle}>
									{Capitalize(props.name)}
								</Text>
							</View>
							<View style={styles(colors).completedContainer}>
								<Ellipsis
									completed={true}
									onPress={() =>
										props.navigation.navigate('ModifyHabitScreen', {
											habitId: props.habitId,
											userHabitId: props.userHabitId,
										})
									}
								/>
								<View style={styles(colors).completedHorizontalContainerBottom}>
									<Counter
										completed={true}
										quantity={streak}
										supplementalInfo={
											<Image
												source={require('../resources/images/Streak.png')}
												resizeMode='contain'
												style={{
													height: 20,
													width: 20,
													tintColor: Colours.Grey.Text,
													marginTop: 'auto',
												}}
											/>
										}
									/>
									<Counter
										completed={true}
										quantity={frequency}
										supplementalInfo={
											<Text style={styles(colors).completedExpText}>x</Text>
										}
										last={true}
									/>
								</View>
							</View>
						</View>
					}
				/>
			)}
		</View>
	);
}

function Capitalize(str) {
	if (str != null) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	return '';
}

export default Habits;
