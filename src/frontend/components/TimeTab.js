import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import ColorSet from "../resources/themes/Global";
import Trash from "./Trash";

function TimeTab(props) {
    return (
        <View style={{flexDirection:'row',backgroundColor:ColorSet.Green.Quaternary, marginHorizontal:5, alignItems:'center', marginVertical:7, borderRadius:10}}>
            <Text style={{fontSize:50, fontWeight:'bold', flex:1, color:ColorSet.white}}> {props.time} </Text>
            <View style={{marginRight:10}}>
            <Trash onPress={props.onPress}/>
            </View>
        </View>
    );
}

export default TimeTab;
