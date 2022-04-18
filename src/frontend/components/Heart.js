import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import Colours from '../resources/themes/Colours';
import { getHP } from './DisplayPet';
import { AuthContext } from '../Context';

export default function Heart(props) {
	//TODO: get rid of this and use heartsize from displaypet
	var heartSize = 70;
	const [hp, setHp] = useState(getHP);

	const { getToken, getRefreshing, changeRefreshing } = useContext(AuthContext);

	const [displayed, setDisplayed] = useState(false);

	useEffect(() => {
		if (!displayed) {
			setHp(getHP);
			setDisplayed(true);
		}
	});

	useEffect(() => {
		if (getRefreshing) {
			setHp(getHP);
		}
	}, [getRefreshing]);

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
				{hp.value}
			</Text>
			<Image
				style={{ height: heartSize, width: heartSize, zIndex: 0 }}
				source={require('../resources/images/DeadHeart.png')}
			/>
			<View style={hp.view}>
				<Image
					style={hp.image}
					source={require('../resources/images/Heart.png')}
				/>
			</View>
		</View>
	);
}
