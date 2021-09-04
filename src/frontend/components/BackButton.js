import {Image, TouchableOpacity} from "react-native";
import React from "react";

function BackButton(props) {
    return (
        <TouchableOpacity style={{ width: 30, height: 25}} activeOpacity={0.6} onPress={() => props.navigation.goBack(null)}>
            <Image
                source={require('../resources/images/back-button.png')}
            />
        </TouchableOpacity>
    );
}

export default BackButton;
