import React, { useState, useEffect, useContext, useRef } from 'react';
import {
	View,
	Image,
	SafeAreaView,
	Text,
	RefreshControl,
	TouchableOpacity,
	TextInput,
	Button,
	AppState,
} from 'react-native';

import PomodoroFinishPopup from '../components/PomodoroFinishPopup';
import PomodoroStartPopup from '../components/PomodoroStartPopup';
import PomodoroCancelPopup from '../components/PomodoroCancelPopup';

import androidSafeAreaView from '../styling/AndroidSafeAreaView';
import MenuHeader from '../components/MenuHeader';

import ExperienceBar from '../components/ExperienceBar';

import { useTheme } from '@react-navigation/native';
import PomodoroMode from '../components/PomodoroMode';
import { AuthContext } from '../Context';

import { LevelMapping } from '../resources/mappings/LevelMapping';

import * as BackgroundFetch from 'expo-background-fetch';

import * as TaskManager from 'expo-task-manager';

import { DisplayPet, gainXP, loseHP } from '../components/DisplayPet';

const BACKGROUND_FETCH_TASK = 'background-fetch';

function PomodoroScreen(props) {
	const [isRegistered, setIsRegistered] = React.useState(false);
	const [status, setStatus] = React.useState(null);

	const { colors } = useTheme();

	const duration = { Pomodoro: 1500, 'Long Break': 600, 'Short Break': 300 };

	const [remainingSecs, setRemainingSecs] = useState(duration['Pomodoro']);
	const [isActive, setActive] = useState(false);

	const [breakEnabled, setBreak] = useState(false);
	const [rounds, setRounds] = useState(1);

	const [mode, setMode] = useState('Pomodoro');

	const [finished, setFinished] = useState(false);
	const [start, setStart] = useState(false);
	const [cancel, setCancel] = useState(false);

	//CHANGES
	const appState = useRef(AppState.currentState);
	const [appStateVisible, setAppStateVisible] = useState(appState.current);
	const [initialDate, setInitialDate] = useState(null);

	const formatNumber = (number) => {
		return ('0' + number.toString()).slice(-2);
	};

	const convertRemaining = (remaining) => {
		return { mins: Math.floor(remaining / 60), secs: remaining % 60 };
	};

	const [mins, setMins] = useState(
		formatNumber(convertRemaining(duration['Pomodoro']).mins),
	);
	const [secs, setSecs] = useState(
		formatNumber(convertRemaining(duration['Pomodoro']).secs),
	);

	const resetTimer = (duration) => {
		setMins(formatNumber(convertRemaining(duration).mins));
		setSecs(formatNumber(convertRemaining(duration).secs));
		setRemainingSecs(duration);
	};

	const setTimer = (time) => {
		setMins(formatNumber(convertRemaining(time).mins));
		setSecs(formatNumber(convertRemaining(time).secs));
	};

	const showFinish = () => {
		setFinished(true);
	};

	const showStartPopup = () => {
		setStart(true);
	};

	const showCancel = () => {
		setCancel(true);
	};

	useEffect(() => {
		let interval = null;
		if (isActive) {
			if (mode != 'Pomodoro') {
				setBreak(false);
				setRounds(0);
			}
			interval = setInterval(() => {
				setRemainingSecs((remainingSecs) => remainingSecs - 1);
				setTimer(remainingSecs);
				if (remainingSecs == 0) {
					setRounds(rounds + 1);
					//play sound and bring up pop up
					showFinish();
					if (rounds >= 1) {
						setBreak(true);
					}
					setActive(false);
					resetTimer(duration['Pomodoro']);
				}
			}, 1000);
		} else if (!isActive && remainingSecs !== 0) {
			clearInterval(interval);
			if (mode != 'Pomodoro') {
				setMode('Pomodoro');
			} else {
				if (rounds >= 3 && rounds % 3 == 0) {
					gainXP(500, getToken);
				} else if (rounds > 0) {
					gainXP(150, getToken);
				}
				changeRefreshing(true);
			}
		}
		return () => clearInterval(interval);
	}, [isActive, remainingSecs]);

	const { getToken, getRefreshing, changeRefreshing } = useContext(AuthContext);

	useEffect(() => {
		checkStatusAsync();
	}, []);

	useEffect(() => {
		const subscription = AppState.addEventListener('change', (nextAppState) => {
			if (
				appState.current.match(/inactive|background/) &&
				nextAppState === 'active' &&
				iniDateRef.current
			) {
				onFocus();
			} else if (
				appState.current === 'active' &&
				nextAppState.match(/inactive|background/) &&
				activeRef.current
			) {
				offFocus();
			}
			appState.current = nextAppState;
			setAppStateVisible(appState.current);
		});

		return () => {
			subscription.remove();
		};
	}, []);

	useEffect(() => {
		iniDateRef.current = initialDate;
	}, [initialDate]);

	const iniDateRef = useRef(initialDate);

	useEffect(() => {
		activeRef.current = isActive;
	}, [isActive]);

	const activeRef = useRef(isActive);

	//Method that sets isActive to false, and records current time
	const offFocus = () => {
		//Records time user left app for later
		let date = new Date();
		setInitialDate(date);
		//Turns timer off
		setActive(false);
	};

	//Method that records current time, checks time elapsed, checks if time = 0
	const onFocus = () => {
		//Records time user put focus back on app
		let date2 = new Date();
		//Calculate time elapsed between times
		var diff = Math.floor(
			(date2.getTime() - iniDateRef.current.getTime()) / 1000,
		);
		setInitialDate(null);
		//Check if time has reached zero
		if (remainingSecs - diff <= 0) {
			//If reached zero,
			setRounds(rounds + 1);
			//resetTimer(duration['Pomodoro']);
			if (rounds >= 1) {
				setBreak(true);
			}
		} else {
			//If not reached zero
			setRemainingSecs((remainingSecs) => remainingSecs - diff);
			setTimer(remainingSecs);
			setActive(true);
		}
	};

	const checkStatusAsync = async () => {
		const status = await BackgroundFetch.getStatusAsync();
		const isRegistered = await TaskManager.isTaskRegisteredAsync(
			BACKGROUND_FETCH_TASK,
		);
		setStatus(status);
		setIsRegistered(isRegistered);
	};

	const toggleFetchTask = async () => {
		if (isRegistered) {
			await unregisterBackgroundFetchAsync();
		} else {
			await registerBackgroundFetchAsync();
		}

		checkStatusAsync();
	};

	const toggle = () => {
		setActive(!isActive);
	};

	const stopSession = () => {
		//Lose 2 HP
		loseHP(2, getToken).then();
		//bring up pop up
		resetTimer(duration['Pomodoro']);
		setActive(false);
	};

	// 1. Define the task by providing a name and the function that should be executed
	// Note: This needs to be called in the global scope (e.g outside of your React components)
	TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
		try {
			const receivedNewData = Date.now();
			setRemainingSecs((remainingSecs) => remainingSecs - 1);
			setTimer(remainingSecs);
			if (remainingSecs == 0) {
				setRounds(rounds + 1);
				//play sound and bring up pop up
				if (rounds >= 1) {
					setBreak(true);
				}
				setActive(false);
				resetTimer(duration['Pomodoro']);
			}
			return receivedNewData
				? BackgroundFetch.Result.NewData
				: BackgroundFetch.Result.NoData;
		} catch (error) {
			return BackgroundFetch.Result.Failed;
		}
	});

	// 2. Register the task at some point in your app by providing the same name, and some configuration options for how the background fetch should behave
	// Note: This does NOT need to be in the global scope and CAN be used in your React components!
	async function registerBackgroundFetchAsync() {
		return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
			minimumInterval: 1 / 60, // TO INVESTIGATE: on docs this is seconds but when testing on android it is 1 minute
			stopOnTerminate: false, // android only,
			startOnBoot: true, // android only
		});
	}

	// 3. (Optional) Unregister tasks by specifying the task name
	// This will cancel any future background fetch calls that match the given name
	// Note: This does NOT need to be in the global scope and CAN be used in your React components!
	async function unregisterBackgroundFetchAsync() {
		if (mode != 'Pomodoro') {
			setMode('Pomodoro');
		} else {
			if (rounds >= 3 && rounds % 3 == 0) {
				gainXP(500);
			} else {
				gainXP(150);
			}
			updatePet();
		}
		return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
	}
	return (
		<SafeAreaView style={androidSafeAreaView().AndroidSafeArea}>
			<MenuHeader
				text={props.title}
				navigation={props.navigation}
				displayHp={true}
			/>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					flex: 3,
					paddingTop: 10,
				}}
			>
				<PomodoroMode
					mode='Pomodoro'
					modeSelected={mode}
					modeSelect={setMode}
					active={isActive}
					break={breakEnabled}
					setTimer={resetTimer}
					duration={duration}
				/>
				<PomodoroMode
					mode='Long Break'
					modeSelected={mode}
					modeSelect={setMode}
					active={isActive}
					break={breakEnabled}
					setTimer={resetTimer}
					duration={duration}
				/>
				<PomodoroMode
					mode='Short Break'
					modeSelected={mode}
					modeSelect={setMode}
					active={isActive}
					break={breakEnabled}
					setTimer={resetTimer}
					duration={duration}
				/>
			</View>
			<DisplayPet />
			<View
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flex: 8,
					marginBottom: 50,
				}}
			>
				{/* Background timer
			
				<Text>
					Background fetch status:{' '}
					<Text>
						{status && BackgroundFetch.BackgroundFetchStatus
							? status && BackgroundFetch.BackgroundFetchStatus[status]
							: ''}
					</Text>
				</Text>
				<Text>
					Background fetch task name:{' '}
					<Text>
						{isRegistered ? BACKGROUND_FETCH_TASK : 'Not registered yet!'}
					</Text>
				</Text>
				<Button
					title={
						isRegistered
							? 'Unregister BackgroundFetch task'
							: 'Register BackgroundFetch task'
					}
					onPress={toggleFetchTask}
				/> */}
				{/* <TouchableOpacity
					activeOpacity={0.6}
					style={{
						backgroundColor: colors.Tertiary,
						borderRadius: 30,
						padding: 10,
						paddingLeft: 40,
						paddingRight: 40,
						marginBottom: 20,
					}}
					onPress={() => stopSession()}
				>
					<Text
						style={{
							fontSize: 20,
							fontWeight: 'bold',
							paddingBottom: 5,
							color: colors.background,
						}}
					>
						Current Task
					</Text>
				</TouchableOpacity> */}
				{/* <TouchableOpacity
					activeOpacity={0.6}
					style={{
						backgroundColor: colors.Background,
						borderRadius: 30,
						borderColor: colors.Quaternary,
						padding: 10,
						borderWidth: 3,
						paddingLeft: 40,
						paddingRight: 40,
						marginBottom: 20,
					}}
					onPress={() => {
						props.navigation.navigate('PomodoroTasksScreen');
					}}
				>
					<Text
						style={{
							fontSize: 20,
							fontWeight: 'bold',
							color: colors.Quaternary,
						}}
					>
						Current Task
					</Text>
				</TouchableOpacity> */}

				<Text
					style={{
						fontSize: 60,
						fontWeight: 'bold',
						color: colors.Quaternary,
					}}
				>{`${mins}:${secs}`}</Text>

				{isActive ? (
					<TouchableOpacity
						activeOpacity={0.6}
						style={{
							backgroundColor: colors.Background,
							borderRadius: 30,
							borderColor: colors.Quaternary,
							padding: 10,
							borderWidth: 3,
							paddingLeft: 40,
							paddingRight: 40,
							marginBottom: 20,
						}}
						onPress={() => showCancel()}
					>
						<Text
							style={{
								fontSize: 20,
								fontWeight: 'bold',
								color: colors.Quaternary,
							}}
						>
							Stop Session
						</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						activeOpacity={0.6}
						style={{
							backgroundColor: colors.Quaternary,
							borderRadius: 30,
							padding: 10,
							paddingLeft: 40,
							paddingRight: 40,
							marginBottom: 20,
						}}
						onPress={() => showStartPopup()}
					>
						<Text
							style={{
								fontSize: 20,
								fontWeight: 'bold',
								color: colors.background,
							}}
						>
							Start
						</Text>
					</TouchableOpacity>
				)}
			</View>
			<PomodoroFinishPopup visible={finished} setVisible={setFinished} />
			<PomodoroStartPopup
				visible={start}
				setVisible={setStart}
				startFunction={toggle}
			/>
			<PomodoroCancelPopup
				visible={cancel}
				setVisible={setCancel}
				cancelFunction={stopSession}
			/>
		</SafeAreaView>
	);
}

export default PomodoroScreen;
