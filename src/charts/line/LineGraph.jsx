import {
    CENSUS_KEY, CCSR_CITY_ZIPS, GEOLEVEL_TO_FEATUREATTR, GEOLEVEL_TO_SELECTION
} from '../../constants';
import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { useEffect } from 'react';
import { CensusTooltip } from '../../components/tooltip/CensusTooltip';
const census = require('citysdk')

const geoLevelToTitle = {
    'county': 'County',
    'tract': 'Tract',
    'county subdivision': 'County Subdivision',
    'block group': 'Block Group',
    'zip code tabulation area': 'Zip Code Tabulation Area'
}

// default: median household income by zip code
const year = "2018"
const geoLevel = "zip code tabulation area"

//get the cities corresponding with the given zip
export function correspondingCities(zip) {
    let result = Object.keys(CCSR_CITY_ZIPS).filter(key => CCSR_CITY_ZIPS[key].includes(zip))
    return result.join(', ');
}

export function getAPICall(year, geoLevel, dataset, concept) {
    const geoSelection = GEOLEVEL_TO_SELECTION[geoLevel]
    return {
        "vintage": year,
        "geoHierarchy": geoSelection,
        "sourcePath": ["acs", "acs5"],
        "values": [dataset],
        "concept": concept,
        "statsKey": CENSUS_KEY
    };
}

//add commas to values in tooltip for readability
export function addCommas(x) {
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ''
}

// tooltip custom text and background
export function CustomToolTip({ active, payload, label }) {
    if (active && payload) {
        return (
            <CensusTooltip value={payload[0].value} zipCode={label} />
        );
    }
    return null;
};

export default function CensusLineChart(props) {
    const { dataset, concept } = props
    const [dataset, setData] = React.useState()

}

