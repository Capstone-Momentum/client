import React, { useEffect } from 'react';
import CensusMapGL from './CensusMapGL';
import Autocomplete from '../components/autocomplete/Autocomplete';
import VirtualizedAutocomplete from '../components/autocomplete/VirtualizedAutocomplete'
import { Typography } from '@material-ui/core';

// TODOS:
// - search functionality for the selection (variable)

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

    useEffect(() => {
        const getSelectionOptions = async () => {
            const selectionsForVintageURL = `https://api.census.gov/data/${vintage.vintage}/acs/acs5/variables.json`
            console.log(selectionsForVintageURL)
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

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="body1">
                {`${selection.concept}: ${selection.label.replace(/!!/g, ' ')}`}
            </Typography>
            <div style={{ height: '1vh' }} />
            <CensusMapGL vintage={vintage.vintage} geoLevel={geoLevel.geoLevel} selection={selection.selection} />
            <div style={{ height: '1vh' }} />
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
            <div style={{ display: 'flex', flexDirection: 'row', padding: '2%', width: '70vw', justifyContent: 'center' }}>
                <Autocomplete
                    label='Vintage'
                    value={vintage}
                    onChange={(e, v) => setVintage(v)}
                    options={availableVintages}
                    optionLabelAttr='vintage'
                    disableClearable
                />
                <div style={{ width: '1vw' }} />
                <Autocomplete
                    label='Geography Level'
                    value={geoLevel}
                    onChange={(e, v) => setGeoLevel(v)}
                    options={availableGeoLevels}
                    optionLabelAttr='geoLevel'
                    disableClearable
                />
            </div>
        </div>
    )
}