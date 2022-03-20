import React, { useRef, useState, useEffect } from 'react';
import { View, Animated, TouchableOpacity, Image, ProgressViewIOSComponent } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import styles from '../styling/Habits';

import Colours from '../resources/themes/Colours';
import { useTheme } from '@react-navigation/native';

/*
For swiping for undo button

- just try to check if the user has clicked or not after three seconds
- change right() function
- look at Habits.js component
- disableCompletionTemp has to be changed
- https://reactnative.dev/docs/timers

*/

function ScrollViewElement(props) {
	const swipeableRef = useRef(props.swipe);
	const leftSwipe = (progress, dragX) => {
		const scale = dragX.interpolate({
			inputRange: [0, 100],
			outputRange: [0, 1],
			extrapolate: 'clamp',
		});
		let left = () => {
			props.leftFunction();
			swipeableRef.current.close();
			// if (props.leftClose && swipeableRef.current != null)
			// 	swipeableRef.current.close();
		};

		return (
			<View
				style={{
					backgroundColor: Colours.Red.Error,
					borderRadius: 8,
					height: '100%',
					width: '100%',
					justifyContent: 'center',
					alignItems: 'flex-start',
					padding: 20,
				}}
			>
				<Animated.View style={{ transform: [{ scale }] }}>
					<Trash onPress={left} />
				</Animated.View>
			</View>
		);
	};
	const [undo, setUndo] = useState(false);
	const undoRef = useRef(undo);

	useEffect(() => {
		undoRef.current = undo;
	}, [undo]);
	let right = () => {
		let undoTimer = setTimeout(() => {
			if (!undoRef.current) {
				props.rightFunction();
			}
			swipeableRef.current.close();
			setUndo(false);
		}, 3000);

		// call timer
		undoTimer;
	};

	const rightSwipe = (progress, dragX) => {
		const scale = dragX.interpolate({
			inputRange: [-100, 0],
			outputRange: [1, 0],
			extrapolate: 'clamp',
		});
		
		return (
			<View
				style={{
					backgroundColor: Colours.Blue.Confirm,
					borderRadius: 8,
					height: '100%',
					width: '100%',
					justifyContent: 'center',
					alignItems: 'flex-end',
					padding: 20,
				}}
			>
				<Animated.View style={{ transform: [{ scale }] }}>
					<Undo onPress={() => {
						setUndo(true);
						swipeableRef.current.close();
					}}/>
				</Animated.View>
			</View>
		);
	};

	if (props.leftFunction != undefined && props.rightFunction != undefined) {
		return (
			<Swipeable
				ref={swipeableRef}
				renderLeftActions={leftSwipe}
				renderRightActions={rightSwipe}
				leftThreshold={80}
				rightThreshold={80}

				// onSwipeableLeftOpen={props.leftFunction}
				
			>
				{props.content}
			</Swipeable>
		);
	} else if (props.leftFunction != undefined) {
		return (
			<Swipeable
				ref={swipeableRef}
				renderLeftActions={leftSwipe}
				leftThreshold={80}
				// onSwipeableLeftOpen={props.leftFunction}
				
			>
				{props.content}
			</Swipeable>
		);
	} else if (props.rightFunction != undefined) {
		return (
			<Swipeable
				ref={swipeableRef}
				renderRightActions={rightSwipe}
				rightThreshold={80}
				onSwipeableOpen={right}
				onSwipeableClose={() => {
					setUndo(true);
				}}
			>
				{props.content}
			</Swipeable>
		);
	}
	return <View>{props.content}</View>;
}

function Undo(props) {
	const { colors } = useTheme();
	return (
		<TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
			<Image
				style={styles(colors).swipeIcon}
				source={require('../resources/images/BackButton.png')}
			/>
		</TouchableOpacity>
	);
}

function Trash(props) {
	const { colors } = useTheme();
	return (
		<TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
			<Image
				style={styles(colors).swipeIcon}
				source={require('../resources/images/Trash.png')}
			/>
		</TouchableOpacity>
	);
}

export default ScrollViewElement;
