import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import ColorSet from "../resources/global/themes";
import Trash from "./Trash";

function TimeTab(props) {

    let time_index = Math.max(props.time.search('AM'), props.time.search('PM'))
    return (
        <View style={{flexDirection:'row',backgroundColor:ColorSet.Green.Quaternary, paddingHorizontal:5, flex:1, alignItems:'flex-end', borderRadius:10, height:60}}>
            <Text style={{fontSize:50, fontWeight:'bold',color:ColorSet.white, marginRight:-5}}> {props.time.slice(0,time_index-1)} </Text>
            <Text style={{fontSize:20, fontWeight:'bold',color:ColorSet.white, marginBottom:9}}> {props.time.slice(time_index-1)} </Text>
        </View>
    );
}

export default TimeTab;
