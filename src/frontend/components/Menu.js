import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

function Menu(props) {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.menuClicked}>
            <Image style={{width: 30, height: 25, resizeMode: 'contain'}}
                   source={require('../resources/images/Menu.png')}/>
        </TouchableOpacity>
    );
}

export default Menu;