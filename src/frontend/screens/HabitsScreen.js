import React, { useState, useEffect} from 'react';
import { View, Image, Animated } from 'react-native';

import styles from '../styling/HabitsScreen'
import Habits from '../components/Habits'
import Menu from '../components/Menu'
import ExperienceBar from '../components/ExperienceBar'

function HabitsScreen(props) {
    const [habits, setHabits] = useState([]);
    const [hearts, setHearts] = useState([]); 
    const scrolling = React.useRef(new Animated.Value(0)).current;
    
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
                <ExperienceBar/>
            </View>
            <View style={styles.scrollViewContainer}>
                <Animated.ScrollView showsVerticalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrolling }}}],
                        {useNativeDriver:true},
                    )}>
                    
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
                            <Animated.View style={{opacity, transform: [{scale}]}}>
                                <Habits name={data.extra} arr={[1, 2, 3, 4, 5, 6, 7]}/>
                            </Animated.View>
                        )
                    })}
                </Animated.ScrollView>
            </View>
        </View>
    );
}

export default HabitsScreen;