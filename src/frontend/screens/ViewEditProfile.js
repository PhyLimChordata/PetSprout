import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ColorSet from '../resources/themes/Global.js';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Typography } from '@material-ui/core';
import { ThemeProvider } from '@react-navigation/native';

const theme = createMuiTheme({
    typography: {
        fontFamily: 'Roboto',
    },
    palette: {
        primary: {
            main: ColorSet.PrimaryGreen,
        },
        secondary: {
            main: ColorSet.SecondaryGreen,
        },
        background: {
            main: 'white',
            dark: Colors.BackgroundGrey,
        }
    }
});

function ProfileEdit(props){
    return(
        <View>
           <EditBox tag="Username" defaultValue="My username"/> 
        </View>
        
    );
}

const EditBox = (props) => {
    return(
        <ThemeProvider theme={theme}>
            <Typography>{props.tag}</Typography>
            <TextField
                variant="standard"
                size="small"
                defaultValue={props.defaultValue}
                {...props.multiline}
                />
        </ThemeProvider>
    );
};

export default ProfileEdit