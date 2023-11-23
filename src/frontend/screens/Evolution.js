import React, { useRef, useState, useEffect, useContext } from 'react';
import {
	Animated,
	SafeAreaView,
	TouchableOpacity,
	Text,
	Image,
	Dimensions,
	View,
	Easing,
} from 'react-native';
import { EvolutionMapping } from '../resources/mappings/EvolutionMapping';
import { EvolutionTreeMapping } from '../resources/mappings/EvolutionTreeMapping';

import styles from '../styling/ComingSoon';
import MenuHeader from '../components/MenuHeader';

import { useTheme } from '@react-navigation/native';
import { AuthContext } from '../Context';

function Evolution(props) {
	const { getToken, changePet } = useContext(AuthContext);

	const { colors } = useTheme();
	let zoomValue = useRef(new Animated.Value(1)).current;
	let xValue = useRef(new Animated.Value(0)).current;
	let yValue = useRef(new Animated.Value(0)).current;
	let backgroundOpacity = useRef(new Animated.Value(0)).current;
	let petOpacity = useRef(new Animated.Value(1)).current;
	let evolveOpacity = useRef(new Animated.Value(0)).current;
	let spinValue = useRef(new Animated.Value(0)).current;

	const [evolutionNames, setEvolutionNames] = useState([]);
	const [buttonDisabled, setButtonDisabled] = useState(false);
	useEffect(() => {
		fetch('http://localhost:5000/api/v1.0.0/pets/get_current', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'authentication-token': getToken,
			},
		})
			.then((res) =>
				res.json().then((data) => {
					// console.log(data);
					setEvolutionNames(EvolutionTreeMapping[data.image]);
				}),
			)
			.catch();
	}, []);

	const height = Dimensions.get('window').height;
	const width = Dimensions.get('window').width;
	const [showColor, setShowColor] = useState(false);
	const [selected, setSelected] = useState(null);
	const [coords, setCoords] = useState([0, 0]);
	const handleAnimation = (x, y, id, x2, y2) => {
		setCoords([x2, y2]);
		Animated.timing(zoomValue, {
			toValue: 2,
			duration: 2000,
			useNativeDriver: true,
		}).start();
		setSelected(id);
		Animated.timing(xValue, {
			toValue: x,
			duration: 2000,
			useNativeDriver: true,
		}).start();
		Animated.timing(yValue, {
			toValue: y,
			duration: 2000,
			useNativeDriver: true,
		}).start();
		Animated.timing(backgroundOpacity, {
			toValue: 1,
			duration: 2000,
			useNativeDriver: true,
		}).start();
		Animated.timing(petOpacity, {
			toValue: 0.3,
			duration: 2000,
			useNativeDriver: true,
		}).start();
	};
	const resetSelect = () => {
		Animated.timing(zoomValue, {
			toValue: 1,
			duration: 2000,
			useNativeDriver: true,
		}).start();
		Animated.timing(xValue, {
			toValue: 0,
			duration: 2000,
			useNativeDriver: true,
		}).start();
		Animated.timing(yValue, {
			toValue: 0,
			duration: 2000,
			useNativeDriver: true,
		}).start();
		Animated.timing(petOpacity, {
			toValue: 1,
			duration: 2000,
			useNativeDriver: true,
		}).start();
		Animated.timing(backgroundOpacity, {
			toValue: 0,
			duration: 2000,
			useNativeDriver: true,
		}).start(() => setSelected(null));
	};
	const evolve = () => {
		Animated.timing(evolveOpacity, {
			toValue: 1,
			duration: 4000,
			useNativeDriver: true,
		}).start();
		Animated.timing(petOpacity, {
			toValue: 0,
			duration: 1000,
			useNativeDriver: true,
		}).start();
		Animated.timing(spinValue, {
			toValue: 1,
			duration: 4000,
			useNativeDriver: true,
		}).start(() => setButtonDisabled(false));
		setButtonDisabled(true);
		setShowColor(true);
		console.log(evolutionNames[selected]);
		fetch('http://localhost:5000/api/v1.0.0/pets/evolve', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'authentication-token': getToken,
			},
			body: JSON.stringify({ name: evolutionNames[selected] }),
		})
			.then((res) =>
				res.json().then((data) => {
					changePet(data.image)
				}),
			)
			.catch();
	};

	const spin = spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '3600deg'],
	});

	function Button(props) {
		const { colors } = useTheme();
		return (
			<TouchableOpacity
				onPress={props.onPress}
				disabled={props.disabled}
				style={{
					height: 50,
					width: 175,
					marginTop: 20,
					backgroundColor: colors.Quaternary,
					justifyContent: 'center',
					alignItems: 'center',
					borderRadius: 20,
					marginHorizontal: 10,
				}}
			>
				<Text
					style={{
						fontSize: 20,
						fontWeight: 'bold',
						color: colors.background,
					}}
				>
					{' '}
					{props.text}{' '}
				</Text>
			</TouchableOpacity>
		);
	}

	return (
		<>
			<SafeAreaView style={[styles(colors).headContainer]}>
				<MenuHeader
					hideRight={true}
					text={'Evolution'}
					navigation={props.navigation}
				/>
				<TouchableOpacity
					disabled={selected != null}
					style={{
						position: 'absolute',
						top: height * 0.2,
						left: width * 0.35,
					}}
					onPress={() =>
						handleAnimation(0, height * 0.1, 0, height * 0.2, width * 0.35)
					}
				>
					<Animated.Image
						style={[
							{
								resizeMode: 'contain',
								height: 150,
								width: 150,
								tintColor: 'black',
							},
							selected == 0
								? {
										transform: [
											{ scale: zoomValue },
											{ translateX: xValue },
											{ translateY: yValue },
											{ rotate: spin },
										],
										resizeMode: 'contain',
								  }
								: selected != null && { opacity: petOpacity },
						]}
						source={EvolutionMapping[evolutionNames[0]]}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					disabled={selected != null}
					style={{
						position: 'absolute',
						top: height * 0.5,
						left: width * 0.05,
					}}
					onPress={() =>
						handleAnimation(
							width * 0.15,
							height * -0.05,
							1,
							height * 0.5,
							width * 0.05,
						)
					}
				>
					<Animated.Image
						style={[
							{
								resizeMode: 'contain',
								height: 150,
								width: 150,
								tintColor: 'black',
							},
							selected == 1
								? {
										transform: [
											{ scale: zoomValue },
											{ translateX: xValue },
											{ translateY: yValue },
											{ rotate: spin },
										],
										resizeMode: 'contain',
								  }
								: selected != null && { opacity: petOpacity },
						]}
						source={EvolutionMapping[evolutionNames[1]]}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					disabled={selected != null}
					style={{ position: 'absolute', top: height * 0.5, left: width * 0.6 }}
					onPress={() =>
						handleAnimation(
							width * -0.13,
							height * -0.05,
							2,
							height * 0.5,
							width * 0.6,
						)
					}
				>
					<Animated.Image
						style={[
							{
								resizeMode: 'contain',
								height: 150,
								width: 150,
								tintColor: 'black',
							},
							selected == 2
								? {
										transform: [
											{ scale: zoomValue },
											{ translateX: xValue },
											{ translateY: yValue },
											{ rotate: spin },
										],
										resizeMode: 'stretch',
										zIndex: 1,
								  }
								: selected != null && { opacity: petOpacity },
						]}
						source={EvolutionMapping[evolutionNames[2]]}
					/>
				</TouchableOpacity>
				{selected != null && (
					<Animated.View
						style={{
							opacity: backgroundOpacity,
							top: '70%',
							alignItems: 'center',
						}}
					>
						{!showColor ? (
							<>
								<Button
									text='EVOLVE'
									disabled={buttonDisabled}
									onPress={() => evolve()}
								></Button>
								<Button
									text='CANCEL'
									disabled={buttonDisabled}
									onPress={() => resetSelect()}
								></Button>
							</>
						) : (
							<Button
								text='CONTINUE'
								disabled={buttonDisabled}
								onPress={() => props.navigation.navigate('Habit')}
							></Button>
						)}
					</Animated.View>
				)}
				{showColor && (
					<View
						style={{
							position: 'absolute',
							top: coords[0],
							left: coords[1],
						}}
					>
						<Animated.Image
							style={{
								resizeMode: 'contain',
								height: 150,
								width: 150,
								opacity: evolveOpacity,
								transform: [
									{ scale: zoomValue },
									{ translateX: xValue },
									{ translateY: yValue },
									{ rotate: spin },
								],
							}}
							source={EvolutionMapping[evolutionNames[selected]]}
						/>
					</View>
				)}
			</SafeAreaView>
			<Animated.View
				style={{
					height: '100%',
					width: '100%',
					backgroundColor: 'rgba(0,0,0,0.3)',
					opacity: backgroundOpacity,
					position: 'absolute',
					zIndex: -1,
				}}
			/>
		</>
	);
}

export default Evolution;
