import React, { useState, useEffect, useContext } from 'react';
import {
	View,
	Image,
	SafeAreaView,
	Text,
	RefreshControl,
	TouchableOpacity,
	TextInput,
	Button,
} from 'react-native';

import MenuHeader from '../components/MenuHeader';

import ExperienceBar from '../components/ExperienceBar';

import { useTheme } from '@react-navigation/native';
import PomodoroMode from '../components/PomodoroMode';
import { AuthContext } from '../Context';

import { LevelMapping } from '../resources/mappings/LevelMapping';

import * as BackgroundFetch from 'expo-background-fetch';

import * as TaskManager from 'expo-task-manager';

import { DisplayPet } from '../components/DisplayPet';

const BACKGROUND_FETCH_TASK = 'background-fetch';

function PomodoroScreen(props) {
	const [isRegistered, setIsRegistered] = React.useState(false);
	const [status, setStatus] = React.useState(null);

	const { colors } = useTheme();

	const duration = { Pomodoro: 60, 'Long Break': 2, 'Short Break': 2 };

	const [remainingSecs, setRemainingSecs] = useState(duration['Pomodoro']);
	const [isActive, setActive] = useState(false);

	const [breakEnabled, setBreak] = useState(false);
	const [rounds, setRounds] = useState(0);

	const [mode, setMode] = useState('Pomodoro');

	const [xpLevelCap, setXpLevelCap] = useState(0);
	const [totalXPCap, setTotalXPCap] = useState(0);

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
					if (rounds >= 2) {
						setBreak(true);
					}
					setActive(false);
					resetTimer(duration[mode]);
				}
			}, 1000);
		} else if (!isActive && remainingSecs !== 0) {
			clearInterval(interval);
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
		}
		return () => clearInterval(interval);
	}, [isActive, remainingSecs]);

	const heartSize = 70;
	//THIS CAN VARY BASED ON USER's PET
	const maxHealth = 100;
	const [heartValue, setHeartValue] = useState({
		size: heartSize,
		view: {
			position: 'absolute',
			height: heartSize,
			width: heartSize,
			marginTop: 0,
			overflow: 'hidden',
		},
		image: { height: heartSize, width: heartSize, bottom: 0, zIndex: 1 },
		value: 100,
	});

	const [level, setLevel] = useState('');

	const { getToken, getRefreshing, changeRefreshing } = useContext(AuthContext);

	const [experience, setExperience] = useState('');

	const [displayed, setDisplayed] = useState(false);

	useEffect(() => {
		if (!displayed) updatePet();
	});

	useEffect(() => {
		checkStatusAsync();
		console.log('Checking async');
	}, []);

	const checkStatusAsync = async () => {
		const status = await BackgroundFetch.getStatusAsync();
		const isRegistered = await TaskManager.isTaskRegisteredAsync(
			BACKGROUND_FETCH_TASK,
		);
		setStatus(status);
		setIsRegistered(isRegistered);
	};

	const toggleFetchTask = async () => {
		console.log('its working');
		if (isRegistered) {
			await unregisterBackgroundFetchAsync();
		} else {
			await registerBackgroundFetchAsync();
		}

		checkStatusAsync();
	};

	const [levelToEvolveNext, setLevelToEvolveNext] = useState(0);

	const gainXP = (xp) => {
		fetch('http://localhost:5000/api/v1.0.0/pets/gain_exp', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'authentication-token': getToken,
			},
			body: JSON.stringify({
				expValue: xp,
				totalExp: totalXPCap,
				levelToEvolveNext: levelToEvolveNext,
			}),
		})
			.then((res) => res.json().then(() => {}))
			.catch();
	};

	const updatePet = () => {
		fetch('http://localhost:5000/api/v1.0.0/pets/get_current', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'authentication-token': getToken,
			},
		})
			.then((res) =>
				res.json().then((currentPet) => {
					setDisplayed(true);
					let tempHeartValue = heartValue;
					tempHeartValue.view.height = currentPet.hp * (heartSize / maxHealth);
					tempHeartValue.view.marginTop =
						heartSize - tempHeartValue.view.height;
					tempHeartValue.image.bottom = tempHeartValue.view.marginTop;
					tempHeartValue.value = Math.ceil(
						tempHeartValue.view.height * (maxHealth / heartSize),
					);

					setHeartValue(tempHeartValue);

					if (currentPet.readyToEvolve) {
						//set some visibility
					}

					if (currentPet.readyToHatch) {
						//set some visibility
					}

					const petsLevel = currentPet.level;
					setLevel(currentPet.level);
					setNextLevelToEvolve();
					setTotalXPCap(LevelMapping[petsLevel].totalXP);

					//Cap for exp bar
					setXpLevelCap(LevelMapping[petsLevel].xpLevelCap);

					if (petsLevel == 0) {
						setExperience(currentPet.expValue);
					} else {
						let previousLevel = petsLevel - 1;
						var previousTotalXPCap = LevelMapping[previousLevel].totalXP;
						setExperience(currentPet.expValue - previousTotalXPCap);
					}
				}),
			)
			.catch();
	};

	const setNextLevelToEvolve = () => {
		if (level == 40) {
			setLevelToEvolveNext(-1);
		} else {
			setLevelToEvolveNext(level + 10 - (level % 10));
		}
	};

	const toggle = () => {
		setActive(!isActive);
	};

	const stopSession = () => {
		//bring up pop up
		setRemainingSecs(900);
		setMins(formatNumber(15));
		setSecs(formatNumber(0));
		setActive(false);
	};

	// 1. Define the task by providing a name and the function that should be executed
	// Note: This needs to be called in the global scope (e.g outside of your React components)
	TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
		try {
			const receivedNewData = Date.now();
			console.log('tick');
			setRemainingSecs((remainingSecs) => remainingSecs - 1);
			setTimer(remainingSecs);
			if (remainingSecs == 0) {
				setRounds(rounds + 1);
				//play sound and bring up pop up
				if (rounds >= 2) {
					setBreak(true);
				}
				setActive(false);
				resetTimer(duration[mode]);
			}
			return receivedNewData
				? BackgroundFetch.Result.NewData
				: BackgroundFetch.Result.NoData;
		} catch (error) {
			console.log(error);
			return BackgroundFetch.Result.Failed;
		}
	});

	// 2. Register the task at some point in your app by providing the same name, and some configuration options for how the background fetch should behave
	// Note: This does NOT need to be in the global scope and CAN be used in your React components!
	async function registerBackgroundFetchAsync() {
		console.log('its workingReg');

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
		console.log('its workingUnreg');
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
		<SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
			<MenuHeader
				text={props.title}
				navigation={props.navigation}
				hp={heartValue}
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
				/>
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
				<TextInput
					style={{
						backgroundColor: colors.Tertiary,
						borderRadius: 30,
						padding: 10,
						paddingLeft: 40,
						paddingRight: 40,
						marginBottom: 20,
						color: 'white',
						fontSize: 20,
						fontWeight: 'bold',
					}}
				>
					Current Task
				</TextInput>
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
						onPress={() => stopSession()}
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
						onPress={() => toggle()}
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
		</SafeAreaView>
	);
}

export default PomodoroScreen;
