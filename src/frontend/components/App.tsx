import * as React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '@theme/index';
import Header from '@components/header/Header';
import Main from '@components/main/Main';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import store from '@configs/configureReduxStore'; 
import RouterConfig from '@router/config';
import Footer from '@components/footer/Footer';

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <SnackbarProvider maxSnack={3}>
                    <MuiThemeProvider theme={theme}>
                        <RouterConfig>
                            <CssBaseline />
                            <Header />
                            <Main />
                            <Footer />
                        </RouterConfig>
                    </MuiThemeProvider>
                </SnackbarProvider>
            </Provider>
        );
    }
}