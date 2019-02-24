import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
    primary: { main: '#1B5E20' },
    secondary: { main: '#004D40' }
};

export default createMuiTheme({ palette, typography: { useNextVariants: true }});