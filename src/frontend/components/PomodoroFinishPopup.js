import React, { useContext } from 'react';
import { useTheme } from '@react-navigation/native';

import Popup from './Popup';
import styles from '../styling/ReportABug';

function PomodoroFinishPopup(props) {
	const { colors } = useTheme();
	const style = styles(colors);
	const finishPomodoro = () => {
		// TODO
		//console.log('eh');
	};

	return (
		<Popup
			modalVisible={props.visible}
			setModalVisible={props.setVisible}
			image={require('../resources/images/Sparkle.png')}
			style={{
				textAlign: 'center',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: '#75D6FF',
				color: '#75D6FF',
				height: 360,
				width: 300,
				borderRadius: 30,
				padding: 20,
			}}
			title='You Finished?'
			text={'Congratulations! You completed a pomodoro session!'}
			buttonType={'continue'}
			successFunction={() => finishPomodoro()}
		></Popup>
	);
}

export default PomodoroFinishPopup;
