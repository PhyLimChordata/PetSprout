import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import Colours from '../resources/themes/Colours';
import { getHP } from './DisplayPet';
import { AuthContext } from '../Context';

const heartSize = 70;
//THIS CAN VARY BASED ON USER's PET
const maxHealth = 100;
const _ = require('lodash');

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

export default function Heart(props) {
	//TODO: get rid of this and use heartsize from displaypet

	const [heart, setHeart] = useState(hp)
	const [health, setHealth] = useState(100)

	const { getToken, getRefreshing, changeRefreshing } = useContext(AuthContext);

	const [displayed, setDisplayed] = useState(false);

	useEffect(() => {
		if (!displayed) {
			updateHealth();
		}
	});

	useEffect(() => {
		if (getRefreshing) {
			updateHealth();
		}
	}, [getRefreshing]);

	const updateHealth = () => {
		fetch('http://3.15.57.200:5000/api/v1.0.0/pets/get_current', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'authentication-token': getToken,
			},
		})
			.then((res) =>
				res.json().then((currentPet) => {
					setDisplayed(true);
					setHealth(currentPet.hp);
					let tempHeartValue = _.cloneDeep(hp);

					tempHeartValue.view.height = currentPet.hp * (heartSize / maxHealth);
					tempHeartValue.view.marginTop =
						heartSize - tempHeartValue.view.height;
					tempHeartValue.image.bottom = tempHeartValue.view.marginTop;
					tempHeartValue.value = Math.ceil(
						tempHeartValue.view.height * (maxHealth / heartSize),
					);
					hp = _.cloneDeep(tempHeartValue);
					setHeart(hp);
					//console.log(hp)
					//console.log(currentPet);
					console.log(hp.value + "hi");
					changeRefreshing(false);
				}),
			)
			.catch();
	};

	return (
		<View
			style={{
				height: heartSize,
				width: heartSize,
				textAlign: 'center',
				alignItems: 'center',
				textAlignVertical: 'center',
			}}
		>
			<Text
				style={{
					position: 'absolute',
					top: '30%',
					color: Colours.Red.HeartValue,
					fontSize: 20,
					fontWeight: 'bold',
					zIndex: 2,
				}}
			>
				{health}
			</Text>
			<Image
				style={{ height: heartSize, width: heartSize, zIndex: 0 }}
				source={require('../resources/images/DeadHeart.png')}
			/>
			<View style={heart.view}>
				<Image
					style={heart.image}
					source={require('../resources/images/Heart.png')}
				/>
			</View>
		</View>
	);
}
