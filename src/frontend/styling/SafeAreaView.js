import React from 'react';
import { SafeAreaView, View, Platform } from 'react-native';

function CustomSafeAreaView(props) {
    if(Platform.OS === 'android') {
        return (
            <View style={[props.style, { paddingTop: 35}]}>
                {props.children}
            </View>
        )
    } else {
        return (
            <SafeAreaView style={props.style}>
                {props.children}
            </SafeAreaView>
        )
    }
}

export default CustomSafeAreaView;