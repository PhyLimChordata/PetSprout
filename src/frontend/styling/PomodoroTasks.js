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
        safeArea:{
            flex: 1, 
            backgroundColor: "#FFFFFF",
        },
    });

export default PomodoroTasksStyles;