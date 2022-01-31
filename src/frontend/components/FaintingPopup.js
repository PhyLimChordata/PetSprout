import React, { useContext } from 'react';
import { useTheme } from '@react-navigation/native';

import Popup from './Popup';
import styles from '../styling/Logout';
import {AuthContext} from "../Context";

function FaintingPopup(props) {
    const { getToken, changeRefreshing } = useContext(AuthContext);

    const { colors } = useTheme();
    const style = styles(colors);
    const revivePet = () => {
        fetch('http://3.15.57.200:5000/api/v1.0.0/pets/revive', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authentication-token': getToken,
            },
        })
            .then((res) => {
                res.json().then((data) => {
                    console.log(data);
                    console.log('eh')
                    changeRefreshing(true)
                });
            })

            .catch();
    }
    return (
        <Popup
            disableOnBackdropPress={true}
            modalVisible={props.visible}
            setModalVisible={props.setVisible}
            image={require('../resources/images/FaintedPet.png')}
            style={style.confirmation}
            title={'Your Pet Fainted!'}
            text={'Your pet will recover but has suffered exp loss'}
            buttonType={'continue'}
            successFunction={() => revivePet()}
        />
    );
}

export default FaintingPopup;
