import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CensusMap from '../mapping/CensusMap';

const useStyles = makeStyles({
    root: {
        padding: '1% 4% 0 4%'
    }
})

export default function InteractiveMap() {
    const classes = useStyles()

    return (
        <Grid className={classes.root} container direction='column' alignItems='center' justify='center'>
            <Grid item>
                <CensusMap />
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

