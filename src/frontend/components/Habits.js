import React, { useState, useContext, useEffect } from 'react';
import { View, Image, Text } from 'react-native';

import styles from '../styling/Habits';
import Ellipsis from './Ellipsis';
import Counter from './Counter';
import ScrollViewElement from './ScrollViewElement';

import { AuthContext } from '../Context';
import { useTheme } from '@react-navigation/native';
import Colours from '../resources/themes/Colours';
import { gainXP } from '../components/DisplayPet';

function Habits(props) {
	const [streak, setStreak] = useState(props.streak);
	const [frequency, setFrequency] = useState(props.frequency);
	const [completed, setCompleted] = useState(props.completed);
	const { getToken, changeRefreshing, getRefreshing } = useContext(AuthContext);
	
	const { colors } = useTheme();
	
	useEffect(() => {
		if (!getRefreshing) {
			setCompleted(props.completed);
			setFrequency(props.frequency);
			setStreak(props.streak);
			props.startFunction();
		}
	}
	, [getRefreshing]);
	
	const disableCompletionTemp = () => {
		props.pauseFunction();
		completeHabit();
	};
	
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
					expValue: 5,
					date: new Date(),
					// remainingToLevel: props.remainingToLevel,
				}),
			},
		)
			.then((res) =>
				res.json().then(() => {
					console.log('completehabit was called');
					if (frequency - 1 == 0) {
						setCompleted(true);
						gainXP(300, getToken);
					} else {
						gainXP(50, getToken);
					}
					changeRefreshing(true);
					//console.log('refreshed');
				}),
			)
			.catch();
	};

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
			<ScrollViewElement
				rightFunction={
					props.enableRight && !completed ? disableCompletionTemp : undefined
				}
				leftFunction={
					props.enableLeft && !completed
						? () =>
								props.deleteHabit({
									habitId: props.habitId,
									userHabitId: props.userHabitId,
									habitTitle: props.name,
								})
						: undefined
				}
				disabled = {props.disabled}
				text={props.name}
				content={
					<View
						style={
							!completed
								? styles(colors).horizontalContainer
								: styles(colors).completedHabit
						}
					>
						<View style={styles(colors).leftContainer}>
							<Text
								numberOfLines={2}
								style={
									!completed
										? styles(colors).textTitle
										: styles(colors).completedHabitTextTitle
								}
							>
								{Capitalize(props.name)}
							</Text>
						</View>
						<View
							style={
								!completed
									? styles(colors).container
									: styles(colors).completedContainer
							}
						>
							<View style={{ alignItems: 'flex-end' }}>
								<Ellipsis
									completed={completed}
									onPress={() =>
										props.navigation.navigate('ModifyHabitScreen', {
											habitId: props.habitId,
											userHabitId: props.userHabitId,
										})
									}
								/>
							</View>
							<View
								style={
									!completed
										? styles(colors).horizontalContainerBottom
										: styles(colors).completedHorizontalContainerBottom
								}
							>
								<Counter
									completed={completed}
									quantity={streak}
									supplementalInfo={
										<Image
											source={require('../resources/images/Streak.png')}
											resizeMode='contain'
											style={{
												height: 20,
												width: 20,
												tintColor: !completed
													? colors.Quaternary
													: Colours.Grey.Text,
												marginTop: 'auto',
											}}
										/>
									}
								/>
								<Counter
									completed={completed}
									quantity={frequency}
									supplementalInfo={
										<Text
											style={
												!completed
													? styles(colors).expText
													: styles(colors).completedExpText
											}
										>
											x
										</Text>
									}
								/>
							</View>
						</View>
					</View>
				}
			/>
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
