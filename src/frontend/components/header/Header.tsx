import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import { Link } from 'react-router-dom';
import Icon from '@material-ui/icons/Public';
import LoginDialog from '@components/dialogs/LoginDialog';
import RegisterDialog from '@components/dialogs/RegisterDialog';
import { connect } from 'react-redux';
import { register, authenticate, logout, UserThunkDispatch, UserState } from '@actions/user';
import { ApplicationStore } from '@configs/configureReduxStore';
import ExitToApp from '@material-ui/icons/ExitToApp';

const styles = ({ breakpoints }: Theme) => createStyles({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    icon: {
        marginRight: 5
    },
    toolbar: {
        minHeight: 46,
        [`${breakpoints.up('xs')} and (orientation: landscape)`]: {
          minHeight: 38,
        },
        [breakpoints.up('sm')]: {
          minHeight: 54,
        }
    },
    button: {
        color: "white",
        marginLeft: 10,
        [breakpoints.down('sm')]: {
            fontSize: '0.605rem'
        },
    }
});

export interface Props extends WithStyles<typeof styles> {
    regUser: (login: string, password: string, fullname: string) => void;
    login: (login: string, password: string) => void;
    logout: () => void;
    user: UserState;
}

interface DialogStandart {
    isOpened: boolean;
}

interface State {
    loginDialog: DialogStandart;
    registerDialog: DialogStandart;
}

class Header extends React.Component<Props, State> {

    static mapStateToProps(store: ApplicationStore) {
        return { user: store.user };
    }

    static mapDispatchToProps(dispatch: UserThunkDispatch) {
        return { 
            regUser: (login: string, password: string, fullname: string) => (
                dispatch(register(login, password, fullname)) 
            ),
            login: (login: string, password: string) => (
                dispatch(authenticate(login, password)) 
            ),
            logout: () => (
                dispatch(logout()) 
            )
        };
    }

    componentDidMount() {
        this.setState({
            loginDialog: {
                isOpened: false
            },
            registerDialog: {
                isOpened: false
            }
        });
    }

    handleClickOpenLogin = () => {
        this.setState({ loginDialog: { isOpened: true }});
    }

    handleCloseLogin = () => {
        this.setState({ loginDialog: { isOpened: false }});
    }

    handleClickOpenRegister = () => {
        this.setState({ registerDialog: { isOpened: true }});
    }

    handleCloseRegister = () => {
        this.setState({ registerDialog: { isOpened: false }});
    }

    renderControls = () => {
        if (this.props && this.props.user && this.props.user.currentUser) {
            return (
                <>
                    <Typography 
                        variant="h6" 
                        color="inherit" 
                        className={this.props.classes.grow}
                        align="right"
                    >
                        {this.props.user.currentUser.fullname}
                    </Typography>
                    <Button
                        onClick={this.props.logout}
                        className={this.props.classes.button} 
                    >
                        <ExitToApp />
                        Logout
                    </Button>
                </>
            );
        } else {
            const { classes } = this.props;
            return (
                <>
                    <Button
                        onClick={this.handleClickOpenLogin}
                        className={classes.button} 
                    >
                        Login
                    </Button>
                    <LoginDialog 
                        isOpened={this.state ? this.state.loginDialog.isOpened : false} 
                        handleClickOpen={this.handleClickOpenLogin}
                        handleClose={this.handleCloseLogin}
                        loginUser={this.props.login}
                    />
                    <Button 
                        onClick={this.handleClickOpenRegister}
                        className={classes.button} 
                    >
                        Register
                    </Button>
                    <RegisterDialog 
                        isOpened={this.state ? this.state.registerDialog.isOpened : false} 
                        handleClickOpen={this.handleClickOpenRegister}
                        handleClose={this.handleCloseRegister}
                        registerUser={this.props.regUser}
                    />
                </>
            );
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Icon className={classes.icon} />
                    <Typography 
                        variant="h6" 
                        color="inherit" 
                        className={classes.grow}
                    >
                        {"EcoHelp"}
                    </Typography>
                    {this.renderControls()}
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(connect(Header.mapStateToProps, Header.mapDispatchToProps)(Header));
 