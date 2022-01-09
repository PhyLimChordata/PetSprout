import React, { useContext } from 'react';
import { useTheme } from '@react-navigation/native';

import Popup from './Popup';
import styles from '../styling/ReportABug';
import { AuthContext } from '../Context';

function DeletePomodoroPopup(props) {
	const { colors } = useTheme();
	const style = styles(colors);
	const { getToken, changeRefreshing } = useContext(AuthContext);

    const deleteHabit = () => {
	}
	
	return(
    	<Popup
			modalVisible={props.visible}
			setModalVisible={props.setVisible}
			image={require('../resources/images/Exclamation.png')}
			style={style.bugError}
			title='Are you sure you want to delete this task?'
			text={'Deleting "' + props.habitTitle + '"'}
			buttonType={'confirmation'}
			successFunction={() => deleteHabit()}
			failureFunction={() => props.setVisible(false)}
		></Popup>
		)
    
}

export default DeletePomodoroPopup;

