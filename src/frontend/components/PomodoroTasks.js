import React,{useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput} from 'react-native';
import PomodoroTasksStyles from "../styling/PomodoroTasks";

function PomodoroTasks(props){
    const [edit, setEdit] = useState(false);
    
    return(
        edit ? 
            <SafeAreaView style={androidSafeAreaView().AndroidSafeArea}>
                <View style={PomodoroTasksStyles.item}>
                    <View style={PomodoroTasksStyles.itemLeft}>
                        <TouchableOpacity onPress={()=>{setEdit(!edit)}} style={PomodoroTasksStyles.square}>
                            <Image source ={require('../resources/images/Checkmark2.png')}/>
                        </TouchableOpacity>
                        <TextInput style={PomodoroTasksStyles.itemText} editable={edit}>{props.text}</TextInput>
                    </View>
                </View>
            </SafeAreaView>
        : 
            <SafeAreaView style={androidSafeAreaView().AndroidSafeArea}>
                <View style={PomodoroTasksStyles.item}>
                    <View style={PomodoroTasksStyles.itemLeft}>
                        <TouchableOpacity onPress={()=>{setEdit(!edit)}} style={PomodoroTasksStyles.square}>
                            <Image source ={require('../resources/images/PencilEdit.png')}/>
                        </TouchableOpacity>
                        <TextInput style={PomodoroTasksStyles.itemText} editable={edit}>{props.text}</TextInput>
                    </View>
                </View>
            </SafeAreaView>
    )
}

export default PomodoroTasks;