import React, { useEffect, useContext } from 'react';
import settingStyles from '../styling/Settings';
import {
	View,
	Switch,
	Text,
	Dimensions,
	SafeAreaView,
	Image,
	ImageBackground,
} from 'react-native';
import androidSafeAreaView from '../styling/AndroidSafeAreaView';
import { useTheme } from '@react-navigation/native';
import Colours from '../resources/themes/Colours';
import MenuHeader from '../components/MenuHeader';
import HomeButton from '../components/HomeButton';
import TextBox from '../components/TextBox';

import { AuthContext } from '../Context';

// setting data from database

function SettingsPage(props) {
	const [loaded, setLoaded] = React.useState(false);
	const [notif, setNotif] = React.useState(true);
	const [emailNotif, setEmailNotif] = React.useState(true);
	const [voiceNotif, setVoiceNotif] = React.useState(false);
	const [reminder, setReminder] = React.useState(true);
	const [vibration, setVibration] = React.useState(false);
	const [fontSize, setFontSize] = React.useState('13');
	const { getToken } = useContext(AuthContext);
	useEffect(() => {
		const get = () => {
			fetch('http://3.15.57.200:5000/api/v1.0.0/setting/getUserSetting', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'authentication-token': getToken,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					setNotif(data.pushNotification);
					setEmailNotif(data.emailNotification);
					setVoiceNotif(data.voiceNotification);
					setReminder(data.reminder);
					setVibration(data.vibration);
				})
				.catch((err) => console.log(err));
		};

		if (!loaded) {
			get();
			setLoaded(true);
		}
	}, []);

	const { colors } = useTheme();

	let styles = settingStyles(
		colors,
		Dimensions.get('screen').width,
		Dimensions.get('screen').height,
	);

	const OneSetting = (props) => {
		const { colors } = useTheme();

		async function update(value) {
			console.log('value = ' + value);
			props.handle(value);
			console.log('notif: ' + notif);
			console.log('emailnotif = ' + emailNotif);
			console.log('voiceNotif = ' + voiceNotif);
			console.log('reminder = ' + reminder);
			console.log('vibration = ' + vibration);
			return;
		}

		const thumbColor = Colours.Grey.Button;
		return (
			<View style={props.styles.oneSettingContainer}>
				<Text
					style={[
						props.styles.text,
						props.styles.textNormal,
						{ flex: 1, paddingLeft: '7%' },
					]}
				>
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
					value={props.enabled}
					onValueChange={(val) => {
						console.log(props.handle);
						console.log(
							'Previous value for ' + props.tag + ' = ' + props.enabled,
						);
						console.log('Received value for ' + props.tag + ' = ' + val);
						props.handle(
							val,
							fetch(
								'http://3.15.57.200:5000/api/v1.0.0/setting/updateUserSetting',
								{
									method: 'PUT',
									headers: {
										'Content-Type': 'application/json',
										'authentication-token': getToken,
									},
									body: JSON.stringify({
										[props.id]: val,
									}),
								},
							).then((res) => {
								console.log('Updating settings: ' + res.status);
								res
									.json()
									.then((data) => {
										console.log(data);
									})
									.catch((err) => console.log(err));
							}),
						);
					}}
				/>
			</View>
		);
	};

	return (
		<SafeAreaView style={androidSafeAreaView().AndroidSafeArea}>
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
								justifyContent: 'center',
							}}
							source={require('../resources/images/Background.png')}
						>
							<Image
								style={{
									width: Dimensions.get('screen').width * 0.08,
									height: Dimensions.get('screen').width * 0.08,
									margin: Dimensions.get('screen').width * 0.02,
								}}
								source={require('../resources/images/SettingIcon.png')}
							/>
						</ImageBackground>
					</>
				}
			/>
			<View style={[styles.container]}>
				<View style={styles.settingContainer}>
					<Text style={[styles.textTitle, styles.text, { marginBottom: '3%' }]}>
						Notifications
					</Text>
					<OneSetting
						id='pushNotification'
						tag='Use Push Notifications'
						enabled={notif}
						handle={setNotif}
						styles={styles}
					/>
					<OneSetting
						id='emailNotification'
						tag='Use Email Notifications'
						enabled={emailNotif}
						handle={setEmailNotif}
						styles={styles}
					/>
					<OneSetting
						id='voiceNotification'
						tag='Use Voice Notifications'
						enabled={voiceNotif}
						handle={setVoiceNotif}
						styles={styles}
					/>
					<OneSetting
						id='reminder'
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
						header='Font size'
						TextStyle={[styles.textTitle, styles.text]}
						boxStyle={[
							styles.textNormal,
							styles.textDisplay,
							styles.textDisplayMargin,
						]}
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
			<HomeButton navigation={props.navigation} colors={colors} />
		</SafeAreaView>
	);
}

export default SettingsPage;
