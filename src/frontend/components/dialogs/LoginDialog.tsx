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
    loginUser: (login: string, password: string) => void;
}

interface State {
    login: string;
    password: string; 
}

export default class FormDialog extends React.Component<Props, State> {
    state = {
        login: "",
        password: ""
    };

    close = (event: any) => {
        this.props.loginUser(this.state.login, this.state.password);
        this.props.handleClose();
        event.preventDefault();
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
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
            <DialogTitle id="form-dialog-title">Login</DialogTitle>
            <form onSubmit={this.close} onReset={this.props.handleClose}>
                <DialogContent>
                    <DialogContentText>
                        To register to this website, please enter your fullname, login and password here.
                    </DialogContentText>
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
                            Login
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}