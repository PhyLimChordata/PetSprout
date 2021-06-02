import React from 'react';
import {View, Button, Text, TextInput, Image} from 'react-native';

import styles from '../styling/Tabs';

function HomeScreen(props) {
    return (
        <View style={styles.container}>
            <Image
                style={styles.imageBox}
                source={require('../resources/images/logo.JPG')}
            />
        </View>
    );
}

export default HomeScreen;