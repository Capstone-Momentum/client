import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

// Material UI's theming/styling solution 
// (explained here: https://material-ui.com/customization/theming/ and here https://material-ui.com/styles/basics/)
export const theme = responsiveFontSizes(
    createMuiTheme({
        palette: {
            primary: green,
            secondary: { main: '#00bfa5', },
        },
        status: {
            danger: 'red',
        },
    })
)