import React, { useState } from 'react';
import {
	View,
	SafeAreaView,
	Text,
	TouchableOpacity,
	ScrollView, Image,
} from 'react-native';

import MenuHeader from '../components/MenuHeader';
import styles from '../styling/Feedback';
import TextBox from '../components/TextBox';
//import Popup from '../components/Popup';

import { useTheme } from '@react-navigation/native';

function Feedback(props) {
	const { colors } = useTheme();
	const style = styles(colors);
	const [feedback, setFeedback] = useState('');

	return (
		<SafeAreaView>
			<MenuHeader text='Feedback' navigation={props.navigation} right={
				<Image
					style={style.feedbackImg}
					source={require('../resources/images/FeedbackLogo.png')}
				/>
			}>
			</MenuHeader>
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
					<TouchableOpacity activeOpacity={0.6} style={style.feedbackButton}>
						<Text style={style.feedbackButtonText}>Submit</Text>
					</TouchableOpacity>
				</View>
		</SafeAreaView>
	);
}

export default Feedback;
