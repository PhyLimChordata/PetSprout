import React, {useState} from 'react';
import {View, Button, Text, TextInput} from 'react-native';

import styles from '../styling/Tabs';
import MenuHeader from '../components/MenuHeader';

function TabOne(props) {
    const [content, setContent] = useState('');
    const[extra, setExtra] = useState('extra');
   
    const inputExample = () => {
        fetch("http://localhost:5000/example/add",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "content": content,
                "extra": extra
            })
        }).then(res => res.json())
        .then(data => console.log(data))
        .catch();

        props.navigation.navigate("TabTwo");
    }

    return (
        <View style={styles.headContainer}>
            <MenuHeader text='Example'/>
            <View style={styles.container}>
                <Text style={styles.textTitle}>Let's add an example!</Text>
                <TextInput style={styles.textInput} value={content} onChangeText={(text)=>setContent(text)}></TextInput>
                <TextInput defaultValue="Extra" style={styles.textInput} value={extra} onChangeText={(text)=>setExtra(text)}></TextInput>
                <Button title="Add it to the Database" onPress = {() => inputExample()}></Button>
            </View>
        </View>
    );
}

export default TabOne;