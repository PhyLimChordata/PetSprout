import React, { useState } from 'react';
import { View, Text, Image, Animated, TouchableOpacity } from 'react-native';

import Checkmark from '../components/Checkmark';
import Trash from '../components/Trash';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import ColorSet from '../resources/themes/Global';

import styles from '../styling/Habits';
import Ellipsis from './Ellipsis';

function Capitalize(str) {
	if (str != null) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	return '';
}

function ScrollViewElement(props) {
	if (props.leftFunction != undefined && props.rightFunction != undefined) {
		return (
			<Swipeable
				renderLeftActions={props.leftSwipe}
				renderRightActions={props.rightSwipe}
				onSwipeableLeftOpen={props.leftFunction}
				onSwipeableRightOpen={props.rightFunction}
			>
				<View style={styles.horizontalContainer}>
					<View style={styles.leftContainer}>
						<Text style={styles.textTitle}>{Capitalize(props.text)}</Text>
					</View>
					<View style={styles.container}>
						<Ellipsis />
					</View>
				</View>
			</Swipeable>
		);
	} else if (props.leftFunction != undefined) {
		return (
			<Swipeable
				renderLeftActions={props.leftSwipe}
				onSwipeableLeftOpen={props.leftFunction}
			>
				<View style={styles.horizontalContainer}>
					<View style={styles.leftContainer}>
						<Text style={styles.textTitle}>{Capitalize(props.text)}</Text>
					</View>
					<View style={styles.container}>
						<Ellipsis />
					</View>
				</View>
			</Swipeable>
		);
	} else if (props.rightFunction != undefined) {
		return (
			<Swipeable
				renderRightActions={props.rightSwipe}
				onSwipeableRightOpen={props.rightFunction}
			>
				<View style={styles.horizontalContainer}>
					<View style={styles.leftContainer}>
						<Text style={styles.textTitle}>{Capitalize(props.text)}</Text>
					</View>
					<View style={styles.container}>
						<Ellipsis />
					</View>
				</View>
			</Swipeable>
		);
	}
	return (
		<View style={styles.horizontalContainer}>
			<View style={styles.leftContainer}>
				<Text style={styles.textTitle}>{Capitalize(props.text)}</Text>
			</View>
			<View style={styles.container}>
				<Ellipsis />
			</View>
		</View>
	);
}

export default ScrollViewElement;
