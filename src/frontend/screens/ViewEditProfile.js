import React, { useEffect } from 'react';
import {View, Text, Button } from 'react-native';
import styles from '../styling/ViewEditBox'
import { TextInput } from "react-native";
import ColorSet from '../resources/themes/Global';
import MenuHeader from '../components/MenuHeader'

function ProfileEdit (props) {
    const handleChange = (e) => {
        
    }

    return(
        <View>
            <View>
                <MenuHeader text="Account"/>
            </View>
            <View style={styles.container}>
                <EditBox tag="Username" def="Example" place="Username"/>
                <EditBox tag="Email" def="Example@gmail.com" place="Email"/>
                <EditBox tag="About" def="" mult={true} numLines={5} backColor={true}/>
                <View style={styles.formContainer}>
                <Text style={[styles.textTitle, styles.text]}>
                    Account Created On
                </Text>
                <Text style={[styles.textInput, styles.text]}>
                    Date
                </Text>
                </View>
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
            <Text style={[styles.textTitle, styles.text]}>
                {props.tag}
            </Text>
            <TextInput
                onFocus={handleSelect}
                onBlur={handleDeselect}
                onChangeText={onChangeText}
                value={text}
                placeholder={props.place}
                style={props.mult ? styles.textMultiInput : [styles.textInput, styles.text]}
                multiline={props.mult}
                numberOfLines={props.numLines}
            />
        </View>

    );
};

const SubmitButton = ()=> {
    return(
        <View>
            <Button
                title="SUBMIT"/>
        </View>
    )
}

export default ProfileEdit