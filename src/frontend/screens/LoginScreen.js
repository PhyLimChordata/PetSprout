import React, {useState} from 'react';

import {View, Button, Text, TextInput, Image} from 'react-native';

import styles from '../styling/Tabs';

function LoginScreen(props) {
    const [content, setContent] = useState('');
    const[extra, setExtra] = useState('extra');

    return (
    <View style={styles.container}>
         <Image
        style={styles.imageBox}
        source={require('../resources/images/logo.JPG')}
      />
        <Text style={styles.textTitle}>Let's add an example!</Text>
        <TextInput style={styles.textInput} value={content} onChangeText={(text)=>setContent(text)}></TextInput>
        <TextInput defaultValue="Extra" style={styles.textInput} value={extra} onChangeText={(text)=>setExtra(text)}></TextInput>
        <Button title="Add it to the Database" onPress = {() => inputExample()}></Button>
    </View>
    );
}

export default LoginScreen;