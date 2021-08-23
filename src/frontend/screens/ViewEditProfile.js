import React, { useEffect } from 'react';
import {View, Text, Button, Pressable, Dimensions } from 'react-native';
import StyleSheetFactory from '../styling/ViewEditBox'
import { TextInput } from "react-native";
import MenuHeader from '../components/MenuHeader'
import {SafeAreaView} from 'react-native';
import {
    useFonts,
    Roboto_900Black,
  } from '@expo-google-fonts/roboto';

let styles = StyleSheetFactory.getSheet(Dimensions.get('screen').width,
    Dimensions.get('screen').height
    );

function ProfileEdit (props) {
    
    console.log("profile 14: " + typeof styles);

    let data = {
        userName: 'Example',
        email: 'Example@gmail.com',
        about: '',
    }

    

    const handleChange = (id, e) => {
        data[id] = e
    }

    const onSubmit = () => {
        console.log(data)
    }

        return(
            <SafeAreaView>
                <View>
                    <MenuHeader text="Account  ">
                        <Text>Account  </Text>
                    </MenuHeader>
                </View>
                <View style={styles.container}>
                    <EditBox id="userName" tag="Username" def={data.userName} place="Username" handle={handleChange}/>
                    <View style={styles.formContainer}>
                        <Text style={[styles.textTitle, styles.text, { fontFamily: 'Roboto_900Black', fontWeight: '900' }]}>
                            Email
                        </Text>
                        <Text style={[styles.textInput, styles.text]}>
                            Example@gmail.com
                        </Text>
                        </View>
                    <EditBox id="about" tag="About" def="" mult={true} numLines={5} backColor={true} handle={handleChange}/>
                    <View style={styles.formContainer}>
                        <Text style={[styles.textTitle, styles.text, { fontFamily: 'Roboto_900Black', fontWeight: '900' }]}>
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

    const handleChange = (text) => {
        console.log("handleChange " + text)
        onChangeText(text)
        props.handle(props.id, text)
    }

    console.log("def =  " + text);
    console.log(props.def);

    useEffect(() => {

    }, [focused])

    return(
        <View style={styles.formContainer}>
            <Text style={[styles.textTitle, styles.text, { fontFamily: 'Roboto_900Black', fontWeight: '900' }]}>
                {props.tag}
            </Text>
            <TextInput
                id={props.id}
                onFocus={() => onSelected(true)}
                onBlur={() => onSelected(false)}
                onChangeText={(text) => handleChange((props.id, text))}
                value={text}
                style={props.mult ? styles.textMultiInput 
                    : [styles.textInput, styles.text, (focused ? styles.textInputSelected : null)]}
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
                    <Text style={[styles.submitButtonText, { fontFamily: 'Roboto_900Black', fontWeight: '900' }]}>SUBMIT</Text>
                </Pressable>
        </View>
    )
}

export default ProfileEdit