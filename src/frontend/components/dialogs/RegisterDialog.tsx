import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
    isOpened: boolean;
    handleClickOpen: () => void;
    handleClose: () => void;
    registerUser: (login: string, password: string, fullname: string) => void;
}

interface State {
    login: string;
    password: string; 
    fullname: string;
}

export default class RegisterDialog extends React.Component<Props, State> {
    state = {
        login: "",
        password: "",
        fullname: ""
    };

    close = (event: any) => {
        this.props.registerUser(this.state.login, this.state.password, this.state.fullname);
        this.props.handleClose();
        event.preventDefault();
    }

    changeFullName = (e: any) => {
        this.setState({fullname: e.target.value});
    }

    changeLogin = (e: any) => {
        this.setState({login: e.target.value});
    }

    changePasword = (e: any) => {
        this.setState({password: e.target.value});
    }

    render() {
        return (
            <Dialog
                open={this.props.isOpened}
                onClose={this.close}
                aria-labelledby="form-dialog-title"
            >
            <DialogTitle id="form-dialog-title">Register</DialogTitle>
            <form onSubmit={this.close} onReset={this.props.handleClose}>
                <DialogContent>
                    <DialogContentText>
                        To register to this website, please enter your fullname, login and password here.
                    </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="fulname"
                            label="Fullname"
                            type="text"
                            inputProps={{
                                minLength: 5,
                                maxLength: 20
                            }}
                            onChange={this.changeFullName}
                            fullWidth
                            variant="outlined"
                            required
                        />
                        <TextField
                            margin="dense"
                            id="login"
                            label="Login"
                            type="text"
                            inputProps={{
                                minLength: 5,
                                maxLength: 20
                            }}
                            fullWidth
                            onChange={this.changeLogin}
                            variant="outlined"
                            required
                        />
                        <TextField
                            margin="dense"
                            id="pass"
                            label="Password"
                            type="password"
                            onChange={this.changePasword}
                            inputProps={{
                                minLength: 8,
                                maxLength: 20
                            }}
                            fullWidth
                            variant="outlined"
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button type="reset" color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Register
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}