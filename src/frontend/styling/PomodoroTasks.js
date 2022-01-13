import { StyleSheet,} from 'react-native';

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

export default PomodoroTasksStyles;