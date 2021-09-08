import React, { useState, useContext } from 'react';
import { View, Image, Text } from 'react-native';

import styles from '../styling/Habits';
import Ellipsis from './Ellipsis';
import Counter from './Counter';
import ScrollViewElement from './ScrollViewElement';

import { AuthContext } from '../context';
import ColorSet from '../resources/themes/Global';

function Habits(props) {
	const [streak, setStreak] = useState(props.streak);
	const [frequency, setFrequency] = useState(props.frequency);
  
	const [completed, setCompleted] = useState(false);
	const { getToken } = useContext(AuthContext);

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
					expValue: 3,
				}),
			}
		)
			.then((res) =>
				res.json().then((data) => {
					if (frequency - 1 == 0) {
						setCompleted(true);
					}
				})
			)
			.catch();
	};

	return (
		<View>
			{!completed ? (
				<ScrollViewElement
					rightFunction={completeHabit}
					text={props.name}
					content={
						<View style={styles.horizontalContainer}>
							<View style={styles.leftContainer}>
								<Text style={styles.textTitle}>{Capitalize(props.name)}</Text>
							</View>
							<View style={styles.container}>
								<Ellipsis onPress={() => props.navigation.navigate('ModifyHabitScreen', {habitId:props.habitId, userHabitId:props.userHabitId} )}/>
								<View style={styles.horizontalContainerBottom}>
									<Counter
										quantity={streak}
										supplementalInfo={
											<Image
												source={require('../resources/images/Streak.png')}
												resizeMode="contain"
												style={{
													height: 20,
													width: 20,
													tintColor: ColorSet.Green.Quaternary,
													marginTop: 'auto',
												}}
											/>
										}
									/>
									<Counter
										quantity={frequency}
										supplementalInfo={<Text style={styles.expText}>x</Text>}
										last={true}
									/>
								</View>
							</View>
						</View>
					}
				/>
			) : null}
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
