import React, { useState, useContext } from 'react';
import Colours from '../../resources/themes/Colours';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	SafeAreaView,
} from 'react-native';
import androidSafeAreaView from '../../styling/AndroidSafeAreaView';
import MenuHeader from '../../components/MenuHeader';
import styles from '../../styling/Header';
import TextBox from '../../components/TextBox';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import TimeTab from '../../components/TimeTab';
import { AuthContext } from '../../Context';
import ScrollViewElement from '../../components/ScrollViewElement';
import BottomPopup from '../../components/BottomPopup';

import { useTheme } from '@react-navigation/native';
import DeleteHabitPopup from '../../components/DeleteHabitPopup';

const url = process.env.BASE_URL;

function Day({ selected, letter, onPress }) {
	const { colors } = useTheme();
	return (
		<TouchableOpacity
			onPress={onPress}
			style={{
				alignItems: 'center',
				width: 40,
				height: 40,
				backgroundColor: selected ? colors.Tertiary : colors.background,
				borderRadius: 20,
				justifyContent: 'center',
				marginVertical: 5,
				borderWidth: 2,
				borderColor: colors.Quaternary,
			}}
			activeOpacity={0.6}
		>
			<Text
				style={{
					color: colors.Quinary,
					fontSize: 20,
					fontWeight: 'bold',
				}}
			>
				{' '}
				{letter}{' '}
			</Text>
		</TouchableOpacity>
	);
}

