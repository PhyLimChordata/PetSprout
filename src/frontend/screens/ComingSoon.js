import React from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';

import styles from '../styling/ComingSoon';
import MenuHeader from '../components/MenuHeader';

function ComingSoon(props) {
	return (
		<SafeAreaView style={styles.headContainer}>
            <MenuHeader text={props.title} navigation={props.navigation} />
            <View style={styles.container}>
                <Image
                    style={styles.Logo}
                    source={require('../resources/images/Logo.png')}
                />
                <Text style={styles.ComingSoonText}>Coming Soon...</Text>
            </View>
			
            <Image
				style={styles.Creature}
				source={require('../resources/images/ComingSoon.png')}
			/>
		</SafeAreaView>
	);
}

export default ComingSoon;
