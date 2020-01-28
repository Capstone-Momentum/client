import React from 'react';
import { Grid, Paper, List, ListItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        height: '20vh',
        padding: '0 4% 0 4%'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}))

export default function Initiatives() {
    const classes = useStyles()

    return (
        <div>
            <Typography variant='h5' align='center'> Initiatives </Typography>
            <Grid className={classes.root} container direction='row' alignItems='center' justify='center'>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        Aerospace
                </Paper>
                </Grid>
                <Grid item xs={9}>
                    <Paper className={classes.paper}>
                        Additional Data
                </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        Defense
                </Paper>
                </Grid>
                <Grid item xs={9}>
                    <Paper className={classes.paper}>
                        Additional Data
                </Paper>
                </Grid>
            </Grid>
        </div>
    )
}