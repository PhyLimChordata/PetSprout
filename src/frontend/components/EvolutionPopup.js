import React, { useContext } from 'react';
import { useTheme } from '@react-navigation/native';

import Popup from './Popup';
import styles from '../styling/Logout';

function EvolutionPopup(props) {
	const { colors } = useTheme();
	const style = styles(colors);

	return (
		<Popup
			disableOnBackdropPress={true}
			modalVisible={props.visible}
			setModalVisible={props.setVisible}
			image={
				props.isEgg
					? require('../resources/images/EggEvolution.png')
					: require('../resources/images/PetEvolution.png')
			}
			style={style.confirmation}
			title={'Something is\nHappening!'}
			text={props.isEgg ? 'Your pet is hatching!' : 'Your pet is evolving'}
			buttonType={'continue'}
			successFunction={
				props.isEgg
					? () => props.navigation.navigate('NamePetScreen')
					: () => props.navigation.navigate('EvolutionScreen')
			}
		/>
	);
}

export default EvolutionPopup;
