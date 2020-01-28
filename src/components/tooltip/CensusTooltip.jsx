import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Typography } from '@material-ui/core';
import { addCommas } from '../../mapping/CensusMapGL';
import { correspondingCities } from '../../charts/line/BarChart';

const useStyles = makeStyles({
    card: {
        backgroundColor: 'white'
    },
    tooltipText: {
        textTransform: 'capitalize',
        whiteSpace: 'nowrap',
    }
})

export function CensusTooltip(props) {
    const { value, zipCode } = props
    const classes = useStyles()
    return (
        <Card className={classes.card} elevation={3}>
            <CardContent>
                <Typography className={classes.tooltipText} variant='body1'>
                    {`Value: ${addCommas(value)}`}
                </Typography>
                <Typography className={classes.tooltipText} variant='body1'>
                    {`Zip Code: ${zipCode} (${correspondingCities(zipCode)}))`}
                </Typography>
            </CardContent>
        </Card>
    )
}
