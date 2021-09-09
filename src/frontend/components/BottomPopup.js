import React, { useRef, useImperativeHandle } from 'react';
import { Text, Animated } from 'react-native';
import Colours from '../resources/themes/Colours';

import { useTheme } from '@react-navigation/native';

const BottomPopup = React.forwardRef((props, ref) => {
	let showPopup = useRef(new Animated.Value(100)).current;
	const { colors } = useTheme();
	const { text, color = Colours.Red.Error } = props;

	useImperativeHandle(ref, () => ({
		togglePopup() {
			Animated.spring(showPopup, {
				toValue: 30,
				useNativeDriver: true,
			}).start(() =>
				setTimeout(() => {
					Animated.spring(showPopup, {
						toValue: 100,
						useNativeDriver: true,
					}).start();
				}, 1000)
			);
		},
	}));

	return (
		<Animated.View
			style={{
				transform: [{ translateY: showPopup }],
				borderRadius: 40,
				position: 'absolute',
				bottom: 0,
				left: 0,
				right: 0,
				backgroundColor: color,
				height: 100,
				marginHorizontal: 20,
				paddingHorizontal: 40,
				paddingBottom: 20,
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Text
				style={{ color: colors.background, fontSize: 20, textAlign: 'center' }}
				numberOfLines={2}>
				{' '}
				{text}{' '}
			</Text>
		</Animated.View>
	);
});

export default BottomPopup;
