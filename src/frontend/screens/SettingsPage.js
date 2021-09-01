import React from 'react'
import styles from '../styling/SettingsStyling'
import headerStyles from '../styling/Header'
import ColorSet from '../resources/themes/Global'
import { View, Switch, Text, Image, TouchableOpacity } from 'react-native'
import {SafeAreaView} from 'react-native';

// setting data from database

function SettingsPage() {

    const handleSettingChange = () => {

    }

    return(
        <SafeAreaView>
            <View>
                <TopBar/>
            </View>
            <View style={styles.container}>
                <View style = {styles.settingContainer}>
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
        <View style={styles.oneSettingContainer}>
            <Text style={[styles.text, styles.textNormal]}>{props.tag}</Text>
            <Switch
                style={styles.switchStyling}
                trackColor={{ false: ColorSet.Green.Quaternary, true: ColorSet.Green.Tertiary}}
                thumbColor={thumbColor}
                activeThumbColor={thumbColor}
                value={enabled}
                onValueChange={toggleSwitch}/>
        </View>
    )
}

const TopBar = () => {
    return(
        <View style={headerStyles.header}>
            <TouchableOpacity activeOpacity={0.6} onPress={() => menuClicked}>
			<Image
                    style={{ flex: 1, width: 30, height: 25 }}
                    source={require('../resources/images/back-button.png')}
                />
            </TouchableOpacity>
            <Text style={headerStyles.textNormal}>Settings</Text>
        </View>
    )
}

export default SettingsPage