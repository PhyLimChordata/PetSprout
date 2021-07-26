import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

function Menu(props) {
    const menuClicked = () => {

    };
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={() => menuClicked}>
            <Image style={{ flex:1, 
                            width: 30,
                            height: 25,
                            alignItems: "left" }} 
                    source={require('../resources/images/Menu.png')}/>
        </TouchableOpacity>
    );
}

export default Menu;
