import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from '../styling/Habits';
import ColorSet from '../resources/themes/Global';

function Counter(props) {
	if (props.last) {
		return (
			<View
				style={{
					flexDirection: 'row',
					marginRight: 60,
					paddingTop: 10,
					backgroundColor: ColorSet.Green.Secondary,
				}}
			>
				<Text style={styles.levelText}>{props.quantity}</Text>
				{props.supplementalInfo}
			</View>
		);
	}
	return (
		<View style={styles.horizontalContainerPaddingRight}>
			<Text style={styles.levelText}>{props.quantity}</Text>
			{props.supplementalInfo}
		</View>
	);
}

export default Counter;
