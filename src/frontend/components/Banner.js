import React from 'react';
import { TouchableOpacity } from 'react-native';

function Banner(props) {
    return (
        <TouchableOpacity onPress={props.onPress} style={[
            {width: '100%'}, props.bannerStyle]}>
            {props.body}
        </TouchableOpacity>
    );
}
export default Banner;
