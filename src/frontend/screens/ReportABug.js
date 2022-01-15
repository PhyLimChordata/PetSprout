import React, { useState, useContext } from 'react';
import {
	View,
	SafeAreaView,
	Text,
	TouchableOpacity,
	Image,
} from 'react-native';
import androidSafeAreaView from '../styling/AndroidSafeAreaView';
import MenuHeader from '../components/MenuHeader';
import styles from '../styling/ReportABug';
import TextBox from '../components/TextBox';
import HomeButton from '../components/HomeButton';
import Popup from '../components/Popup';
import { AuthContext } from '../Context';
import { useTheme } from '@react-navigation/native';

function ReportABug(props) {
	const { colors } = useTheme();
	const style = styles(colors);
	const [bug, setBug] = useState('');
	const [modalVisible, setModalVisible] = useState(false);
	// let popup;

	const { getToken } = useContext(AuthContext);

	const attemptSendBug = () => {
		//console.log(bug);
		fetch('http://localhost:5000/api/v1.0.0/user/sendBugReport', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'authentication-token': getToken,
			},
			body: JSON.stringify({
				message: bug,
			}),
		})
			.then((res) => {
				if (bug == '') {
					setError('This is a required field');
				}
				if (res.status == 200) {
					res.json().then((data) => {
						console.log('Success!');
					});
				} else if (res.status == 404) {
					setError('User not found');
				} else if (res.status == 500) {
					setError('Something wrong happened internally...');
				}
			})
			.catch();
	};

	// if (bug !== '') {
	// 	popup = (
	// 		<Popup
	// 			modalVisible={modalVisible}
	// 			setModalVisible={setModalVisible}
	// 			style={style.bugConfirmation}
	// 			image={require('../resources/images/EmailPopup.png')}
	// 			title='Thank you for Reporting a Bug!'
	// 			text='An email has been sent and
	//           we will look into it promptly'
	// 		></Popup>
	// 	);
	// } else {
	// 	popup = (
	// 		<Popup
	// 			modalVisible={modalVisible}
	// 			setModalVisible={setModalVisible}
	// 			style={style.bugError}
	// 			image={require('../resources/images/EmailPopup.png')}
	// 			title='Something went wrong...'
	// 			text='An email could not be sent.
	//           Please attempt another time.'
	// 		></Popup>
	// 	);
	// }

	return (
		<SafeAreaView style={androidSafeAreaView().AndroidSafeArea}>
			<MenuHeader
				text='Report a Bug'
				navigation={props.navigation}
				right={
					<Image
						style={style.reportABugImg}
						source={require('../resources/images/ReportABug.png')}
					/>
				}
			/>

			<View style={{flex:1, alignItems: 'center', marginTop:20}}>
				<TextBox
					header={'Message'}
					boxStyle={style.textbox}
					multiline={true}
					setText={setBug}
				/>
				<Text style={style.text}>
					Found a bug? Let us know! We'll get to fixing it!
				</Text>
				<TouchableOpacity
					activeOpacity={0.6}
					style={style.reportABugButton}
					onPress={() => {
						setModalVisible(true);
						attemptSendBug();
					}}
				>
					<Text style={style.reportABugButtonText}>Submit</Text>
				</TouchableOpacity>
				{/* {popup} */}
			</View>
			<HomeButton navigation={props.navigation} colors={colors} />
		</SafeAreaView>
	);
}

export default ReportABug;
