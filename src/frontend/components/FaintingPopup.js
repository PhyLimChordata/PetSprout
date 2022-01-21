import React, { useContext } from 'react';
import { useTheme } from '@react-navigation/native';

import Popup from './Popup';
import styles from '../styling/Logout';

function FaintingPopup(props) {
    const { colors } = useTheme();
    const style = styles(colors);

    return (
        <Popup
            modalVisible={props.visible}
            setModalVisible={props.setVisible}
            image={require('../resources/images/FaintedPet.png')}
            style={style.confirmation}
            title={'Your Pet Fainted!'}
            text={'Your pet will recover but has suffered exp loss'}
            buttonType={'continue'}
            successFunction={() => {}}
        />
    );
}

export default FaintingPopup;
