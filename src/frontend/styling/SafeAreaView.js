import React from 'react';
import { SafeAreaView, View, Platform } from 'react-native';

function CustomSafeAreaView(props) {
    if(Platform.OS === 'andriod') {
        return (
            <View style={{ paddingTop: 30}}>
                {props.children}
            </View>
        )
    } else {
        return (
            <SafeAreaView>
                {props.children}
            </SafeAreaView>
        )
    }
}

export default CustomSafeAreaView;