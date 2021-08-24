import React, {useState} from 'react'
import ColorSet from '../resources/themes/Global'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import {SafeAreaView} from 'react-native';
import MenuHeader from "../components/MenuHeader";
import styles from "../styling/Header";
import TextBox from "../components/TextBox";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import TimeTab from "../components/TimeTab";

const Day = ({selected, letter, onPress}) => (
    <TouchableOpacity onPress={onPress} style={{alignItems:"center", width:40, height:40,
        backgroundColor: selected ? ColorSet.Green.Tertiary : ColorSet.white,
        borderRadius:20, justifyContent:'center', marginVertical:5, borderWidth: 2,
        borderColor:ColorSet.Green.Quaternary}} activeOpacity={0.6}>
        <Text style={{color:ColorSet.Green.Quinary, fontSize: 20, fontWeight: "bold"}}> {letter} </Text>
    </TouchableOpacity>
)


function CreateHabitScreen(props) {
    const [Days, setDays] = useState([false,false,false,false,false,false,false]);
    const [Alarms, setAlarms] = useState([]);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    function flipDay(index) {
        let newArr = [...Days];
        newArr[index] = !newArr[index];
        setDays(newArr);
    }

    function addAlarm(time) {
        console.log('adding')
        setAlarms([...Alarms, time]);
    }
    function removeAlarm(index) {
        console.log('removing')
        setAlarms([
            ...Alarms.slice(0, index),
            ...Alarms.slice(index + 1)]);
    }

    function getPrettyDate(time){
        var localeSpecificTime = time.toLocaleTimeString();
        return localeSpecificTime.replace(/:\d+ /, ' ');
    }


    const textboxSmallStyle = {
        backgroundColor: ColorSet.Green.Secondary,
        padding: 10,
        borderWidth: 0,
        height:50,
        borderStyle: 'solid',
        fontSize: 15,
        borderRadius: 5,
        marginBottom: 20}
    const textboxBigStyle = {
        backgroundColor: ColorSet.Green.Secondary,
        padding: 10,
        borderWidth: 0,
        height:100,
        borderStyle: 'solid',
        fontSize: 15,
        borderRadius: 5,
        marginBottom: 20}
    return(
        <SafeAreaView style={styles.headContainer}>
            <MenuHeader back={true} text={"Create Habit"} navigation={props.navigation}
                        right={
                <TouchableOpacity onPress={() => console.log('create habit')}>
                    <Text style={styles.headerText}> Create</Text>
                </TouchableOpacity>}
            />
            <ScrollView>
            <View style={{marginHorizontal:30, marginTop:10}}>
                <TextBox text={"Title"} boxStyle={textboxSmallStyle} multiline={true}/>
                <TextBox text={"Description"} boxStyle={textboxBigStyle} multiline={true}/>
                <TextBox text={"Your Why"} boxStyle={textboxSmallStyle} multiline={true}/>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: ColorSet.Green.Quaternary}}>Schedule</Text>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Day letter={'S'} selected={Days[0]} onPress={() => flipDay(0)}/>
                    <Day letter={'M'} selected={Days[1]} onPress={() => flipDay(1)}/>
                    <Day letter={'T'} selected={Days[2]} onPress={() => flipDay(2)}/>
                    <Day letter={'W'} selected={Days[3]} onPress={() => flipDay(3)}/>
                    <Day letter={'T'} selected={Days[4]} onPress={() => flipDay(4)}/>
                    <Day letter={'F'} selected={Days[5]} onPress={() => flipDay(5)}/>
                    <Day letter={'S'} selected={Days[6]} onPress={() => flipDay(6)}/>
                </View>
                <View style={{alignItems:'center', marginVertical:20}}>
                    <TouchableOpacity style={{width:200,height:50, backgroundColor:ColorSet.Green.Tertiary,
                        alignItems:'center', justifyContent:'center', borderRadius:20}} onPress={() => setDatePickerVisibility(true)}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: ColorSet.Green.Quinary}}>Add An Alarm</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {Alarms.map((time, index) => {
                        // console.log(time)
                        return (
                            <TimeTab key={index} time={getPrettyDate(time)} onPress={() => removeAlarm(index)}/>
                        )
                    })}
                </View>
            </View>
            </ScrollView>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                date={new Date()}
                onConfirm={(time) => {
                    addAlarm(time)
                    setDatePickerVisibility(false)
                }}
                onCancel={() => setDatePickerVisibility(false)}
            />
        </SafeAreaView>
    )
}


export default CreateHabitScreen
