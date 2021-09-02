import React from 'react';
import {View, Text, Image, Platform} from 'react-native';
import { useResponsiveHeight } from 'react-native-responsive-dimensions';

import styles from '../styling/Tabs';
import ColorSet from '../resources/global/themes';

// Similar to a screen, however components will be contained within a screen
function CollaboratorContent(props) {
    var text = {
        marginTop: Platform.OS === 'ios' ? 0 : 5,
        paddingTop: useResponsiveHeight(1),
        paddingBottom: useResponsiveHeight(1),
        minPaddingBottom: 10,
        fontWeight: "bold",
        fontSize: useResponsiveHeight(3),
        color: ColorSet.Green.Quaternary
    }
    var textTitle = {
        paddingBottom: useResponsiveHeight(2),
        flex: 3,
        fontWeight: "bold",
        fontSize: useResponsiveHeight(5),
        color: ColorSet.Green.Quaternary
    }
    var collabImg = {
        width: useResponsiveHeight(20),
        height: useResponsiveHeight(20),
        marginBottom: useResponsiveHeight(3),
        marginTop: -50
    }
    var container = {
        flex: 10,
        flexDirection: "column",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-around"
    }

    return (
        <View style={container}>
            <Image style={collabImg} source={require('../resources/assets/collabLogo.png')} />
            <Text style={textTitle}>A Special Thanks To</Text>
            <Text style={text}>Manola Yvonet</Text>
            <Text style={text}>Andy PhyLim</Text>
            <Text style={text}>Calvin Cheng</Text>
            <Text style={text}>Katrina Best</Text>
            <Text style={text}>Cheryl Chen</Text>
            <Text style={text}>Tuan Zi Li</Text>
            <Text style={text}>Rachelle Willemsma</Text>
            <Text style={text}>Prof. Joordens</Text>
        </View>
    );
}

export default CollaboratorContent;