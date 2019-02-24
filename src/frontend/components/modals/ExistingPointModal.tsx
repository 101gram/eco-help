import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';


const styles = ({}: Theme) => createStyles({

});
  

export interface Props extends WithStyles<typeof styles> {
    startDate: Date;
    creatorName: string;
    expectedMembers: number;
    currentMembers: number;
    description: string;
    isOpen: boolean;
    onClose: () => void;
}

class ExistingPointDialog extends React.Component <Props> {

    toValueHtmlString = (date: Date) => {
        const y = date.getFullYear();
        const m = `${(date.getMonth() + 1) > 9 ? '' : '0'}${(date.getMonth() + 1)}`; // getMonth() is zero-based
        const d = `${date.getDate() > 9 ? '' : '0'}${date.getDate()}`;
        return `${y}-${m}-${d}`;
    }

    handleClose = () => {
        this.props.onClose();
    }

    handleJoin = () => {
        this.props.onClose();
    }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.isOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Pollution</DialogTitle>
          <DialogContent>
            <label>Description:</label>
            <p>this.props.description</p>
            <label>Creator:</label>
            <p>this.props.creatorName</p>
            <label>Current Members:</label>
            <p>this.props.currentMembers</p>
            <label>Expected Members:</label>
            <p>this.props.expectedMembers</p>
            <label>Start date:</label>
            <p>this.props.startDate</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleJoin} color="primary">
              Add Event
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


export default withStyles(styles)(ExistingPointDialog);