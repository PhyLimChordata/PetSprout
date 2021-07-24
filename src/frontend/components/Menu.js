import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

function Menu(props) {
    console.log(props)
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.menuClicked}>
            <Image style={{ flex:1, 
                            width: 30,
                            height: 25 }} 
                    source={require('../resources/images/Menu.png')}/>
        </TouchableOpacity>
    );
}

export default Menu;