function PutHabits(props) {
	let popup = React.useRef();
	const [days, setDays] = useState(props.days);
	const [alarms, setAlarms] = useState(props.alarms);
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [title, setTitle] = useState(props.title);
	const [description, setDescription] = useState(props.description);
	const [reason, setReason] = useState(props.reason);
	const { getToken, changeRefreshing } = useContext(AuthContext);
	const [popupText, setPopupText] = useState('');
	const [invalidParams, setInvalidParams] = useState([]);
	const [deleteVisible, setDeleteVisible] = useState(false);

	const { colors } = useTheme();
	const createHabit = () => {
		var times = alarms.length == 0 ? 1 : alarms.length;
		fetch(url + '/api/v1.0.0/habit/create_habit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'authentication-token': getToken,
			},
			body: JSON.stringify({
				title: title,
				description: description,
				reason: reason,
				schedule: days,
				date: new Date(),
				times: times,
				alarm: alarms,
			}),
		})
			.then((res) => {
				res.json().then((data) => {
					if (res.status == 200) {
						changeRefreshing(true);
						props.navigation.goBack(null);
					} else {
						setInvalidParams(data.error);
						setPopupText('The provided information cannot be saved');
						popup.current?.togglePopup();
						checkInvalidity('title', data.error, setTitleTextStyle);
						checkInvalidity('schedule', data.error, setScheduleTextStyle);
					}
				});
			})
			.catch();
	};
	const modifyHabit = () => {
		fetch(
			url + '/api/v1.0.0/habit/change_habit/' +
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
					title: title,
					description: description,
					reason: reason,
					schedule: days,
					date: new Date(),
					times: alarms.length == 0 ? 1 : alarms.length,
					alarm: alarms,
				}),
			},
		)
			.then((res) => {
				res.json().then((data) => {
					if (res.status == 200) {
						changeRefreshing(true);
						props.navigation.goBack(null);
					} else {
						setInvalidParams(data.error);
						setPopupText('The provided information cannot be saved');
						popup.current?.togglePopup();
						checkInvalidity('title', data.error, setTitleTextStyle);
						checkInvalidity('schedule', data.error, setScheduleTextStyle);
					}
				});
			})
			.catch();
	};

	const deleteHabit = () => {
		fetch(
			url + '/api/v1.0.0/habit/delete_habit/' +
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
			.then((res) => {
				res.json().then((data) => {
					if (res.status == 200) {
						changeRefreshing(true);
						props.navigation.goBack(null);
					} else {
						setPopupText('Error on Delete');
						popup.current?.togglePopup();
					}
				});
			})
			.catch();
	};

	const checkInvalidity = (value, error, set) => {
		if (error.includes(value)) {
			set({
				fontSize: 20,
				fontWeight: 'bold',
				paddingBottom: 5,
				color: Colours.Red.Error,
			});
		}
	};
	const onPress = props.isCreate ? () => createHabit() : () => modifyHabit();

	function flipDay(index) {
		if (invalidParams.includes('schedule')) {
			invalidParams.splice(invalidParams.indexOf('schedule'), 1);
		}
		let newArr = [...days];
		newArr[index] = !newArr[index];
		setDays(newArr);
	}
	// Gets time not including date in minutes
	function getTime(time) {
		return time.getHours() * 60 + time.getMinutes();
	}
	function addAlarm(time) {
		time.setSeconds(0, 0);
		for (let alarm of alarms) {
			alarm = new Date(alarm);
			if (getTime(alarm) == getTime(time)) {
				setPopupText('Alarm Already Exists');
				popup.current?.togglePopup();
				return;
			}
		}
		setAlarms([...alarms, time].sort());
	}

	function removeAlarm(index) {
		setAlarms([...alarms.slice(0, index), ...alarms.slice(index + 1)]);
	}

	function getPrettyDate(time) {
		let localeSpecificTime = new Date(time).toLocaleTimeString();
		return localeSpecificTime.replace(/:\d+ /, ' ');
	}

	const [titleTextStyle, setTitleTextStyle] = useState({
		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom: 5,
		color: colors.Quaternary,
	});

	const [scheduleTextStyle, setScheduleTextStyle] = useState({
		fontSize: 20,
		fontWeight: 'bold',
		color: colors.Quaternary,
	});

	const textboxSmallStyle = {
		backgroundColor: colors.Secondary,
		padding: 10,
		borderWidth: 0,
		height: 50,
		fontWeight: 'bold',
		fontSize: 15,
		borderRadius: 5,
		marginBottom: 20,

		color: colors.Quinary,
	};
	const textboxBigStyle = {
		backgroundColor: colors.Secondary,
		padding: 10,
		height: 100,
		fontSize: 15,
		fontWeight: 'bold',
		borderRadius: 5,
		marginBottom: 20,
		color: colors.Quinary,
	};

	const textboxSmallStyleInvalid = {
		backgroundColor: Colours.Red.NotSelected,
		padding: 10,
		height: 50,
		fontSize: 15,
		fontWeight: 'bold',
		borderRadius: 5,
		marginBottom: 20,
		color: Colours.Unique.Black,
	};
	return (
		<SafeAreaView
			style={[
				styles(colors).headContainer,
				androidSafeAreaView().AndroidSafeArea,
			]}
		>
			<MenuHeader
				back={true}
				text={props.header}
				navigation={props.navigation}
				right={
					<TouchableOpacity onPress={() => onPress()}>
						<Text style={styles(colors).headerText}> {props.buttonText} </Text>
					</TouchableOpacity>
				}
			/>
			<ScrollView>
				<View style={{ marginHorizontal: 30, marginTop: 10 }}>
					<TextBox
						onPress={() => {
							if (invalidParams.includes('title')) {
								let cloneArray = invalidParams.slice();
								cloneArray.splice(cloneArray.indexOf('title'), 1);
								setInvalidParams(cloneArray);
							}
							setTitleTextStyle(styles(colors).authenticationText);
						}}
						header={'Title'}
						setTextStyle={setTitleTextStyle}
						textStyle={titleTextStyle}
						boxStyle={
							invalidParams.includes('title')
								? textboxSmallStyleInvalid
								: textboxSmallStyle
						}
						multiline={true}
						setText={setTitle}
						text={title}
					/>
					{invalidParams.includes('title') && (
						<Text
							style={{
								marginTop: -10,
								marginBottom: 5,
								color: Colours.Red.Error,
								fontSize: 15,
								fontWeight: 'bold',
							}}
						>
							{' '}
							This is a Required Field{' '}
						</Text>
					)}
					<TextBox
						header={'Description'}
						boxStyle={textboxBigStyle}
						multiline={true}
						setText={setDescription}
						text={description}
					/>
					<TextBox
						header={'Your Why'}
						boxStyle={textboxSmallStyle}
						multiline={true}
						setText={setReason}
						text={reason}
					/>
					<Text style={scheduleTextStyle}>Schedule</Text>
					<View
						style={{ flexDirection: 'row', justifyContent: 'space-between' }}
					>
						<Day letter={'S'} selected={days[0]} onPress={() => flipDay(0)} />
						<Day letter={'M'} selected={days[1]} onPress={() => flipDay(1)} />
						<Day letter={'T'} selected={days[2]} onPress={() => flipDay(2)} />
						<Day letter={'W'} selected={days[3]} onPress={() => flipDay(3)} />
						<Day letter={'T'} selected={days[4]} onPress={() => flipDay(4)} />
						<Day letter={'F'} selected={days[5]} onPress={() => flipDay(5)} />
						<Day letter={'S'} selected={days[6]} onPress={() => flipDay(6)} />
					</View>
					{invalidParams.includes('schedule') && (
						<Text
							style={{
								marginTop: 5,
								color: Colours.Red.Error,
								fontSize: 15,
								fontWeight: 'bold',
							}}
						>
							{' '}
							Select a Day of the Week{' '}
						</Text>
					)}
					<View style={{ alignItems: 'center', marginVertical: 20 }}>
						<TouchableOpacity
							style={{
								width: 200,
								height: 50,
								backgroundColor: colors.Tertiary,
								alignItems: 'center',
								justifyContent: 'center',
								borderRadius: 20,
							}}
							onPress={() => {
								if (invalidParams.includes('alarm')) {
									invalidParams.splice(invalidParams.indexOf('alarm'), 1);
								}
								setDatePickerVisibility(true);
							}}
						>
							<Text
								style={{
									fontSize: 20,
									fontWeight: 'bold',
									color: colors.Quinary,
								}}
							>
								Add An Alarm
							</Text>
						</TouchableOpacity>
						{invalidParams.includes('alarm') && (
							<Text
								style={{
									marginTop: 10,
									color: Colours.Red.Error,
									fontSize: 15,
									fontWeight: 'bold',
								}}
							>
								{' '}
								Create an Alarm{' '}
							</Text>
						)}
					</View>
					<View>
						{alarms.map((time, index) => {
							return (
								<View key={index}>
									<ScrollViewElement
										leftFunction={() => removeAlarm(index)}
										leftClose={true}
										content={<TimeTab time={getPrettyDate(time)} />}
									/>
									<View style={{ marginVertical: 7 }} />
								</View>
							);
						})}
					</View>
				</View>
			</ScrollView>
			{!props.isCreate && (
				<>
					<TouchableOpacity
						onPress={() => setDeleteVisible(true)}
						style={{
							backgroundColor: '#E37272',
							alignItems: 'center',
							justifyContent: 'center',
							height: 40,
							marginHorizontal: 30,
							borderRadius: 10,
							marginBottom: 30,
						}}
					>
						<Text
							style={{
								fontSize: 20,
								fontWeight: 'bold',
								color: colors.background,
							}}
						>
							Delete Habit
						</Text>
					</TouchableOpacity>
					<DeleteHabitPopup
						visible={deleteVisible}
						setVisible={setDeleteVisible}
						habitTitle={props.title}
						setBottomPopupText={setPopupText}
						bottomPopupRef={popup}
						navigation={props.navigation}
						goBack={true}
						userHabitId={props.userHabitId}
						habitId={props.habitId}
					/>
				</>
			)}
			<BottomPopup ref={popup} text={popupText} />
			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode='time'
				date={new Date('Aug 29 2020 23:00:00 EST')}
				onConfirm={(time) => {
					addAlarm(time);
					setDatePickerVisibility(false);
				}}
				onCancel={() => setDatePickerVisibility(false)}
			/>
		</SafeAreaView>
	);
}

export default PutHabits;
