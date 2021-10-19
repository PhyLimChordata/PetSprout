import React, { useState } from 'react';
import {
	View,
	SafeAreaView,
	Text,
	TouchableOpacity,
	ScrollView,
	Image,
} from 'react-native';

import MenuHeader from '../components/MenuHeader';
import styles from '../styling/ReportABug';
import TextBox from '../components/TextBox';
import Popup from '../components/Popup';

import { useTheme } from '@react-navigation/native';

function ReportABug(props) {
	const { colors } = useTheme();
	const style = styles(colors);
	const [bug, setBug] = useState('');
	const [modalVisible, setModalVisible] = useState(false);
	let popup;

	if (bug !== '') {
		popup = (
			<Popup
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				style={style.bugConfirmation}
				image={require('../resources/images/EmailPopup.png')}
				title='Thank you for Reporting a Bug!'
				text='An email has been sent and
                we will look into it promptly'
				button={false}
			></Popup>
		);
	} else {
		popup = (
			<Popup
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				style={style.bugError}
				image={require('../resources/images/EmailPopup.png')}
				title='Something went wrong...'
				text='An email could not be sent. 
                Please attempt another time.'
				button={false}
			></Popup>
		);
	}

	return (
		<SafeAreaView>
			<MenuHeader text='Report a Bug' navigation={props.navigation}>
				<Image
					style={style.reportABugImg}
					source={require('../resources/images/ReportABug.png')}
				/>
			</MenuHeader>
			<ScrollView contentContainerStyle={style.container}>
				<View style={style.container}>
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
						onPress={() => setModalVisible(true)}
					>
						<Text style={style.reportABugButtonText}>Submit</Text>
					</TouchableOpacity>
					{popup}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default ReportABug;

/*


*/
