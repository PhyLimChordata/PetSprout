import React, { useContext } from 'react';
import { useTheme } from '@react-navigation/native';

import Popup from './Popup';
import styles from '../styling/ReportABug';
import Colours from '../resources/themes/Colours';

function LongBreakCancelPopup(props) {
	const { colors } = useTheme();
	const style = styles(colors);
	const cancelPomodoro = () => {
		// TODO
		console.log('eh');
	};
	return (
		<Popup
			modalVisible={props.visible}
			setModalVisible={props.setVisible}
			image={require('../resources/images/Warning.png')}
			style={style.bugError}
			title='Are you sure?'
			text={
				'Please confirm your decision'
			}
			buttonType={'confirmation'}
			successFunction={props.cancelFunction}
		></Popup>
	);
}

export default LongBreakCancelPopup;
