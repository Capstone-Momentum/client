import React, { useEffect } from 'react';
import CensusMapGL from './CensusMapGL';
import Autocomplete from '../components/autocomplete/Autocomplete';
import VirtualizedAutocomplete from '../components/autocomplete/VirtualizedAutocomplete'
import { Typography, CardContent, Card, Divider, Grid, Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '2%'
    },
    cardContent: {
        height: '100%'
    },
    outerGridColumn: {
        height: '100%',
        padding: '4% 0 4% 0'
    },
    innerGridColumn: {
        width: '95%'
    },
    sidebar: {
        padding: '2%',
        height: '100%'
    },
    lowercaseTypography: {
        textTransform: 'lowercase'
    },
    button: {
        color: '#2195F2'
    }
}))

const availableVintages = [
    { vintage: "2010" },
    { vintage: "2013" },
    { vintage: "2014" },
    { vintage: "2015" },
    { vintage: "2016" },
    { vintage: "2017" },
    { vintage: "2018" },
]

const availableGeoLevels = [
    { geoLevel: 'tract' },
    { geoLevel: 'county subdivision' },
    { geoLevel: 'block group' },
    { geoLevel: 'zip code tabulation area' },
]

const defaultSelection = {
    "selection": "B20005_028E",
    "label": "Estimate!!Total!!Male!!Other!!With earnings",
    "concept": "SEX BY WORK EXPERIENCE IN THE PAST 12 MONTHS BY EARNINGS IN THE PAST 12 MONTHS (IN 2017 INFLATION-ADJUSTED DOLLARS) FOR THE POPULATION 16 YEARS AND OVER",
    "predicateType": "int",
    "group": "B20005",
    "limit": 0,
    "attributes": "B20005_028M,B20005_028MA,B20005_028EA"
}

const defaultSelections = [defaultSelection]

export default function CensusMap(props) {
    const [vintage, setVintage] = React.useState({ vintage: "2016" })
    const [geoLevel, setGeoLevel] = React.useState({ geoLevel: 'county subdivision' })
    const [selection, setSelection] = React.useState(defaultSelection)
    const [selections, setSelections] = React.useState(defaultSelections)
    const classes = useStyles()

    useEffect(() => {
        const getSelectionOptions = async () => {
            const selectionsForVintageURL = `https://api.census.gov/data/${vintage.vintage}/acs/acs5/variables.json`
            const response = await fetch(selectionsForVintageURL, { method: 'GET' })
            let selectionsForVintage = await response.json()
            selectionsForVintage = selectionsForVintage.variables
            const selectionsForVintageFlattened = []
            Object.keys(selectionsForVintage).forEach(sKey => {
                selectionsForVintageFlattened.push(
                    {
                        selection: sKey,
                        ...selectionsForVintage[sKey]
                    }
                )
            })
            setSelections(selectionsForVintageFlattened)
            setSelection(selectionsForVintageFlattened[3])
        }
        getSelectionOptions()
    }, [vintage])

    const sidebar = (
        <Card className={classes.sidebar} elevation={4}>
            <CardContent className={classes.cardContent}>
                <Grid className={classes.outerGridColumn} container direction='column' justify='space-between'>
                    <Grid className={classes.innerGridColumn} item container direction='column' spacing={2}>
                        <Grid item>
                            <Typography variant='h5'>
                                Interact with the Map
                        </Typography>
                        </Grid>
                        <Grid item>
                            <Divider />
                        </Grid>
                        <Grid item container direction='row' justify='space-between'>
                            <Grid item>
                                <Autocomplete
                                    label='Vintage'
                                    value={vintage}
                                    onChange={(e, v) => setVintage(v)}
                                    options={availableVintages}
                                    optionLabelAttr='vintage'
                                    disableClearable
                                />
                            </Grid>
                            <Grid item>
                                <Button className={classes.button} size='small'>
                                    Help?
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Autocomplete
                                label='Geography Level'
                                value={geoLevel}
                                onChange={(e, v) => setGeoLevel(v)}
                                options={availableGeoLevels}
                                optionLabelAttr='geoLevel'
                                disableClearable
                            />
                        </Grid>
                        <Grid item>
                            <VirtualizedAutocomplete
                                label='Selection'
                                value={selection}
                                onChange={(e, v) => setSelection(v)}
                                options={selections}
                                getOptionLabel={option => {
                                    return (option && option.concept && option.label) ? (option.concept + ': ' + option.label.replace(/!!/g, ' ')) : ''
                                }}
                                disableClearable
                                style={{ width: '100%', paddingBottom: '1vh' }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container direction='row' justify='space-between' wrap='nowrap'>
                        <Grid item container direction='row' spacing={2}>
                            <Grid item>
                                <Button className={classes.button}>
                                    Undo
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button className={classes.button}>
                                    Clear
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item container direction='row' spacing={2} justify='flex-end'>
                            <Grid item>
                                <Button className={classes.button}>
                                    Share
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button className={classes.button}>
                                    Export
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )

    const labeledMap = (
        <Grid item container direction='column' xs={8} spacing={2}>
            <Grid item>
                <Container className={classes.container}>
                    <CensusMapGL vintage={vintage.vintage} geoLevel={geoLevel.geoLevel} selection={selection.selection} />
                </Container>
            </Grid>
            <Grid item>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h6">
                            Concept <br />
                        </Typography>
                        <Typography className={classes.lowercaseTypography} variant="body1">
                            {`${selection.concept}`}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h6">
                            Label <br />
                        </Typography>
                        <Typography className={classes.lowercaseTypography} variant="body1">
                            {`${selection.label.replace(/!!/g, ' ')}`}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )

    return (
        <Grid className={classes.root} container direction='row' spacing={4}>
            <Grid item xs={4}>
                {sidebar}
            </Grid>
            {labeledMap}
        </Grid>
    )
}