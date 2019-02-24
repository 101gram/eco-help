import * as React from 'react';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = ({ spacing }: Theme) => createStyles({
    content: { 
        backgroundColor: "inherit",
        maxWidth: 650,
        margin: 'auto',
        padding: `${spacing.unit * 8}px 10px ${spacing.unit * 6}px`,
        justifySelf: 'center'
    }

});

export interface Props extends WithStyles<typeof styles> {
    handleClickGetStarted: () => void;
}

class Information extends React.Component<Props>{
    render() {
        const { classes } = this.props;
        return(
            <div className={classes.content}>
                <Typography 
                    variant="h1" 
                    align="center" 
                    style={{color: '#fff'}}
                    className="shadowedBalck"
                >
                    Eco<wbr />Help
                </Typography>
                <br/>
                <Typography 
                    variant="h6" 
                    align="center" 
                    color="textSecondary" 
                    style={{color: '#fff'}}
                    className="shadowedBalck"
                    paragraph
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. 
                </Typography>
                <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                    <Button size="large" variant="contained" color="primary" onClick={this.props.handleClickGetStarted}>
                        Get Started
                    </Button> 
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Information);