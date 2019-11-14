import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { SimpleLineChartExample } from '../charts/line/SimpleLineChart';

const useStyles = makeStyles({
    column: {
        height: '70vh',
        padding: '0 4% 0 4%'
    }
})

export default function Landing() {
    const classes = useStyles()

    return (
        <Grid container direction='row'>
            <Grid item xs={6} container className={classes.column} direction='column' alignItems='center' justify='center' spacing={4}>
                <Grid item>
                    <Typography variant='h3'>
                        Mission Statement
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='body1'>
                        The Hourglass Project is a burgeoning regional movement led by individuals focused on creating new capacity to cultivate, nurture and sustain an economy that works better for all Central Coast residents. The goal is to unite the best minds from business, government, education, philanthropy, and civic leadership – from Vandenberg AFB to Camp Roberts – to advance an economic growth agenda that is inclusive, diverse and cooperative.
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='body1'>
                        With the ambitious goal of fostering a more prosperous economy that works better for all, we are calling on regional leaders to embrace big thinking, bold action, and regional collaboration, in order to shape a vibrant economic future for nearly half a million people.
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={6} container className={classes.column} direction='column' alignItems='center' justify='center' spacing={4}>
                <Grid item>
                    <SimpleLineChartExample />
                </Grid>
            </Grid>
        </Grid>
    )
}