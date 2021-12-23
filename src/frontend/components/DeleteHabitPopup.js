import React, {useContext} from 'react';
import { useTheme } from '@react-navigation/native';

import Popup from './Popup';
import styles from '../styling/ReportABug';
import {AuthContext} from "../Context";

function DeleteHabitPopup(props) {
    const { colors } = useTheme();
    const style = styles(colors);
    const { getToken, changeRefreshing } = useContext(AuthContext);

    const deleteHabit = () => {
        fetch(
            'http://localhost:5000/api/v1.0.0/habit/delete_habit/' +
            props.userHabitId +
            '/' +
            props.habitId,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authentication-token': getToken,
                },
            },
        )
            .then((res) => {
                res.json().then((data) => {
                    if (res.status == 200) {
                        changeRefreshing(true);
                        if (props.goBack) {
                            props.navigation.goBack(null);
                        }
                    } else {
                        if (props.bottomPopupRef) {
                            props.setBottomPopupText('Error on Delete');
                            props.bottomPopupRef.current?.togglePopup();
                        }
                    }
                });
            })
            .catch();
    };
    return (
        <Popup
            modalVisible={props.visible}
            setModalVisible={props.setVisible}
            image={require('../resources/images/Exclamation.png')}
            style={style.bugError}
            title='Are you sure you want to delete this habit?'
            text={'Deleting "' + props.habitTitle + '"'}
            buttonType={'confirmation'}
            successFunction={() => deleteHabit()}
            failureFunction={() => props.setVisible(false)}
        ></Popup>
    );
}

export default DeleteHabitPopup;
