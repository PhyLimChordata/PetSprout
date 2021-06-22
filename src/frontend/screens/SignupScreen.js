import React, {useState} from 'react';
import {View, Text, TextInput, Image, TouchableHighlight} from 'react-native';

import styles from '../styling/Tabs';

function SignupScreen(props) {
    const [userName, setusername] = useState('');
    const [email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[reEnterPassword, setreEnterPassword] = useState('');


    const inputExample = async () => {
        //signupstuff
    }

    const navigateToLogin = () => {
        props.navigation.navigate("LoginScreen");
    }

    return (
        <View style={styles.container}>
        <Image
            style={styles.AuthenticationLogo}
            source={require('../resources/images/Logo.png')}
        />
        <View style={styles.inputContainer}>
            <Text style={styles.AuthenticationText}>Username</Text>
            <TextInput style={styles.AuthenticationInput} value={userName} onChangeText={(text)=>setusername(text)}></TextInput>
            <Text style={styles.AuthenticationText}>Email</Text>
            <TextInput style={styles.AuthenticationInput} value={email} onChangeText={(text)=>setEmail(text)}></TextInput>
            <Text style={styles.AuthenticationText}>Password</Text>
            <TextInput style={styles.AuthenticationInput} secureTextEntry={true} value={password} onChangeText={(text)=>setPassword(text)}></TextInput>
            <Text style={styles.AuthenticationText}>ReEnter Password</Text>
            <TextInput style={styles.AuthenticationInput} value={reEnterPassword} onChangeText={(text)=>setreEnterPassword(text)}></TextInput>
        </View>
        <TouchableHighlight style={styles.AuthenticationButton} onPress ={() => inputExample()}>
                <Text style={styles.AuthenticationButtonText}>Sign Up</Text>
        </TouchableHighlight>
        <Text style={styles.subText}>Already have an account?
            <TouchableHighlight onPress = {() => navigateToLogin()}>
                <Text style={styles.SignupText}> Log in</Text>
            </TouchableHighlight>
        </Text>
    </View>
    );
}

export default SignupScreen;