import React,{ useState, useContext } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, SafeAreaView, TouchableOpacity } from "react-native";
import MenuHeader from "../components/MenuHeader";
import Colours from "../resources/themes/Colours";
import TextBox from "../components/TextBox";
import { AuthContext } from '../Context';
import Task from "../components/PomodoroTasks";
import { useTheme } from '@react-navigation/native';
import styles from '../styling/Header';

function CreateTaskScreen(props){
    const [title, setTitle] = useState('');
    const[taskItems, setTaskItems] = useState([]);
    const { colors } = useTheme();

    const createTask=()=>{
        console.log(title);
        setTaskItems([...taskItems,title])
        setTitle(null);
    }
    const textboxSmallStyle = {
		backgroundColor: colors.Secondary,
		padding: 10,
		borderWidth: 0,
		height: 50,
		borderStyle: 'solid',
		fontSize: 15,
		borderRadius: 5,
		marginBottom: 20,
	};
    return(
        <SafeAreaView style={styles(colors).headContainer}>
			<View style={{ marginTop: 0 }} />
			<MenuHeader
				back={true}
				text={'Create Task'}
				navigation={props.navigation}
				right={
					<TouchableOpacity onPress={() => createTask()}>
						<Text style={styles(colors).headerText}> Create</Text>
					</TouchableOpacity>
				}
			/>
            <View style={{ marginHorizontal: 30, marginTop: 10 }}>
					<TextBox
						header={'Task Name'}
						boxStyle={textboxSmallStyle}
						multiline={true}
						setText={setTitle}
					/>
            </View>
            </SafeAreaView>
    )
}

export default CreateTaskScreen;