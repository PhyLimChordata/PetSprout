import React, { useEffect } from 'react';
import {View, Text, ColorPropType} from 'react-native';
import styles from '../styling/ViewEditBox'
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import { onChange } from 'react-native-reanimated';
import ColorSet from '../resources/themes/Global';

function ProfileEdit (props) {
    return(
        <View style={styles.container}>
            <EditBox tag="Username" def="Example" place="Username"/>
            <EditBox tag="Email" def="Example@gmail.com" place="Email"/>
            <EditBox tag="About" def="" mult={true} numLines={3} backColor={true}/>
            <View style={styles.formContainer}>
            <Text style={styles.textTitle}>
                Account Created On
            </Text>
            <Text style={styles.textInput}>
                Date
            </Text>
            </View>
        </View>
        
    );
}

const EditBox = (props) => {
    const [text, onChangeText] = React.useState(props.def);
    const [focused, onSelected] = React.useState(false);

    var color = ColorSet.white;

    const handleSelect = () => {
        console.log("Focused");
        color = ColorSet.PrimaryGreen
        onSelected(true);
    }

    const handleDeselect = () => {
        console.log("Not focused");
        color = ColorSet.PrimaryGreen
        onSelected(false);
    }

    useEffect(() => {

    }, [focused])

    return(
        <View style={styles.formContainer}>
            <Text style={styles.textTitle}>
                {props.tag}
            </Text>
            <TextInput
                onFocus={handleSelect}
                onBlur={handleDeselect}
                onChangeText={onChangeText}
                value={text}
                placeholder={props.place}
                style={props.mult ? styles.textMultiInput : styles.textInput }
                multiline={props.mult}
                numberOfLines={props.numLines}
            />
        </View>

    );
};

export default ProfileEdit