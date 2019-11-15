import React from 'react';
import { Grid, List, ListItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        height: '20vh',
        padding: '0 4% 0 4%'
    }
})

export default function Initiatives() {
    const classes = useStyles()

    return (
        <Grid className={classes.root} container direction='column' alignItems='center' justify='center'>
            <Typography variant='h5'> Initiatives </Typography>
            <List>
                <ListItem>
                    <Typography> Aerospace and Defense </Typography>
                </ListItem>
                <ListItem>
                    <Typography> Education </Typography>
                </ListItem>
            </List>
        </Grid>
    )
}