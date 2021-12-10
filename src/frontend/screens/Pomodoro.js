import React, { useState, useEffect, useContext } from 'react';
import {
	View,
	Image,
	SafeAreaView,
	Text,
	RefreshControl,
	TouchableOpacity,
	TextInput,
} from 'react-native';

import MenuHeader from '../components/MenuHeader';

import ExperienceBar from '../components/ExperienceBar';

import { useTheme } from '@react-navigation/native';
import PomodoroMode from '../components/PomodoroMode';
import { AuthContext } from '../Context';

const levelMapping = {
	0: { xpLevelCap: 100, totalXP: 100 },
	1: { xpLevelCap: 400, totalXP: 500 },
	2: { xpLevelCap: 725, totalXP: 1225 },
	3: { xpLevelCap: 950, totalXP: 2175 },
	4: { xpLevelCap: 1175, totalXP: 3350 },
	5: { xpLevelCap: 1400, totalXP: 4750 },
	6: { xpLevelCap: 1625, totalXP: 6375 },
	7: { xpLevelCap: 1850, totalXP: 8225 },
	8: { xpLevelCap: 2075, totalXP: 10300 },
	9: { xpLevelCap: 2300, totalXP: 12600 },
	10: { xpLevelCap: 2525, totalXP: 15125 },
	11: { xpLevelCap: 2575, totalXP: 17700 },
	12: { xpLevelCap: 2625, totalXP: 20325 },
	13: { xpLevelCap: 2675, totalXP: 23000 },
	14: { xpLevelCap: 2725, totalXP: 25725 },
	15: { xpLevelCap: 2775, totalXP: 28500 },
	16: { xpLevelCap: 2825, totalXP: 31325 },
	17: { xpLevelCap: 2875, totalXP: 34200 },
	18: { xpLevelCap: 2925, totalXP: 37125 },
	19: { xpLevelCap: 2975, totalXP: 40100 },
	20: { xpLevelCap: 3025, totalXP: 43125 },
	21: { xpLevelCap: 3100, totalXP: 46225 },
	22: { xpLevelCap: 3150, totalXP: 49375 },
	23: { xpLevelCap: 3200, totalXP: 52575 },
	24: { xpLevelCap: 3250, totalXP: 55825 },
	25: { xpLevelCap: 3300, totalXP: 59125 },
	26: { xpLevelCap: 3350, totalXP: 62475 },
	27: { xpLevelCap: 3400, totalXP: 65875 },
	28: { xpLevelCap: 3450, totalXP: 69325 },
	29: { xpLevelCap: 3500, totalXP: 72825 },
	30: { xpLevelCap: 3550, totalXP: 76375 },
	31: { xpLevelCap: 3600, totalXP: 79975 },
	32: { xpLevelCap: 3650, totalXP: 83625 },
	33: { xpLevelCap: 3700, totalXP: 87325 },
	34: { xpLevelCap: 3750, totalXP: 91075 },
	35: { xpLevelCap: 3800, totalXP: 94875 },
	36: { xpLevelCap: 3850, totalXP: 98725 },
	37: { xpLevelCap: 3900, totalXP: 102625 },
	38: { xpLevelCap: 3950, totalXP: 106575 },
	39: { xpLevelCap: 4000, totalXP: 110575 },
	40: { xpLevelCap: 4050, totalXP: 114625 },
};

function PomodoroScreen(props) {
	const { colors } = useTheme();

	const duration = { Pomodoro: 2, 'Long Break': 2, 'Short Break': 2 };

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
					setTotalXPCap(levelMapping[petsLevel].totalXP);

					//Cap for exp bar
					setXpLevelCap(levelMapping[petsLevel].xpLevelCap);

					if (petsLevel == 0) {
						setExperience(currentPet.expValue);
					} else {
						let previousLevel = petsLevel - 1;
						var previousTotalXPCap = levelMapping[previousLevel].totalXP;
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
			<View
				style={{
					flex: 10,
					backgroundColor: colors.white,
					alignItems: 'center',
					justifyContent: 'center',
					marginBottom: 10,
				}}
			>
				<Image
					style={{
						width: '40%',
						height: '40%',
						resizeMode: 'contain',
						marginBottom: 5,
					}}
					source={require('../resources/animations/Egg.gif')}
				/>
				<ExperienceBar level={level} exp={experience} xpLevelCap={xpLevelCap} />
			</View>

			<View
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flex: 8,
					marginBottom: 50,
				}}
			>
				{/* <TouchableOpacity
				<TouchableOpacity
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
