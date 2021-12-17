import React, {useContext} from 'react';
import { useTheme } from '@react-navigation/native';

import Popup from './Popup';
import styles from '../styling/Logout';
import {AuthContext} from "../Context";

function LogoutConfirmation(props) {
	const { colors } = useTheme();
	const style = styles(colors);
	const { signOut } = useContext(AuthContext);
	return (
		<Popup
			modalVisible={props.visible}
			setModalVisible={props.setVisible}
			image={require('../resources/images/Logout.png')}
			style={style.confirmation}
			title='Are you sure you want to log out?'
			text='You will be redirected to the login screen.'
			buttonType={'confirmation'}
			successFunction={() => signOut}
		></Popup>
	);
}

export default LogoutConfirmation;
