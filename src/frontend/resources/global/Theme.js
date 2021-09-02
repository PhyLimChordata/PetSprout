import React from 'React';
import { ThemeProvider } from 'styled-components';

const greenTheme = {
    examplePrimary: '#FF5733',
    white: '#ffffff',
    grey: '#B7BEB0',
    lightgrey: '#E7E7E7',
    someColor: '#EF2723',
  
    ButtonGrey: '#C4C4C4',
    Bronze: '#C6895E',
    Silver: '#A7BFCA',
    Gold: '#FFC93E',

    BackgroundGrey: '#505050',

    Primary: '#F5FEEC',
    Secondary: '#D7F2BA',
    Tertiary: '#B9E8A0',
    Quaternary: '#9CC69B',
    Quinary: '#6E8F6D'
}

const orangeTheme = {
    examplePrimary: '#FF5733',
    white: '#ffffff',
    grey: '#B7BEB0',
    lightgrey: '#E7E7E7',
    someColor: '#EF2723',
  
    ButtonGrey: '#C4C4C4',
    Bronze: '#C6895E',
    Silver: '#A7BFCA',
    Gold: '#FFC93E',

    BackgroundGrey: '#505050',

    Primary: '#FFF8ED',
    Secondary: '#FFE3B9',
    Tertiary: '#FFC977',
    Quaternary: '#DEAD63',
    Quinary: '#A68350',
}

const blueTheme = {
    examplePrimary: '#FF5733',
    white: '#ffffff',
    grey: '#B7BEB0',
    lightgrey: '#E7E7E7',
    someColor: '#EF2723',
  
    ButtonGrey: '#C4C4C4',
    Bronze: '#C6895E',
    Silver: '#A7BFCA',
    Gold: '#FFC93E',

    BackgroundGrey: '#505050',
    
    Primary: '#EFFDFE',
    Secondary: '#BAE0E2',
    Tertiary: '#95D1D4',
    Quaternary: '#8EBDBF',
    Quinary: '#738E8F',
};

const purpleTheme = {
    examplePrimary: '#FF5733',
    white: '#ffffff',
    grey: '#B7BEB0',
    lightgrey: '#E7E7E7',
    someColor: '#EF2723',
  
    ButtonGrey: '#C4C4C4',
    Bronze: '#C6895E',
    Silver: '#A7BFCA',
    Gold: '#FFC93E',

    BackgroundGrey: '#505050',
    
    Primary: '#F8F0FF',
    Secondary: '#D4C2E2',
    Tertiary: '#B493CE',
    Quaternary: '#9983AB',
    Quinary: '#7C6D89',
}

const redTheme = {
    examplePrimary: '#FF5733',
    white: '#ffffff',
    grey: '#B7BEB0',
    lightgrey: '#E7E7E7',
    someColor: '#EF2723',
  
    ButtonGrey: '#C4C4C4',
    Bronze: '#C6895E',
    Silver: '#A7BFCA',
    Gold: '#FFC93E',

    BackgroundGrey: '#505050',
    
    Primary: '#FFECEC',
    Secondary: '#FFBEBE',
    Tertiary: '#FF8D8D',
    Quaternary: '#E37272',
    Quinary: '#A75B5B',
}

const Theme = (props) => {
    let theme = greenTheme;
    switch (props.palette) {
        case 'Green':
            theme = greenTheme;
            break;
        case 'Orange':
            theme = orangeTheme;
            break;
        case 'Blue':
            theme = blueTheme;
            break;
        case 'Purple':
            theme = purpleTheme;
            break;
        case 'Red':
            theme = redTheme;
            break;
        default:
            break;
    }
    return <ThemeProvider theme={theme} {...props} />;
};

export default Theme;