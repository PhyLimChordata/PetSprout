import React from 'react';
import { useTheme } from '@react-navigation/native';

import Popup from './Popup';
import styles from '../styling/Logout';

function LogoutConfirmation(props) {
	const { colors } = useTheme();
	const style = styles(colors);
	return (
		<Popup
			modalVisible={props.logoutVisible}
			setModalVisible={props.setLogoutVisible}
			image={require('../resources/images/Logout.png')}
			style={style.confirmation}
			title="Are you sure you want to log out?"
			text="You will be redirected to the login screen."
			button={true}
        ></Popup>
	);
}

export default LogoutConfirmation;