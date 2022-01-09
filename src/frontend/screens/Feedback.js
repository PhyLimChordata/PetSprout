import React, { useState, useContext } from 'react';
import {
	View,
	SafeAreaView,
	Text,
	TouchableOpacity,
	ScrollView,
	Image,
} from 'react-native';
import { AuthContext } from '../Context';
import androidSafeAreaView from '../styling/AndroidSafeAreaView';
import MenuHeader from '../components/MenuHeader';
import styles from '../styling/Feedback';
import TextBox from '../components/TextBox';
import HomeButton from '../components/HomeButton';
//import Popup from '../components/Popup';

import { useTheme } from '@react-navigation/native';

function Feedback(props) {
	const { colors } = useTheme();
	const style = styles(colors);
	const [feedback, setFeedback] = useState('');
	const [error, setError] = useState('');
	const { getToken } = useContext(AuthContext);

	const attemptSendFeedback = () => {
		console.log(feedback);
		fetch('http://3.15.57.200:5000/api/v1.0.0/user/sendFeedbackReport', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'authentication-token': getToken,
			},
			body: JSON.stringify({
				message: feedback
			}),
		})
			.then((res) => {
				if (feedback == '') {
					setError('This is a required field');
				}
				if (res.status == 200) {
					res.json().then((data) => {
						console.log("Success!");
						//sendFeedback(data.token);
					});
				} else if (res.status == 404) {
					setError('User not found');
				} else if (res.status == 500) {
					setError('Something wrong happened internally...');
				}
			})
			.catch();
	};

	return (
		<SafeAreaView style={androidSafeAreaView().AndroidSafeArea}>
			<MenuHeader
				text='Feedback'
				navigation={props.navigation}
				right={
					<Image
						style={style.feedbackImg}
						source={require('../resources/images/FeedbackLogo.png')}
					/>
				}
			/>
			<View style={style.container}>
				<TextBox
					header={'Message'}
					boxStyle={style.textbox}
					multiline={true}
					setText={setFeedback}
				/>
				<Text style={style.text}>
					Send us your feedback! We would love to hear it!
				</Text>
				<TouchableOpacity 
				activeOpacity={0.6} 
				style={style.feedbackButton}
				onPress={() => {attemptSendFeedback()}}>
					<Text style={style.feedbackButtonText}>Submit</Text>
				</TouchableOpacity>
			</View>
			<HomeButton navigation={props.navigation} colors={colors} />
		</SafeAreaView>
	);
}

export default Feedback;
