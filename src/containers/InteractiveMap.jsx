import React from 'react';
import { Link, Grid, List, ListItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        height: '20vh',
        padding: '0 4% 0 4%'
    }
})

export default function InteractiveMap() {
    const classes = useStyles()

    return (
        <Grid className={classes.root} container direction='column' alignItems='center' justify='center'>
            <Typography variant='h5'> Potential Options: </Typography>
            <List>
                <ListItem>
                    <Link href='https://uber.github.io/react-map-gl/#/Examples/dynamic-styling'>
                        react-map-gl
                </Link>
                </ListItem>
                <ListItem>
                    <Link href='https://www.react-simple-maps.io/examples/'>
                        react-simple-maps
                </Link>
                </ListItem>
            </List>
        </Grid>
    )
}