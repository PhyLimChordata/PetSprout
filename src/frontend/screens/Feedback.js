import React, { useState, useContext } from 'react';
import {
	View,
	SafeAreaView,
	Text,
	TouchableOpacity,
	ScrollView,
	Image,
	TextInput,
} from 'react-native';

import MenuHeader from '../components/MenuHeader';
import styles from '../styling/Feedback';
//import TextBox from '../components/TextBox';

import { AuthContext } from '../Context';
import { useTheme } from '@react-navigation/native';

function Feedback(props) {
	const { colors } = useTheme();
	const style = styles(colors);
	const [feedback, setFeedback] = useState('');
	const [error, setError] = useState('');

	const { sendFeedback } = useContext(AuthContext);

	const attemptSendFeedback = () => {
		fetch('http://localhost:5000/api/v1.0.0/user/sendFeedbackReport', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
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
					console.log("Success!");
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
		<SafeAreaView>
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
				{/*
				<TextBox
					header={'Message'}
					boxStyle={style.textbox}
					multiline={true}
					setText={setFeedback}
					text={feedback}
				/>
				*/}
				<TextInput
					onChangeText={(text) => setFeedback(text)}
					value={feedback}
					style={style.feedbackInput}
					multiline={true}
					numberOfLines={10} 
				/>
				<Text style={style.text}>
					Send us your feedback! We would love to hear it!
				</Text>
				<TouchableOpacity
					activeOpacity={0.6}
				    style={style.feedbackButton}
					onPress={() => {
						attemptSendFeedback()
						console.log(feedback)
						}}>
					<Text style={style.feedbackButtonText}>Submit</Text>
				</TouchableOpacity>
				<Text>{error}</Text>
			</View>
		</SafeAreaView>
	);
}

export default Feedback;
