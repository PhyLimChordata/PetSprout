import React, { useState } from 'react';
import { View, SafeAreaView, Text, Image, Dimensions } from 'react-native';

import MenuHeader from '../components/MenuHeader';
import styles from '../styling/CollaboratorsStyling';

import { useTheme } from '@react-navigation/native';

function Collaborators(props) {
	const { colors } = useTheme();
	
	return (
		<SafeAreaView>
			<MenuHeader text='Collaborators' navigation={props.navigation}></MenuHeader>
			<View style={styles(colors).container}>
				<Image
					style={styles(colors).collabImg}
					source={require('../resources/images/Collaborators.png')}
				/>
				<Text style={styles(colors).textTitle}>A Special Thanks To</Text>
				<Text style={styles(colors).text}>Manola Yvonet</Text>
				<Text style={styles(colors).text}>Andy PhyLim</Text>
				<Text style={styles(colors).text}>Calvin Cheng</Text>
				<Text style={styles(colors).text}>Katrina Best</Text>
				<Text style={styles(colors).text}>Cheryl Chen</Text>
				<Text style={styles(colors).text}>Tuan Zi Li</Text>
				<Text style={styles(colors).text}>Rachelle Willemsma</Text>
				<Text style={styles(colors).text}>Prof. Joordens</Text>
			</View>
		</SafeAreaView>
	);
}

//https://reactnative.dev/docs/pixelratio

//<TextInput style={styles.textInput} defaultValue="Name unspecified" value={content} onChangeText={(text)=>setContent(text)}></TextInput>
//<Button title="Add it to the Database" onPress = {() => inputExample()}></Button>

export default Collaborators;
