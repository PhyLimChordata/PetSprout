import React, { useContext } from 'react';
import { useTheme } from '@react-navigation/native';

import Popup from './Popup';
import styles from '../styling/ReportABug';
import Colours from '../resources/themes/Colours';

function ShortBreakCancelPopup(props) {
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
				'Failing to complete the full duration of a short break session will lead to your pet\'s health going down by 2 points'
			}
			buttonType={'confirmation'}
			successFunction={props.cancelFunction}
		></Popup>
	);
}

export default ShortBreakCancelPopup;
