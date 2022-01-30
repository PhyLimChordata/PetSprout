import React from 'react';
import { View, Text, Image } from 'react-native';
import Banner from "./Banner";
import Colours from "../resources/themes/Colours";
import {useTheme} from "@react-navigation/native";

function MissedHabitBanner(props) {
    const { colors } = useTheme();
    return (
        <Banner bannerStyle={{paddingVertical:10, alignItems:'center', backgroundColor:Colours.Red.NotSelected, marginTop:10}}
                onPress={props.onPress}
                body={
                    <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal:10}}>
                        <View style={{flexDirection: 'row', justifyContent:'flex-start', flex: 1}}>
                            <Image resizeMode={'contain'}source={require('../resources/images/DoubleExclamation.png')}/>
                        </View>
                        <View>
                            <Text style={{textAlign:'center', color:colors.background, fontSize:18}}>
                                Looks like you missed some habits!
                            </Text>
                            <Text style={{textAlign:'center', color:colors.background, fontSize:14}}>
                                try not to miss a habit 3x in a row
                            </Text>
                        </View>
                        <View style={{flex:1}}>
                        </View>
                    </View>}/>
    );
}
export default MissedHabitBanner;
