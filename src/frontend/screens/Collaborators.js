import React from 'react';
import {View, SafeAreaView, Text, Image, ScrollView, Dimensions} from 'react-native';
import androidSafeAreaView from '../styling/AndroidSafeAreaView';
import MenuHeader from '../components/MenuHeader';
import styles from '../styling/Collaborators';
import HomeButton from '../components/HomeButton';

import { useTheme } from '@react-navigation/native';

function Collaborators(props) {
	const { colors } = useTheme();
	const style = styles(colors);
	const {height, width} = Dimensions.get('window');

	return (
		<SafeAreaView style={androidSafeAreaView().AndroidSafeArea}>
			<MenuHeader
				text='Collaborators'
				navigation={props.navigation}
			></MenuHeader>
			<View style={style.headContainer}>
				<Image
					style={{
						marginTop: 20,
						height: height * 0.22,
						width: height * 0.22,
						resizeMode: 'contain',
					}}					source={require('../resources/images/Collaborators.png')}
				/>
				<ScrollView style= {{flex:1, marginBottom:20}}contentContainerStyle={style.container}>
					<Text style={style.textTitle}>A Special Thanks To</Text>
					<Text style={style.text}>Manola Yvonet</Text>
					<Text style={style.text}>Andy PhyLim</Text>
					<Text style={style.text}>Calvin Cheng</Text>
					<Text style={style.text}>Robert Nichita</Text>
					<Text style={style.text}>Katrina Best</Text>
					<Text style={style.text}>Cheryl Chen</Text>
					<Text style={style.text}>Yuanyuan Li</Text>
					<Text style={style.text}>Darren Liu</Text>
					<Text style={style.text}>Deen Haque</Text>
					<Text style={style.text}>Joevin Chen</Text>
					<Text style={style.text}>Justin Yu</Text>
					<Text style={style.text}>Ryan Sue</Text>
					<Text style={style.text}>Rachelle Willemsma</Text>
					<Text style={style.text}>Prof. Joordens</Text>
				</ScrollView>
				<HomeButton navigation={props.navigation} colors={colors} />
			</View>
		</SafeAreaView>
	);
}

//https://reactnative.dev/docs/pixelratio

//<TextInput style={styles.textInput} defaultValue="Name unspecified" value={content} onChangeText={(text)=>setContent(text)}></TextInput>
//<Button title="Add it to the Database" onPress = {() => inputExample()}></Button>

export default Collaborators;
