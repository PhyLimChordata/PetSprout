import React, { useRef } from 'react';
import { View, Animated, TouchableOpacity, Image } from 'react-native';

import Swipeable from 'react-native-gesture-handler/Swipeable';

import { useTheme } from '@react-navigation/native';
import Colours from '../resources/themes/Colours';

import styles from '../styling/Habits';

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
					backgroundColor: Colours.Red.Delete,
					borderRadius: 8,
					height: '100%',
					width: '100%',
					justifyContent: 'center',
					alignItems: 'flex-start',
					padding: 20,
				}}>
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
					backgroundColor: Colours.Blue.Confirm,
					borderRadius: 8,
					height: '100%',
					width: '100%',
					justifyContent: 'center',
					alignItems: 'flex-end',
					padding: 20,
				}}>
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
				rightThreshold={80}>
				{props.content}
			</Swipeable>
		);
	}
	return <View>{props.content}</View>;
}

function Checkmark(props) {
	const { colors } = useTheme();
	return (
		<TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
			<Image
				style={styles(colors).swipeIcon}
				source={require('../resources/images/Checkmark.png')}
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
				resizeMode={'contain'}
				source={require('../resources/images/Trash.png')}
			/>
		</TouchableOpacity>
	);
}

export default ScrollViewElement;
