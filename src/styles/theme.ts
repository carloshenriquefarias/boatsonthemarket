import {extendTheme} from '@chakra-ui/react'

export const theme = extendTheme({
    colors: {
        gray: {
            "1000": '#181820',
            "900": '#181B23',
            "800": '#1F2029',
            "700": '#353646',
            "600": '#4B4D63',
            "500": '#616480',
            "400": '#797D7A',
            "300": '#9699b0',
            "200": '#B3B5C6',
            "100": '#D1D2DC',
            "50": '#EEEEF2',
        },
        green: {
            "100": '#53BF9D',
            "200": '#00FFC6',
            "300": '#e2e896',
            "400": '#a5cf95',           
        }, 
        blue: {
            "500": '#00102c',
            "400": '#003661',
            "300": '#05548f',
            "200": '#235177',
            "100": '#103153',           
        },
        white: '#FFFFFF',
        red: {
          300: '#C44117',
          200: '#E8BAAB',        
          100: '#F2DFD8'
        }, 
        yellow: {
          300: '#C47F17',
          200: '#DBAC2C',
          100: '#F1E9C9',
        }
    },
    fonts: {
        heading:'Lato',
        body:'Lato',        
    },
    styles: {
        global:{
            body:{
                bg: 'gray.50',
                color:'gray.900'
            }
        }
    }
})  