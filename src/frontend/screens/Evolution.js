import React, {useRef, useState} from 'react';
import { Animated, SafeAreaView, TouchableOpacity, Text, Image, Dimensions } from 'react-native';

import styles from '../styling/ComingSoon';
import MenuHeader from '../components/MenuHeader';

import { useTheme } from '@react-navigation/native';

function Evolution(props) {
    const { colors } = useTheme();
    let zoomValue = useRef(new Animated.Value(1)).current;
    let xValue = useRef(new Animated.Value(0)).current;
    let yValue = useRef(new Animated.Value(0)).current;
    let backgroundOpacity = useRef(new Animated.Value(0)).current;
    let petOpacity = useRef(new Animated.Value(1)).current;

    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;

    const [selected, setSelected] = useState(null);
    const handleAnimation = (x, y, id) => {

        Animated.timing(zoomValue, {
            toValue: 2,
            duration: 2000,
            useNativeDriver: true
        }).start()
        setSelected(id)
            Animated.timing(xValue, {
                toValue: x,
                duration: 2000,
                useNativeDriver: true
            }).start()
            Animated.timing(yValue, {
                toValue: y,
                duration: 2000,
                useNativeDriver: true
            }).start()
            Animated.timing(backgroundOpacity, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true
            }).start()
        Animated.timing(petOpacity, {
            toValue: 0.3,
            duration: 2000,
            useNativeDriver: true
        }).start()
    }
    const resetSelect = () => {
        Animated.timing(zoomValue, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start()
        Animated.timing(xValue, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true
        }).start()
        Animated.timing(yValue, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true
        }).start()
        Animated.timing(petOpacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start()
        Animated.timing(backgroundOpacity, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true
        }).start(() => setSelected(null))


    }


    function Button(props) {
        const { colors } = useTheme();
        return (<TouchableOpacity onPress={props.onPress} style={{height:50, width:175, marginTop:20, backgroundColor:colors.Quaternary, justifyContent:'center', alignItems:'center', borderRadius:20, marginHorizontal:10}}>
            <Text style={{						fontSize: 20,
                fontWeight: 'bold',
                color: colors.background,}}>
                {' '}
                {props.text}{' '}</Text>
        </TouchableOpacity>)
    }
    return (
        <>
        <SafeAreaView style={[styles(colors).headContainer]}>
            <MenuHeader hideRight={true} text={"Evolution"} navigation={props.navigation} />
            <TouchableOpacity disabled={selected != null} style={{position:"absolute", top:height*0.20, left:width*0.35}} onPress={() => handleAnimation('0%', height*0.10, 1)}>
                <Animated.Image
                    style={selected == 1 ? {transform: [{ scale: zoomValue}, {translateX: xValue}, {translateY: yValue}], resizeMode:'stretch' } : selected != null && {opacity:petOpacity}} source={require('../resources/images/Evolutions/LegsSilhouette.png')}/>
            </TouchableOpacity>
            <TouchableOpacity disabled={selected != null} style={{position:"absolute", top:height*0.5, left:width*0.05}} onPress={() => handleAnimation(width*0.15, height* -0.05, 2)}>
                <Animated.Image
                    style={selected == 2 ? {transform: [{ scale: zoomValue}, {translateX: xValue}, {translateY: yValue}],resizeMode:'stretch'  }: selected != null && {opacity:petOpacity}} source={require('../resources/images/Evolutions/FinSilhouette.png')}/>
            </TouchableOpacity>
            <TouchableOpacity disabled={selected != null} style={{position:"absolute", top:height*0.5, right:width*0.05}} onPress={() => handleAnimation(width*-0.13, height* -0.05, 3)}>
                <Animated.Image
                    style={selected == 3 ? {transform: [{ scale: zoomValue}, {translateX: xValue}, {translateY: yValue}],resizeMode:'stretch', zIndex:1 }: selected != null && {opacity:petOpacity}} source={require('../resources/images/Evolutions/WingSilhouette.png')}/>
            </TouchableOpacity>
            {selected != null &&
            <Animated.View style={{opacity:backgroundOpacity, top:'70%', alignItems:'center'}}>
                <Button text="EVOLVE" onPress = {() => console.log('EVOLVE')}></Button>
                <Button text="CANCEL" onPress = {() => resetSelect()}></Button>
            </Animated.View>}


        </SafeAreaView>
    <Animated.View style={{height:'100%', width:'100%', backgroundColor: 'rgba(0,0,0,0.3)', opacity:backgroundOpacity, position:"absolute", zIndex:-1}}/>

        </>
    );
}

export default Evolution;
