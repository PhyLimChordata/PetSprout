import React, {useRef, useImperativeHandle} from 'react';
import {Text, Animated, View} from 'react-native';
import ColorSet from "../resources/themes/Global";
import Modal from "react-native-modal";

function Popup(props) {
    return (
        <Modal
            testID={'modal'}
            isVisible={props.modalVisible}
            onBackdropPress={() => props.setModalVisible(false)}
            onSwipeComplete={(e) => {
                props.setModalVisible(false)
            }}
            useNativeDriverForBackdrop
            swipeDirection={['down']}>
            <View style={{height:200, width:100, backgroundColor:'red'}}> </View>
        </Modal>
    );
}

export default Popup;
