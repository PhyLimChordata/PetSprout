import React, {useContext} from 'react';
import { useTheme } from '@react-navigation/native';

import Popup from './Popup';
import styles from '../styling/Logout';

function EvolutionPopup(props) {
    const { colors } = useTheme();
    const style = styles(colors);

    return (
        <Popup
            modalVisible={props.visible}
            setModalVisible={props.setVisible}
            image={props.isEgg ? require('../resources/images/EggEvolution.png'): require('../resources/images/PetEvolution.png')}
            style={style.confirmation}
            title='Are you sure you want to delete this habit?'
            text={'Deleting "' + props.habitTitle + '"'}
            buttonType={'continue'}
            successFunction={() => props.navigation.navigate('EvolutionScreen')}
        ></Popup>
    );
}

export default EvolutionPopup;
