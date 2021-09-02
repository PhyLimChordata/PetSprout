import React, { useState, useRef } from 'react';
import { View, Text, Image, Animated, TouchableOpacity } from 'react-native';

import Checkmark from '../components/Checkmark';
import Trash from '../components/Trash';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import ColorSet from '../resources/global/themes';

import styles from '../styling/Habits';
import Ellipsis from './Ellipsis';

function Capitalize(str) {
	if (str != null) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	return '';
}

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
					backgroundColor: ColorSet.Red.Tertiary,
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

	const rightSwipe = (progress, dragX) => {
		const scale = dragX.interpolate({
			inputRange: [-100, 0],
			outputRange: [1, 0],
			extrapolate: 'clamp',
		});
		let right = () => {
			props.rightFunction();
			swipeableRef.current.close();
			// if (props.rightClose && swipeableRef.current != null)
			// 	swipeableRef.current.close()
		};
		return (
			<View
				style={{
					backgroundColor: ColorSet.Blue.Tertiary,
					borderRadius: 8,
					height: '100%',
					width: '100%',
					justifyContent: 'center',
					alignItems: 'flex-end',
					padding: 20,
				}}
			>
				<Animated.View style={{ transform: [{ scale }] }}>
					<Checkmark onPress={right} />
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
				// onSwipeableRightOpen={props.rightFunction}
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
			>
				{props.content}
			</Swipeable>
		);
	}
	return <View>{props.content}</View>;
}

export default ScrollViewElement;
