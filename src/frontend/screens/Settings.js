import React from 'react';
import settingStyles from '../styling/Settings';
import { View, Switch, Text, Dimensions, SafeAreaView, Image, ImageBackground } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Colours from '../resources/themes/Colours';
import MenuHeader from '../components/MenuHeader';
import TextBox from '../components/TextBox'

// setting data from database

function SettingsPage(props) {
	const[notif, setNotif] = React.useState(true);
	const[emailNotif, setEmailNotif] = React.useState(true);
	const[voiceNotif, setVoiceNotif] = React.useState(false);
	const[reminder, setReminder] = React.useState(true);
	const[vibration, setVibration] = React.useState(false);
	const[fontSize, setFontSize] = React.useState(13);

	const handleSettingChange = () => {};

	const {colors} = useTheme();

	let styles = settingStyles(
		colors,
		Dimensions.get('screen').width,
		Dimensions.get('screen').height
	);
	console.log('setting styles  = ' + styles);

	return (
		<SafeAreaView>
			<MenuHeader
				back={true}
				text={'Settings'}
				navigation={props.navigation}
				right={
					<>
						<ImageBackground
							style={{
								width: Dimensions.get('screen').width * 0.1,
								height: Dimensions.get('screen').width * 0.1,
								alignItems: 'center',
								justifyContent: 'center'
							}}
							source={require('../resources/images/Background.png')}
						>
							<Image
								style={{
									width: Dimensions.get('screen').width * 0.08,
									height: Dimensions.get('screen').width * 0.08,
									margin: Dimensions.get('screen').width * 0.02
								}}
								source={require('../resources/images/SettingIcon.png')}
							/>
						</ImageBackground>
					</>
				}
			/>
			<View style={styles.container}>
				<View style={styles.settingContainer}>
					<Text style={[styles.textTitle, styles.text]}>Notifications</Text>
					<OneSetting
						id='pushNotif'
						tag='Use Push Notifications'
						enabled={notif}
						handle={setNotif}
						styles={styles}
					/>
					<OneSetting
						id='emailNotif'
						tag='Use Email Notifications'
						enabled={emailNotif}
						handle={setEmailNotif}
						styles={styles}
					/>
					<OneSetting
						id='voiceNotif'
						tag='Use Voice Notifications'
						enabled={voiceNotif}
						handle={setVoiceNotif}
						styles={styles}
					/>
					<OneSetting
						id='dailyReminderToggle'
						tag='Set Daily Reminder'
						enabled={reminder}
						handle={setReminder}
						styles={styles}
					/>
					<OneSetting
						id='vibration'
						tag='Vibration'
						enabled={vibration}
						handle={setVibration}
						styles={styles}
					/>
					
					<Text style={[styles.textTitle, styles.text]}>App version</Text>
					<View style={styles.textDisplayMargin}>
						<Text style={[styles.textNormal, styles.textDisplay]}>1.0.0</Text>
					</View>
					<TextBox
						header="Font size"
						TextStyle={[styles.textTitle, styles.text]}
						boxStyle={[styles.textNormal, styles.textDisplay, styles.textDisplayMargin]}
						text={fontSize}
						value={fontSize}
						setText={setFontSize}
					/>
					<Text style={[styles.textTitle, styles.text]}>Screen on Launch</Text>
					<View style={styles.textDisplayMargin}>
						<Text style={[styles.textNormal, styles.textDisplay]}>Habits</Text>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
}

const OneSetting = (props) => {
	const [enabled, setEnabled] = React.useState(props.enabled);
	const toggleSwitch = () => setEnabled((previousState) => !previousState);
	const { colors } = useTheme();

	const thumbColor = Colours.Grey.Button;
	return (
		<SafeAreaView style={props.styles.oneSettingContainer}>
			<Text style={[props.styles.text, props.styles.textNormal, { flex: 1 }]}>
				{props.tag}
			</Text>
			<Switch
				style={props.styles.switchStyling}
				trackColor={{
					false: colors.Quaternary,
					true: colors.Tertiary,
				}}
				thumbColor={thumbColor}
				activeThumbColor={thumbColor}
				value={enabled}
				onValueChange={toggleSwitch}
			/>
		</SafeAreaView>
	);
};

export default SettingsPage;
