import React, { useState, useContext, useEffect } from 'react';
import PutHabits from './PutHabits';
import { AuthContext } from '../../Context';

function ModifyHabitScreen(props) {
	const [data, setData] = useState({});
	const [isLoading, setLoading] = useState(true);
	const { getToken } = useContext(AuthContext);
	useEffect(() => {
		getHabit();
	}, []);

	const getHabit = () => {
		fetch(
			'http://3.15.57.200:5000/api/v1.0.0/habit/show_habit/' +
				props.route.params.userHabitId +
				'/' +
				props.route.params.habitId,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'authentication-token': getToken,
				},
			},
		)
			.then((res) =>
				res.json().then((data) => {
					setData(data);
					setLoading(false);
				}),
			)
			.catch();
	};

	if (isLoading) return <></>;
	return (
		<PutHabits
			navigation={props.navigation}
			isCreate={false}
			header={'Modify Habit'}
			days={[
				data.schedule.includes('0'),
				data.schedule.includes('1'),
				data.schedule.includes('2'),
				data.schedule.includes('3'),
				data.schedule.includes('4'),
				data.schedule.includes('5'),
				data.schedule.includes('6'),
			]}
			alarms={data.alarm}
			title={data.title}
			description={data.description}
			reason={data.reason}
			buttonText={'Modify'}
			userHabitId={props.route.params.userHabitId}
			habitId={props.route.params.habitId}
		/>
	);
}

export default ModifyHabitScreen;
