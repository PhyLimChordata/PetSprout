import React, { useState, useEffect, useContext } from 'react';
import { View, Image } from 'react-native';
import ExperienceBar from '../components/ExperienceBar';

import { useTheme } from '@react-navigation/native';
import { AuthContext } from '../Context';
import { LevelMapping } from '../resources/mappings/LevelMapping';

var totalXP = 0;
var lvlToEvolve = 0;

function gainXP(xp) {
	fetch('http://localhost:5000/api/v1.0.0/pets/gain_exp', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'authentication-token': getToken,
		},
		body: JSON.stringify({
			expValue: xp,
			totalExp: totalXP,
			levelToEvolveNext: lvlToEvolve,
		}),
	})
		.then((res) => res.json().then(() => {}))
		.catch();
}

export function DisplayPet(props) {
	const { colors } = useTheme();
	const [totalXPCap, setTotalXPCap] = useState(0);
	const [levelToEvolveNext, setLevelToEvolveNext] = useState(0);

	const [xpLevelCap, setXpLevelCap] = useState(0);
	const [experience, setExperience] = useState('');
	const [level, setLevel] = useState('');

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

	useEffect(() => {
		updatePet();
	}, [xpLevelCap, totalXPCap, experience, level, heartValue]);

	const { getToken, getRefreshing, changeRefreshing } = useContext(AuthContext);

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
					//TODO: DEEP CLONE
					let tempHeartValue = {
						size: heartSize,
						view: {
							position: 'absolute',
							height: heartSize,
							width: heartSize,
							marginTop: 0,
							overflow: 'hidden',
						},
						image: {
							height: heartSize,
							width: heartSize,
							bottom: 0,
							zIndex: 1,
						},
						value: 100,
					};
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
					totalXP = LevelMapping[petsLevel].totalXP;
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
			lvlToEvolve = -1;
		} else {
			setLevelToEvolveNext(level + 10 - (level % 10));
			lvlToEvolve = level + 10 - (level % 10);
		}
	};

	return (
		<View style={{ flex: 10 }}>
			<View
				style={{
					height: '100%',
					width: '100%',
					backgroundColor: colors.white,
					alignItems: 'center',
					justifyContent: 'center',
					marginBottom: 10,
				}}
			>
				<Image
					style={{
						width: '50%',
						height: '50%',
						resizeMode: 'contain',
						marginBottom: 5,
					}}
					source={require('../resources/animations/Egg.gif')}
				/>
				<ExperienceBar level={level} exp={experience} xpLevelCap={xpLevelCap} />
			</View>
		</View>
	);
}
