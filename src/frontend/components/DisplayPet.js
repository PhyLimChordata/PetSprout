import React, { useState, useEffect, useContext } from 'react';
import { View, Image } from 'react-native';
import ExperienceBar from '../components/ExperienceBar';

import { useTheme } from '@react-navigation/native';
import { AuthContext } from '../Context';
import { LevelMapping } from '../resources/mappings/LevelMapping';
import { getImage } from '../resources/images/Pets/ImageMapping';
import EvolutionPopup from './EvolutionPopup';
import FaintingPopup from './FaintingPopup'

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
		}),
	})
		.then((res) => res.json().then(() => {}))
		.catch();
}

export function DisplayPet(props) {
	const { colors } = useTheme();

	const [xpLevelCap, setXpLevelCap] = useState(0);
	const [experience, setExperience] = useState('');
	const [level, setLevel] = useState('');
	const [displayed, setDisplayed] = useState(false);
	const [evolutionVisible, setEvolutionVisible] = useState(false);
	const [faintVisible, setFaintVisible] = useState(false);

	const [isEgg, setIsEgg] = useState(true);

	useEffect(() => {
		if (!displayed) {
			updatePet();
		}
	});

	const { getToken, getRefreshing, getPet, getColor } = useContext(AuthContext);
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
					console.log(hp)
					console.log(currentPet);
					if (currentPet.hp === 0) {
						setFaintVisible(true)
					} else if (currentPet.readyToEvolve) {
						setIsEgg(currentPet.image == 'egg');
						setEvolutionVisible(true);
					}

					const petsLevel = currentPet.level;
					console.log(petsLevel)
					const petsLevelStr = petsLevel.toString();
					setLevel(currentPet.level);
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

	return (
		<>
				<View
					style={{
						width: '100%',
						backgroundColor: "#FFFFFF",
						alignItems: 'center',
						justifyContent: 'center',
						marginBottom: 0,
					}}
				>
					<Image
						style={{
							height: 150,
							resizeMode: 'contain',
							marginBottom: 5,
						}}
						source={getImage(getPet, 'Happy', getColor)}
					/>
					<ExperienceBar
						level={level}
						exp={experience}
						xpLevelCap={xpLevelCap}
					/>
				</View>
			<EvolutionPopup
				visible={evolutionVisible}
				setVisible={setEvolutionVisible}
				isEgg={isEgg}
				navigation={props.navigation}
			/>
			<FaintingPopup
				visible={faintVisible}
				setVisible={setFaintVisible}
			/>
		</>
	);
}
