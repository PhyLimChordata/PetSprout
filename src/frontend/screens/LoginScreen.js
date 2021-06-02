import React, {useState} from 'react';

import {View, Button, Text, TextInput, Image} from 'react-native';

import styles from '../styling/Tabs';

function LoginScreen(props) {
    const [primaryInfo, setPrimaryInfo] = useState('');
    const[password, setPassword] = useState('extra');

    const inputExample = async () => {
        //loginstuff
    }

    return (
    <View style={styles.container}>
        <Image
            style={styles.imageBox}
            source={require('../resources/images/logo.JPG')}
        />
        <Text style={styles.textTitle}>Email/Username</Text>
        <TextInput style={styles.textInput} value={primaryInfo} onChangeText={(text)=>setPrimaryInfo(text)}></TextInput>
        <Text style={styles.textTitle}>Password</Text>
        <TextInput secureTextEntry={true} defaultValue="password" style={styles.textInput} value={password} onChangeText={(text)=>setPassword(text)}></TextInput>
        <Button title="Login" onPress = {() => inputExample()}></Button>
    </View>
    );
}

export default LoginScreen;