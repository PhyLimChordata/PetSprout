import React from 'react';
import {View, Button, Text} from 'react-native';

import styles from '../styling/Tabs'

function TabThree(props) {
    const get = () => {
        fetch('http://localhost:5000/example/get')
        .then(res => res.json())
        .then(data => console.log(data))
        .catch();
    }

    return (
        <View style={styles.container}>
            <Button title="Get stuff from Database" onPress={() => get()}/>
            <Text style={styles.textTitle}>Check Console!</Text>
        </View>
    );
}

export default TabThree;