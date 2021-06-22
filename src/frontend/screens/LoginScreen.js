import React, {useState} from 'react';

import {View, Text, TextInput, Image, TouchableHighlight} from 'react-native';

import styles from '../styling/Tabs';

import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen(props) {
    const [primaryInfo, setPrimaryInfo] = useState('');
    const[password, setPassword] = useState('');

    const inputExample = async () => {
        await AsyncStorage.setItem("token", "token");
        // props.navigation.navigate("HomeScreen");
    }

    const navigateToSignUp = () => {
        props.navigation.navigate("SignupScreen");
    }

    return (
    <View style={styles.container}>
        <Image
            style={styles.AuthenticationLogo}
            source={require('../resources/images/Logo.png')}
        />
        <View style={styles.inputContainer}>
            <Text style={styles.AuthenticationText}>Email/Username</Text>
            <TextInput style={styles.AuthenticationInput} value={primaryInfo} onChangeText={(text)=>setPrimaryInfo(text)}></TextInput>
            <Text style={styles.AuthenticationText}>Password</Text>
            <TextInput style={styles.AuthenticationInput} secureTextEntry={true} value={password} onChangeText={(text)=>setPassword(text)}></TextInput>
        </View>
        <TouchableHighlight style={styles.AuthenticationButton} onPress ={() => inputExample()}>
                <Text style={styles.AuthenticationButtonText}>Login</Text>
        </TouchableHighlight>
        <Text style={styles.subText}>New User?
            <TouchableHighlight onPress = {() => navigateToSignUp()}>
                <Text style={styles.SignupText}> Sign up</Text>
            </TouchableHighlight>
        </Text>
    </View>
    );
}

export default LoginScreen;