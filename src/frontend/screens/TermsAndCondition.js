import React, { useState } from 'react';
import {
	View,
	SafeAreaView,
	Text,
	Image,
	ScrollView,
	StatusBar,
} from 'react-native';

import MenuHeader from '../components/MenuHeader';
import styles from '../styling/TermsAndCondition';

import { useTheme } from '@react-navigation/native';

function TermsAndCondition(props) {
	const { colors } = useTheme();
	const style = styles(colors);

	return (
		<SafeAreaView style={{ height: '100%' }}>
			<MenuHeader
				text='Terms and Condition'
				navigation={props.navigation}
			></MenuHeader>
			<View style={style.headContainer}>
				<Image
					style={style.termsImg}
					source={require('../resources/images/TermsAndCondition.png')}
				/>
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
			</View>
			<HomeButton navigation={props.navigation} colors={colors} />
		</SafeAreaView>
	);
}

//https://reactnative.dev/docs/pixelratio

//<TextInput style={styles.textInput} defaultValue="Name unspecified" value={content} onChangeText={(text)=>setContent(text)}></TextInput>
//<Button title="Add it to the Database" onPress = {() => inputExample()}></Button>

export default TermsAndCondition;
