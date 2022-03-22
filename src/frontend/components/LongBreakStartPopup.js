import React, { useContext } from 'react';
import { useTheme } from '@react-navigation/native';

import Popup from './Popup';
import styles from '../styling/Logout';

function LongBreakStartPopup(props) {
	const { colors } = useTheme();
	const style = styles(colors);
	const startPomodoro = () => {
		// TODO
		// //console.log('eh')
	};

	return (
		<Popup
			modalVisible={props.visible}
			setModalVisible={props.setVisible}
			image={require('../resources/images/Question.png')}
			style={style.confirmation}
			title='Are you sure?'
			text={
				'You’re about to start a long break! \n\nYou can’t stop once you start'
			}
			buttonType={'confirmation'}
			successFunction={props.startFunction}
			successText={'Continue'}
			failureText={'Cancel'}
		></Popup>
	);
}

export default LongBreakStartPopup;
