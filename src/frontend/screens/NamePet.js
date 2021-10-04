import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    SafeAreaView, Image,
} from 'react-native';
import MenuHeader from '../components/MenuHeader';


import { useTheme } from '@react-navigation/native';
import styles from "../styling/HabitsScreen";
import TextBox from "../components/TextBox";
function Button(props) {
    const { colors } = useTheme();
    return (<TouchableOpacity onPress={props.onPress} style={{height:50, width:175, marginTop:20, backgroundColor:colors.Quaternary, justifyContent:'center', alignItems:'center', borderRadius:20, marginHorizontal:10}}>
        <Text style={{						fontSize: 20,
            fontWeight: 'bold',
            color: colors.background,}}>
            {' '}
            {props.text}{' '}</Text>
    </TouchableOpacity>)
}

function NameHabit(props) {
    const { colors } = useTheme();
    const [name, setName] = useState(props.reason);
    return (
        <SafeAreaView style={styles(colors).headContainer}>
            <MenuHeader text='Evolution' navigation={props.navigation} hideMenu={true} />
            <View style={{alignItems:'center'}}>
                <Image
                    style={{marginVertical:30}}
                    source={require('../resources/images/Creature.png')}
                />
                <Text style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: colors.Quaternary,
                    textAlign: 'center',
                    marginBottom: 40,
                    paddingHorizontal: 50}}>
                    Congratulations! Your HabiPet has hatched! What would you like to name it?
                </Text>
                <Text style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: colors.Quaternary,}}>
                    NAME YOUR HABIPET
                </Text>
                <TextBox 						setText={setName}
                                                text={name}></TextBox>
                <View style={{flexDirection:'row'}}>
                    <Button text='SHARE' onPress={() => console.log("SHARE")}/>
                    <Button text='CONTINUE' onPress={() => console.log("CONTINUE")}/>
                </View>
            </View>

        </SafeAreaView>
    );
}

export default NameHabit;
