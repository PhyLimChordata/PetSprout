import React,{useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlightComponent, Image, TextInput} from 'react-native';
import Colours from "../resources/themes/Colours";

function PomodoroTasks(props){
    //const [task, setTask] = useState('Placeholder');
    const [edit, setEdit] = useState(false);
    if(edit) {
        return(
            <View style={styles.item}>
                <View style={styles.itemLeft}>
                    <TouchableOpacity onPress={()=>{setEdit(!edit)}} style={styles.square}>
                        <Image source ={require('../resources/images/Checkmark2.png')}/>
                    </TouchableOpacity>
                    <TextInput style={styles.itemText} editable={edit}>{props.text}</TextInput>
                </View>
            </View>
        )
    }
    return(
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <TouchableOpacity onPress={()=>{setEdit(!edit)}} style={styles.square}>
                    <Image source ={require('../resources/images/PencilEdit.png')}/>
                </TouchableOpacity>
                <TextInput style={styles.itemText} editable={edit}>{props.text}</TextInput>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item:{
        backgroundColor: '#D7F2BA',
        padding: 77,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        marginHorizontal: 33,
    },
    itemLeft:{
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    square:{
        width: 22,
        height: 22,
        borderRadius: 5,
        opacity:0.4,
        marginRight: 15,
        top: -53,
        left:186,
        position:'absolute',
    },
    itemText:{
        position: 'absolute',
        width: 259,
        height: 185,
        top: -140,
        left: -50,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6E8F6D',
        fontStyle: 'normal',
        lineHeight: 21,
        maxWidth: '80%',
    },
});
export default PomodoroTasks;
