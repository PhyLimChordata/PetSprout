import React, { useEffect } from 'react';
import {View, Text, Button, Pressable } from 'react-native';
import styles from '../styling/ViewEditBox'
import { TextInput } from "react-native";
import MenuHeader from '../components/MenuHeader'
import ColorSet from '../resources/themes/Global'
import {SafeAreaView} from 'react-native';

function ProfileEdit (props) {

    let data = {
        userName: 'Example',
        email: 'Example@gmail.com',
        about: '',
    }

    const handleChange = (id, e) => {
        data[id] = e.target.value
    }

    const onSubmit = () => {
        console.log(data)
    }

    return(
        <SafeAreaView>
            <View>
                <MenuHeader text="Account" navigation={props.navigation}>
                    <Text>Account icon</Text>
                </MenuHeader>
            </View>
            <View style={styles.container}>
                <EditBox id="userName" tag="Username" def={data.userName} place="Username" handle={handleChange}/>
                <View style={styles.formContainer}>
                    <Text style={[styles.textTitle, styles.text]}>
                        Email
                    </Text>
                    <Text style={[styles.textInput, styles.text]}>
                        Example@gmail.com
                    </Text>
                    </View>
                <EditBox id="about" tag="About" def="" mult={true} numLines={5} backColor={true} handle={handleChange}/>
                <View style={styles.formContainer}>
                    <Text style={[styles.textTitle, styles.text]}>
                        Account Created On
                    </Text>
                    <Text style={[styles.textInput, styles.text]}>
                        Date
                    </Text>
                </View>
                <SubmitButton submit={onSubmit}/>
            </View>
        </SafeAreaView>        
    );
}

const EditBox = (props) => {
    const [text, onChangeText] = React.useState(props.def);
    const [focused, onSelected] = React.useState(false);

    const handleChange = (e) => {
        onChangeText(e.target.value)
        props.handle(props.id, e)
    }

    useEffect(() => {

    }, [focused])

    return(
        <View style={styles.formContainer}>
            <Text style={[styles.textTitle, styles.text]}>
                {props.tag}
            </Text>
            <TextInput
                onFocus={() => onSelected(true)}
                onBlur={() => onSelected(false)}
                onChange={e => handleChange((props.id, e))}
                value={text}
                defaultValue={props.place}
                style={props.mult ? styles.textMultiInput : [styles.textInput, styles.text, (focused ? styles.textInputSelected : null)]}
                multiline={props.mult}
                numberOfLines={props.numLines}
            />
        </View>

    );
};

const SubmitButton = (props) => {
    return(
        <View style={styles.submitButtonPosition}>
            <Pressable
                style={styles.submitButton}
                onPress={() => props.submit()}>
                    <Text style={styles.submitButtonText}>SUBMIT</Text>
                </Pressable>
        </View>
    )
}

export default ProfileEdit