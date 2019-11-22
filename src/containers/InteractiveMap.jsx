import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MapGL from '../mapping/MapGL';

const useStyles = makeStyles({
    root: {
        height: '90vh',
        padding: '0 4% 0 4%'
    }
})

export default function InteractiveMap() {
    const classes = useStyles()
    const selection = 'B16008_041E'

    return (
        <Grid className={classes.root} container direction='column' alignItems='center' justify='center'>
            <Grid item>
                <MapGL vintage={2016} geoLevel="county subdivision" selection={selection} />
            </Grid>
        </Grid>
    )
}

// All queriable variables https://api.census.gov/data/{vintage}/acs/{acs5 | acs1}/variables.json

/*
Potential geoLevels within the county:
    tract
    county subdivision
    block group
*/

