import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import classnames from 'classnames';
import Typography from '@material-ui/core/Typography';

export interface Props extends WithStyles<typeof styles> {}

const styles = ({ palette, spacing }: Theme) => createStyles({
    footer: {
        paddingBottom: spacing.unit,
        paddingRight: spacing.unit,
        color: palette.text.primary,
    },
    textFooter: {
        margin: '0 !important',
        padding: '0 !important'
    }
});

class Footer extends React.Component<Props> {
    render() {
        const { classes } = this.props;
        return (
            <footer className={classes.footer} >
                <Typography 
                    variant="caption" 
                    className={classnames(classes.textFooter, "shadowedWhite")} 
                    align="center" 
                    gutterBottom
                >
                    Powered by 100gram
                </Typography>
            </footer>
        );
    }
}

export default withStyles(styles)(Footer);
