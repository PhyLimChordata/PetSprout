import React, { useState, useEffect} from 'react';
import { View, Image, Animated, ScrollView } from 'react-native';

import styles from '../styling/HabitsScreen'
import Habits from '../components/Habits'
import Menu from '../components/Menu'
import ExperienceBar from '../components/ExperienceBar'
import Checkmark from '../components/Checkmark';
import Trash from '../components/Trash';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import ColorSet from '../resources/themes/Global';


function HabitsScreen(props) {
    const [habits, setHabits] = useState([]);
    const [hearts, setHearts] = useState([]); 
    const scrolling = React.useRef(new Animated.Value(0)).current;

    const leftSwipe = (progress, dragX)=> {
        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });

        return(
            <View style={{backgroundColor: ColorSet.TertiaryRed, borderRadius: 8, height: "100%", width: "100%", justifyContent: "center",alignItems:"flex-start", padding: 20}}>
                <Animated.View style={{transform:[{scale}]}}>
                    <Trash/>
                </Animated.View>
            </View>
        )   
    }

    
    const rightSwipe = (progress, dragX)=> {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });

        return(
            <View style={{backgroundColor: ColorSet.TertiaryBlue, borderRadius: 8, height: "100%", width: "100%", justifyContent: "center", alignItems:"flex-end", padding:20}}>
                <Animated.View style={{transform:[{scale}]}}>
                    <Checkmark/>
                </Animated.View>
            </View>
        )   
    }

    const deleteHabit = () => {
        console.log("it works!");
    }

    const completeHabit = () => {
        console.log("it works!");
    }
    
    useEffect(() => {
        if (habits.length == 0) 
            get();
    });

    const get = () => {
        fetch('http://localhost:5000/example/get')
            .then(res => res.json())
            .then(data => {
                setHabits(data.ex);
                //setHearts(data.heart);
                console.log(habits);
            })
            .catch();
    }

    return (
        <View style={styles.headContainer}>
            <View style={styles.header}>
                <Menu/>
                <View style={styles.middleComponent}/>
                {/* {hearts.map((data, index) => {
                    return (<Hearts>)
                })} */}
            </View>
            <View style={styles.verticalContainer}>
                <Image style={styles.creature} source={require('../resources/images/Egg.gif')}/>
                <ExperienceBar width='28%'/>
            </View>
            <View style={styles.scrollViewContainer}>
                <Animated.ScrollView showsVerticalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrolling }}}],
                        {useNativeDriver:true},
                    )}
                    decelerationRate={'normal'}>
                    
                    {habits.map((data, index) => {
                            const scale = scrolling.interpolate ({
                                inputRange: [-1, 0, 100 * index, 100 * (index + 1)],
                                outputRange: [1,1,1,0]
                            })

                            const opacity = scrolling.interpolate ({
                                inputRange: [-1, 0, 100 * index, 100 * (index + 0.8)],
                                outputRange: [1,1,1,0]
                            })

                        return (
                                <View>
                                    <Swipeable
                                    renderLeftActions={leftSwipe}
                                    renderRightActions={rightSwipe}
                                    onSwipeableLeftOpen={deleteHabit}
                                    onSwipeableRightOpen={completeHabit}>
                                        <Animated.View style={{opacity, transform: [{scale}]}}>
                                            <Habits name={data.extra} arr={[1, 2, 3, 4, 5, 6, 7]}/>
                                        </Animated.View>  
                                    </Swipeable>
                                    <View style={{height:15}}></View>
                                </View>
                               
                        )
                    })}
                </Animated.ScrollView>
            </View>
        </View>
    );
}

export default HabitsScreen;