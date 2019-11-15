import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        height: '10vh',
        padding: '0 4% 0 4%'
    }
})

export default function Tutorials() {
    const classes = useStyles()

    return (
        <Grid className={classes.root} container direction='column' alignItems='center' justify='center'>
            <Typography variant='h5'> Tutorials </Typography>
        </Grid>
    )
}