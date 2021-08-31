import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';

import styles from '../styling/Habits';
import Ellipsis from './Ellipsis';
import Streaks from './Streaks';
import ScrollViewElement from './ScrollViewElement';

function Habits(props) {
	const [streak, setStreak] = useState(props.streak);
	const deleteHabit = () => {
		setStreak(streak - 1);
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
