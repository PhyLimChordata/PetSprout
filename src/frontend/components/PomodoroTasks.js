import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlightComponent, Image} from 'react-native';
import Colours from "../resources/themes/Colours";

const Task = (props) =>{
    return(
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <TouchableOpacity>
                    <Image source ={require('../resources/images/PencilEdit.png')} style={styles.square}/>
                </TouchableOpacity>
                <Text style={styles.itemText}>{props.text}</Text>
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
        height: 125,
        top: -49,
        left: -50,
        fontSize: 18,
        fontWeight: 'bold',

        color: '#6E8F6D',
        fontStyle: 'normal',
        lineHeight: 21,
        maxWidth: '80%',
    },
});
export default Task;