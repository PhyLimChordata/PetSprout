import React, { useState } from 'react';
import { View } from 'react-native';
import Header from '../components/MenuHeader';
import CollaboratorContent from '../components/collaboratorContents';

function Collaborators(props) {
	const [content, setContent] = useState('name');
	const [extra, setExtra] = useState('extra');

	const inputExample = () => {
		fetch('http://localhost:5000/collaborators/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: content,
			}),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch();

		props.navigation.navigate('TabTwo');
	};

	return (
		<View>
			<Header text='Collaborators'></Header>
			<CollaboratorContent></CollaboratorContent>
		</View>
	);
}

//https://reactnative.dev/docs/pixelratio

//<TextInput style={styles.textInput} defaultValue="Name unspecified" value={content} onChangeText={(text)=>setContent(text)}></TextInput>
//<Button title="Add it to the Database" onPress = {() => inputExample()}></Button>

export default Collaborators;
