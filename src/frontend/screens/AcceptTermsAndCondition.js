import React, { useState } from 'react';
import {
	View,
	SafeAreaView,
	Text,
	Image,
	ScrollView,
	TouchableOpacity,
	StatusBar,
	
} from 'react-native';

import androidSafeAreaView from '../styling/AndroidSafeAreaView';
import styles from '../styling/TermsAndCondition';
import { ThemeProvider, useTheme } from '@react-navigation/native';
import { Checkbox } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MenuHeader from '../components/MenuHeader';
import HomeButton from '../components/HomeButton';


function AcceptTermsAndCondition(props) {
	const { colors } = useTheme();
	const style = styles(colors);
	const [status, setState] = useState('unchecked')
	const [disabled, setEnable] = useState(true)
	const [greyed, setStyle] = useState(0.6)
	const [show, setShow] = useState(props.route.params.isAcceptScreen)
	
	const checkSwitch = () => {
		if (status == 'unchecked')
		{
			setState('checked')
		}
		else
		{
			setState('unchecked')
		}
		enableButton()
		switchStyle()
	}

	const switchStyle = () => {
		if (greyed == 0.6)
		{
			setStyle(1)
		}
		else
		{
			setStyle(0.6)
		}
	}

	const enableButton = () => {
		setEnable(!disabled)
	}

	const getStyle = () => {
		if (show == true) {
			return style.headContainerAccept
		}
		else {
			return style.headContainer
		}
	}

	return (
		<SafeAreaView style={androidSafeAreaView().AndroidSafeArea}>
			{!show &&
			<MenuHeader
				text='Terms and Condition'
				navigation={props.navigation}
			></MenuHeader>
			}
			<View style={getStyle()}>
				<Image
					style={style.termsImg}
					source={require('../resources/images/TermsAndCondition.png')}
				/>
				{show &&
				<Text style={style.textTop}>
					Terms and Conditions
				</Text>
				}
				<ScrollView
					style={style.scrollView}
					contentContainerStyle={style.container}
				>
					{/*TODO: WRITE TERMS OF SERVICE*/}
					<Text style={style.textTitle}>A. Overview</Text>
					<Text style={style.text}>
						Please review the terms and conditions ("terms") carefully as the
						following information regards the use of your personal information.
					</Text>
					<Text style={style.textTitle}>B. Privacy</Text>
					<Text style={style.text}>
						You agree to allow HabiPets to use your data for research purposes.
						We will not distribute the information in any public way.
					</Text>
					<Text style={style.textTitle}>C. Sensitivity</Text>
					<Text style={style.text}>
						Please review the terms and conditions ("terms") carefully as the
						following information regards the use of your personal information.
					</Text>
					<Text style={style.textTitle}>A. Overview</Text>
					<Text style={style.text}>
						Please review the terms and conditions ("terms") carefully as the
						following information regards the use of your personal
					</Text>
				</ScrollView>
				{show &&
				<View style = {style.center}>
					<View style = {style.checkboxContainer}>
						<View
							style={{
								borderColor: colors.Quaternary,
								borderWidth: 2,
								borderRadius:5,
								marginLeft:-10,
								marginRight:10
						}}>
						<Checkbox
							status = {status}
							onPress = {checkSwitch}
							uncheckedColor = {style.textTop.color}
							color = {style.textTop.color}
						/>
						</View>
						<Text style = {style.text}>
							I have read, understood and agreed to the Terms and Conditions that apply with the use of PetSprout.
						</Text>
					</View>
					<View opacity = {greyed}>
					<TouchableOpacity
						disabled = {disabled}
						activeOpacity={0.6}
						style={style.aboutButton}
						onPress={() => {
							if (status == 'checked')
							{
							props.navigation.navigate('AcceptPrivacyPolicyScreen');
							}
						}}
					>
						<Text style={style.aboutButtonText}>Accept</Text>
					</TouchableOpacity>
					</View>
				</View>
				}
			</View>
			{!show &&
			<View style = {style.spacer}>
			<HomeButton navigation={props.navigation} colors={colors}/>
			</View>
			}
		</SafeAreaView>
	);
}

//https://reactnative.dev/docs/pixelratio

//<TextInput style={styles.textInput} defaultValue="Name unspecified" value={content} onChangeText={(text)=>setContent(text)}></TextInput>
//<Button title="Add it to the Database" onPress = {() => inputExample()}></Button>

export default AcceptTermsAndCondition;
