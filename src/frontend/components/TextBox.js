import { Text, TextInput, View} from "react-native";
import React, {useState} from "react";
import styles from "../styling/Authentication";

function TextBox(props) {
    console.log(props)
    const {containerStyle, boxStyle = styles.AuthenticationInput, TextStyle= styles.AuthenticationText, multiline = false } = props
    const [text, setText] = useState(props.text);

    return (
        <View style={containerStyle}>
            <Text style={TextStyle}>{props.header}</Text>
            <TextInput
                multiline={multiline}
                style={boxStyle}
                value={text}
                onChangeText={(content) => setText(content)}
                onEndEditing={() => props.setText(text)}
            ></TextInput>
        </View>
    );
}

export default TextBox;
