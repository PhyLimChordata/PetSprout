import React, { useState, useEffect, useContext } from 'react';
import {View, Image, SafeAreaView} from 'react-native';
import ExperienceBar from '../components/ExperienceBar';

import { useTheme } from '@react-navigation/native';
import { AuthContext } from '../Context';
import { LevelMapping } from '../resources/mappings/LevelMapping';
import EvolutionPopup from "./EvolutionPopup";

var totalXP = 0;
var lvlToEvolve = 0;
const heartSize = 70;
//THIS CAN VARY BASED ON USER's PET
const maxHealth = 100;
var hp = {
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
};
const _ = require('lodash');

export function getHP() {
	return hp;
}

export async function gainXP(xp, token) {
	await fetch('http://localhost:5000/api/v1.0.0/pets/gain_exp', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'authentication-token': token,
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
	const [totalXPCap, setTotalXPCap] = useState(_.cloneDeep(totalXP));
	const [levelToEvolveNext, setLevelToEvolveNext] = useState(
		_.cloneDeep(lvlToEvolve),
	);

	const [xpLevelCap, setXpLevelCap] = useState(0);
	const [experience, setExperience] = useState('');
	const [level, setLevel] = useState('');
	const [displayed, setDisplayed] = useState(false);
	const [refreshing, setRefreshing] = React.useState(false);
	const [evolutionVisible, setEvolutionVisible] = useState(true);
	const [isEgg, setIsEgg] = useState(true);

	useEffect(() => {
		if (!displayed) {
			updatePet();
		}
	});

	const { getToken, getRefreshing, getPet } = useContext(AuthContext);

	useEffect(() => {
		if (getRefreshing) {
			updatePet();
		}
	}, [getRefreshing]);

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
					let tempHeartValue = _.cloneDeep(hp);
					tempHeartValue.view.height = currentPet.hp * (heartSize / maxHealth);
					tempHeartValue.view.marginTop =
						heartSize - tempHeartValue.view.height;
					tempHeartValue.image.bottom = tempHeartValue.view.marginTop;
					tempHeartValue.value = Math.ceil(
						tempHeartValue.view.height * (maxHealth / heartSize),
					);
					hp = _.cloneDeep(tempHeartValue);
					console.log(currentPet)

					if (currentPet.readyToEvolve) {
						setIsEgg(currentPet.image == 'egg')
						setEvolutionVisible(true)
					}

					const petsLevel = currentPet.level;
					const petsLevelStr = petsLevel.toString();
					setLevel(currentPet.level);
					setNextLevelToEvolve();
					setTotalXPCap(LevelMapping[petsLevelStr].totalXP);
					totalXP = LevelMapping[petsLevelStr].totalXP;
					//Cap for exp bar
					setXpLevelCap(LevelMapping[petsLevelStr].xpLevelCap);
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
		<>
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
						source={getPet}
					/>
					<ExperienceBar level={level} exp={experience} xpLevelCap={xpLevelCap} />
				</View>
			</View>
			<EvolutionPopup
				visible={evolutionVisible}
				setVisible={setEvolutionVisible}
				isEgg={isEgg}
				navigation={props.navigation}
			/>
		</>
	);
}
