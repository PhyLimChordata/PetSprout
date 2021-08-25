import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import styles from "../styling/Authentication";

function TextBox(props) {
    const {containerStyle, boxStyle = styles.AuthenticationInput, TextStyle= styles.AuthenticationText, multiline = false } = props
    return (
        <View style={containerStyle}>
            <Text style={TextStyle}>{props.header}</Text>
            <TextInput
                multiline={multiline}
                style={boxStyle}
                value={props.text}
                onChangeText={(content) => props.setText(content)}
            ></TextInput>
        </View>
    );
}

export default TextBox;
