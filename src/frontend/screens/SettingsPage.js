import React from 'react'
import StyleSheetFactory from '../styling/SettingsStyling'
import headerStyles from '../styling/Header'
import ColorSet from '../resources/themes/Global'
import { View, Switch, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import {SafeAreaView} from 'react-native'; 

// setting data from database

let styles = StyleSheetFactory.getSheet(
    Dimensions.get('screen').width,
    Dimensions.get('screen').height);

function SettingsPage() {

    const handleSettingChange = () => {

    }

    console.log("setting styles  = " + styles);

    return(
        <SafeAreaView>
            <View>
                
            </View>
            <View style={styles.container}>
                
                <View style = {styles.settingContainer}>
                    <TopBar/>
                    <Text style={[styles.textTitle, styles.text]}>Notifications</Text>
                    <OneSetting id="pushNotif"  tag="Use Push Notifications" enabled={false} handle={handleSettingChange}/>
                    <OneSetting id="emailNotif"  tag="Use Email Notifications" enabled={false} handle={handleSettingChange}/>
                    <OneSetting id="voiceNotif"  tag="Use Voice Notifications" enabled={false} handle={handleSettingChange}/>
                    <OneSetting id="dailyReminderToggle"  tag="Set Daily Reminder" enabled={false} handle={handleSettingChange}/>
                    <OneSetting id="vibration"  tag="Vibration" enabled={false} handle={handleSettingChange}/>
                    <Text style={[styles.textTitle, styles.text]}>App version</Text>
                    <View style={styles.textDisplayMargin}>
                    <Text style={[styles.textNormal, styles.textDisplay]}>1.0.0</Text> 
                    </View>
                    <Text style={[styles.textTitle, styles.text]}>Font Size</Text>
                    <View style={styles.textDisplayMargin}>
                    <Text style={[styles.textNormal, styles.textDisplay]}>13</Text> 
                    </View>
                    <Text style={[styles.textTitle, styles.text]}>Screen on Launch</Text>
                    <View style={styles.textDisplayMargin}>
                    <Text style={[styles.textNormal, styles.textDisplay]}>Habits</Text> 
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const OneSetting = (props) => {
    const [enabled, setEnabled] = React.useState(props.enabled)
    const toggleSwitch = () => setEnabled(previousState => !previousState)
    const thumbColor = ColorSet.ButtonGrey;
    return(
        <SafeAreaView style={styles.oneSettingContainer}>
            <Text style={[styles.text, styles.textNormal, { flex: 1 }]}>{props.tag}</Text>
            <Switch
                trackColor={{ false: ColorSet.QuaternaryGreen, true: ColorSet.TertiaryGreen}}
                thumbColor={thumbColor}
                activeThumbColor={thumbColor}
                value={enabled}
                onValueChange={toggleSwitch}/>
        </SafeAreaView>
    )
}

const TopBar = () => {
    return(
        <View style={headerStyles.header}>
            <Text style={headerStyles.textNormal}>Settings</Text>
        </View>
    )
}

export default SettingsPage