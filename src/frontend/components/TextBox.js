import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import styles from "../styling/Authentication";

function TextBox(props) {
    const [text, setText] = useState('');
    const {containerStyle, boxStyle = styles.AuthenticationInput, TextStyle= styles.AuthenticationText, multiline = false } = props
    return (
        <View style={containerStyle}>
            <Text style={TextStyle}>{props.text}</Text>
            <TextInput
                multiline={multiline}
                style={boxStyle}
                value={text}
                onChangeText={(content) => setText(content)}
            ></TextInput>
        </View>
    );
}

export default TextBox;
