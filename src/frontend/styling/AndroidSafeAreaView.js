import { StyleSheet, Platform, StatusBar } from 'react-native';

const androidSafeView = () => {
    console.log("Android safe view")
    console.log(StatusBar.currentHeight);
    StyleSheet.create({
        AndroidSafeArea: {
			flex: 1,
			backgroundColor: "white",
			paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
		},
    })
}

export default androidSafeView;