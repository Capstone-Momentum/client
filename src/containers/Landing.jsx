import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import CensusBarChart from '../charts/line/BarChart';

const useStyles = makeStyles({
    column: {
        height: '70vh',
        padding: '0 4% 0 4%'
    }
})

export default function Landing() {
    const classes = useStyles()

    return (
        <CensusBarChart />
    )
}