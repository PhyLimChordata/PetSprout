import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SortTask = () => {
    return (    
        <View style={styles.create}>
            <Text style={styles.plus}>S</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    create:{
        backgroundColor: '#9CC69B',
        width: 75,
        height: 75,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#6E8F6D',
    },
    plus:{
        color: '#FFFFFF',
        marginTop: 1,
        marginLeft: 20,
        fontSize: 48,
    },
});

export default SortTask;