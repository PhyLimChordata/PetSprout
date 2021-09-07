import React from 'react'
import styles from '../styling/SettingsStyling'
import headerStyles from '../styling/Header'
import { View, Switch, Text, Image, TouchableOpacity } from 'react-native'
import {SafeAreaView} from 'react-native';
import {useTheme} from '@react-navigation/native';

// setting data from database

function SettingsScreen() {

    const handleSettingChange = () => {

    }

    const {colors} = useTheme();

    return(
        <SafeAreaView>
            <View>
                <TopBar/>
            </View>
            <View style={styles(colors).container}>
                <View style = {styles(colors).settingContainer}>
                    <Text style={[styles(colors).textTitle, styles(colors).text]}>Notifications</Text>
                    <OneSetting id="pushNotif"  tag="Use Push Notifications" enabled={false} handle={handleSettingChange}/>
                    <OneSetting id="emailNotif"  tag="Use Email Notifications" enabled={false} handle={handleSettingChange}/>
                    <OneSetting id="voiceNotif"  tag="Use Voice Notifications" enabled={false} handle={handleSettingChange}/>
                    <OneSetting id="dailyReminderToggle"  tag="Set Daily Reminder" enabled={false} handle={handleSettingChange}/>
                    <OneSetting id="vibration"  tag="Vibration" enabled={false} handle={handleSettingChange}/>
                    <Text style={[styles(colors).textTitle, styles(colors).text]}>App version</Text>
                    <View style={styles(colors).textDisplayMargin}>
                    <Text style={[styles(colors).textNormal, styles(colors).textDisplay]}>1.0.0</Text> 
                    </View>
                    <Text style={[styles(colors).textTitle, styles(colors).text]}>Font Size</Text>
                    <View style={styles(colors).textDisplayMargin}>
                    <Text style={[styles(colors).textNormal, styles(colors).textDisplay]}>13</Text> 
                    </View>
                    <Text style={[styles(colors).textTitle, styles(colors).text]}>Screen on Launch</Text>
                    <View style={styles(colors).textDisplayMargin}>
                    <Text style={[styles(colors).textNormal, styles(colors).textDisplay]}>Habits</Text> 
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const OneSetting = (props) => {
    const {colors} = useTheme();
    const [enabled, setEnabled] = React.useState(props.enabled)
    const toggleSwitch = () => setEnabled(previousState => !previousState)
    const thumbColor = colors.ButtonGrey;
    return(
        <View style={styles(colors).oneSettingContainer}>
            <Text style={[styles(colors).text, styles(colors).textNormal]}>{props.tag}</Text>
            <Switch
                style={styles(colors).switchStyling}
                trackColor={{ false: colors.Quaternary, true: colors.Tertiary}}
                thumbColor={thumbColor}
                activeThumbColor={thumbColor}
                value={enabled}
                onValueChange={toggleSwitch}/>
        </View>
    )
}

const TopBar = () => {
    const {colors} = useTheme();
    return(
        <View style={headerStyles(colors).header}>
            <TouchableOpacity activeOpacity={0.6} onPress={() => menuClicked}>
			<Image
                    style={{ flex: 1, width: 30, height: 25 }}
                    source={require('../resources/images/BackButton.png')}
                />
            </TouchableOpacity>
            <Text style={headerStyles(colors).textNormal}>Settings</Text>
        </View>
    )
}

export default SettingsScreen;