import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CreateEventPointThunkDispatch, createEventPoint } from '@actions/createEventPoint';
import { UserState } from '@actions/user';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { Maybe } from '@common/interfaces';
import InputTypeFile from '@components/partials/inputTypeFile';
import { connect } from 'react-redux';
import { ApplicationStore } from '@configs/configureReduxStore';
import { CreateEventPointRequest } from '@graphql/generated';

const styles = ({}: Theme) => createStyles({

});
  

export interface Props extends WithStyles<typeof styles> {
    currentCords: Maybe<google.maps.LatLng>;
    isOpen: boolean;
    onClose: () => void;
    user: UserState;
    create: (req: CreateEventPointRequest) => void;
}

interface State {
  file: any;
  textFieldValue: string;
  numberValue: number;
  dateOfEvent: string;
}

class NewPointDialog extends React.Component <Props> {

    static mapStateToProps(store: ApplicationStore) {
        return {user: store.user};
    }

    static mapDispatchToProps(dispatch: CreateEventPointThunkDispatch) {
        return { 
            create: (req: CreateEventPointRequest) => (
                dispatch(createEventPoint(req)) 
            ),
        };
    }

    toValueHtmlString = (date: Date) => {
        const y = date.getFullYear();
        const m = `${(date.getMonth() + 1) > 9 ? '' : '0'}${(date.getMonth() + 1)}`; // getMonth() is zero-based
        const d = `${date.getDate() > 9 ? '' : '0'}${date.getDate()}`;
        return `${y}-${m}-${d}`;
    }

    state: State = {
        file: null,
        textFieldValue: "",
        numberValue: 2,
        dateOfEvent: this.toValueHtmlString(new Date())
    };

    handleClose = () => {
        this.props.onClose();
    }

    handleAdd = () => {
        const lat = this.props.currentCords!.lat();
        const lon = this.props.currentCords!.lng();
        this.props.create({
            location: {
                lat,
                lon
            },
            description: this.state.textFieldValue,
            expectedMembers: this.state.numberValue,
            startDate: this.state.dateOfEvent
        });
        this.props.onClose();
    }
    
    onFileLoad = (_e: any, file: any) => {
        this.setState({
            file
        });
    }

    handleTextFieldChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> = (event) => {
        this.setState({
            textFieldValue: event.target.value
        });
    }

    handleNumberFieldChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> = (event) => {
        this.setState({
            numberValue: event.target.value
        });
    }

    handleDateFieldChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> = (event) => {
        console.log(this.state.dateOfEvent);
        this.setState({
            dateOfEvent: event.target.value
        });
        
    }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.isOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Pollution</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To leave a new pollution mark and ask for help for its cleaning.
            </DialogContentText>
            <TextField
                onChange={this.handleTextFieldChange}
                margin="dense"
                id="name"
                label="Description"
                fullWidth
                multiline={true}
                rows={6}
                rowsMax={6}
                required={true}
            />
            <div>
                <InputTypeFile fileTypeRegex={/.*(.img|.jpg|.png)$/} onFileLoad={this.onFileLoad}> 
                    <Button>
                        Upload
                    </Button> 
                </InputTypeFile> 
            </div>
            <TextField
                id="standard-number"
                label="QuantityOfPeople"
                value={this.state.numberValue}
                onChange={this.handleNumberFieldChange}
                type="number"
                inputProps={{ min: "2", max: "10", step: "1" }}
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
            />
            <div>
                <div>
                    <label style={{color: "rgba(0, 0, 0, 0.54)", paddingBottom: "3px"}}>Date of event: </label><br />
                </div>
                <input 
                    type="date" 
                    id="start" 
                    name="trip-start"
                    value={this.state.dateOfEvent}
                    onChange={this.handleDateFieldChange}
                />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleAdd} color="primary">
              Add Event
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


export default connect(NewPointDialog.mapStateToProps, NewPointDialog.mapDispatchToProps)(withStyles(styles)(NewPointDialog));