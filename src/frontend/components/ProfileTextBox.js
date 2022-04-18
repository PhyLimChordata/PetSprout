import React, { useEffect, useContext } from 'react';
import {
	Text,
	TextInput,
	SafeAreaView,
} from 'react-native';;
import { useFonts, Roboto_900Black } from '@expo-google-fonts/roboto';
import { useTheme } from '@react-navigation/native';

const EditBox = (props) => {
    let styles = props.styles
    const [text, onChangeText] = React.useState(props.place);
    const [focused, onSelected] = React.useState(false);

    const handleChange = (text) => {
        onChangeText(text);
        props.handle(text);
    };

    useEffect(() => {}, [focused]);


    return (
        <SafeAreaView style={styles.formContainer}>
            <Text
                style={[
                    styles.textTitle,
                    styles.text,
                    { fontWeight: '900' },
                    props.error && props.tag === 'Username' ? styles.textInputError : null
                ]}>
                {props.tag}
            </Text>
            <TextInput
                onFocus={() => onSelected(true)}
                onBlur={() => onSelected(false)}
                onChangeText={(text) => handleChange((props.id, text))}
                value={text}
                style={
                    props.mult ?
                            styles.textMultiInput
                        :
                            [
                                styles.textInput,
                                styles.text,
                                focused ? styles.textInputSelected : null,
                                props.error ? styles.textInputError : null
                            ]
                }
                multiline={props.mult}
                numberOfLines={props.numLines}
            />
        </SafeAreaView>
    );
};

export default EditBox
