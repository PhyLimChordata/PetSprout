import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Animated, scrolling, TouchableOpacity, Touchable, KeyboardAvoidingView, Platform } from 'react-native';

import PomodoroTasks from '../components/PomodoroTasks';
import MenuHeader from '../components/MenuHeader';
import styles from '../styling/Header';
import { useTheme } from '@react-navigation/native';

function PomodoroTasksScreen(props) {
    const scrolling = React.useRef(new Animated.Value(0)).current;
    const { colors } = useTheme();
    const [tasks, setTasks] = useState(['task1', 'task2', 'task3'])
    const [title, setTitle] = useState('');

    const createTask=(props)=>{
        setTasks([...tasks, '']);
        setTitle(...title,'');
    }

    const CreateTaskButton = () => {
        return (
            <View style={PomodoroTasksStyles.create}>
                <Text style={PomodoroTasksStyles.plus}>+</Text>
            </View>
        )
    }

    const SortTaskButton = () =>{
        return (
            <View style={PomodoroTasksStyles.create}>
                <Text style={PomodoroTasksStyles.plus}>S</Text>
            </View>
        )
    }

    return(
        <KeyboardAvoidingView behavior={Platform.OS==="ios" ? "padding" : "padding"} style={styles(colors).headContainer}>
            <View style={{ marginTop: 20 }} />
            <MenuHeader
                back={true}
                text={'PomodoroTasks'}
                navigation={props.navigation}
            />
            <Animated.ScrollView
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrolling } } }],
                        { useNativeDriver: true },
                    )}
                    decelerationRate={'normal'}
            >
                <View style={PomodoroTasksStyles.container}>
                    <View style={PomodoroTasksStyles.tasksWrapper}>
                        <View style={PomodoroTasksStyles.items}>
                            {tasks.map((items) => {
                                return <PomodoroTasks text={items} 
                                />
                            })}
                        </View>
                    </View>
                </View>
            </Animated.ScrollView>
            <View style={PomodoroTasksStyles.buttons}>
                <TouchableOpacity style={PomodoroTasksStyles.createTask}
                    onPress={() => {
                        createTask();
                    }}
                >
                    <CreateTaskButton/>
                </TouchableOpacity>
                <TouchableOpacity style={PomodoroTasksStyles.SortTask}>
                    <SortTaskButton/>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const PomodoroTasksStyles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
    },
    tasksWrapper:{
        paddingTop: 0,
        paddingHorizontal: 20,
    },
    items:{
        marginTop: 30,
    },
    buttons:{
        position: 'absolute',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        right: 10,
        bottom: 50,
    },
    createTask:{                                      
        position: 'relative',
        alignSelf: 'flex-end',                                                                                           
    },
    SortTask:{
        position: 'relative',                                                                                             
        top: 10,
        alignSelf: 'flex-end',    
    },
    create:{
        backgroundColor: '#9CC69B',
        width: 75,
        height: 75,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#6E8F6D',
    },
    plus:{
        color: '#FFFFFF',
        marginTop: 1,
        marginLeft: 20,
        fontSize: 48,
    },
});

export default PomodoroTasksScreen;