import React, {useState} from 'react';
import Toggle from 'react-native-toggle-element';

import {View, Text, TouchableOpacity, SafeAreaView, Image} from 'react-native';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ColorSet from "../resources/themes/Global";
const ThemeCircle = ({color, onPress, selected}) => (
    <View>

        <TouchableOpacity style={{alignItems:"center", justifyContent:'center', flexDirection:'row', height:44,width:44,borderRadius:22,backgroundColor:selected ? ColorSet.QuinaryGreen:color}} onPress={onPress}>
            {selected ? <View style={{alignItems:"center", flexDirection:'row', height:30,width:30,borderRadius:15,backgroundColor: color}}/>:<></>}
        </TouchableOpacity>
    </View>
)
const Tab = ({icon, onPress, title, isImage = false}) => (
        <TouchableOpacity style={{alignItems:"center", flexDirection:'row',width:"100%"}} onPress={onPress}>
            {isImage ?
                <Image source={icon}
                       resizeMode="contain"
                       style={{
                           width:40,
                           height:40,
                           tintColor: ColorSet.TertiaryGreen,
                           // transform: [ { rotate: rotate }]
                       }}
                />
                :
                <MaterialCommunityIcons name={icon} color={ColorSet.TertiaryGreen} size={40} />
            }
            <Text style={{ textAlign:'center', color:ColorSet.TertiaryGreen, fontSize: 20, fontWeight: "bold"}}> {title} </Text>
        </TouchableOpacity>
)


function SideMenu(props) {
    const [color, setColor] = useState("green");
    const [toggleValue, setToggleValue] = useState(false);
    return (
        <Modal
            swipeDirection="left"
            onSwipeComplete={(e) => {props.setModalVisible(false)}}
            transparent={true}
            backdropOpacity={0.2}
            style={{margin: 0}}
            isVisible={props.modalVisible}
            animationIn="slideInLeft"
            animationOut="slideOutLeft"

        >
            <View style={{
                height: "100%",
                width: "80%",
                backgroundColor:ColorSet.BackgroundGrey,
            }}>
                <SafeAreaView>

                <View style={{marginHorizontal:10}}>
                    <View style={{flexDirection:'row', justifyContent: 'space-between',  alignItems:'center', marginBottom:20}}>
                        <View style={{flexDirection:'row', alignItems:'center', flex:1}}>
                                <TouchableOpacity style={{justifyContent:"center", marginRight:20}} onPress={() => console.log('dsauda')}>
                                    <View style={{ backgroundColor:ColorSet.TertiaryGreen, width:50, height:50,borderRadius:25}}>
                                    </View>
                                </TouchableOpacity>
                            <Text style={{fontSize: 20, fontWeight: "bold", color:ColorSet.TertiaryGreen, textAlign:'center', }}>PhyLimChdordata</Text>
                        </View>
                        <TouchableOpacity style={{height:40, justifyContent:'center'}}onPress={() => props.setModalVisible(false)}>
                            <MaterialCommunityIcons name="cog" color={"white"} size={40} />
                        </TouchableOpacity>
                    </View>
                    <View style={{marginHorizontal:20, marginBottom:20}}>
                        <Text style={{fontSize: 18, color:ColorSet.TertiaryGreen, textAlign:'center', marginBottom:10 }}>"What you choose to struggle in is what you’ll ultimately become.”</Text>
                        <Text style={{fontSize: 18, color:ColorSet.TertiaryGreen, textAlign:'right', }}> - Mark Manson </Text>
                    </View>
                    <View style={{marginLeft:20, height:500, justifyContent:'space-between', marginBottom:30}}>
                        <Tab icon={'star'} title={'Achievements'}/>
                        <Tab icon={'account-circle'} title={'Account'}/>
                        <Tab icon={'bullhorn'} title={'Feedback'}/>
                        <Tab icon={'bug'} title={'Report a Bug'}/>
                        <Tab icon={'account-group'} title={'Collaborators'}/>
                        <Tab icon={'hand-heart'} title={'Support Us!'}/>
                        <Tab icon={require("../resources/images/icon.png")} title={'About'} isImage={true}/>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}}>
                        <ThemeCircle color={ColorSet.TertiaryGreen} selected={color == 'green'} onPress={() => setColor("green")}/>
                        <ThemeCircle color={"#FFC977"} selected={color == 'yellow'} onPress={() => setColor("yellow")}/>
                        <ThemeCircle color={"#95D1D4"} selected={color == 'blue'} onPress={() => setColor("blue")}/>
                        <ThemeCircle color={"#B493CE"} selected={color == 'purple'} onPress={() => setColor("purple")}/>
                        <ThemeCircle color={"#FF8D8D"} selected={color == 'red'} onPress={() => setColor("red")}/>
                    </View>
                </View>
                    <View>
                        {/*<Toggle value={toggleValue} onPress={(val) => setToggleValue(val)} />*/}
                    </View>
                    {/*<Toggle*/}
                    {/*    value={toggleValue}*/}
                    {/*    onPress={(newState) => setToggleValue(newState)}*/}
                    {/*    disabled*/}
                    {/*    leftComponent={*/}
                    {/*        <MaterialCommunityIcons name={"star"} color={ColorSet.TertiaryGreen} size={30} />*/}
                    {/*    }*/}
                    {/*    rightComponent={*/}
                    {/*        <MaterialCommunityIcons name={"bug"} color={ColorSet.TertiaryGreen} size={30} />*/}
                    {/*    }*/}
                    {/*/>*/}

            </SafeAreaView>
        </View>
        </Modal>
    );
}

export default SideMenu;
