import {
    CENSUS_KEY, CCSR_COUNTIES, CCSR_CITY_ZIPS, CCSR_CITIES, CCSR_ZIPS, CCSR_SUBDIVS, CCSR_TRACTS, CCSR_BLOCKS
} from '../../constants';
import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label
} from 'recharts';
import { useEffect } from 'react';
const census = require('citysdk')

const geoLevelToSelection = {
    'county': { 'county': CCSR_COUNTIES },
    'tract': { 'tract': CCSR_TRACTS },
    'county subdivision': { 'county-subdivision': CCSR_SUBDIVS },
    'block group': { 'block group': CCSR_BLOCKS },
    'zip code tabulation area': { 'zip code tabulation area': CCSR_ZIPS }
}

const geoLevelToFeatureAttribute = {
    'county': 'NAME',
    'tract': 'tract',
    'county subdivision': 'NAME',
    'block group': 'block-group',
    'zip code tabulation area': 'zip-code-tabulation-area'
}

const geoLevelToTitle = {
    'county': 'County',
    'tract': 'Tract',
    'county subdivision': 'County Subdivision',
    'block group': 'Block Group',
    'zip code tabulation area': 'Zip Code Tabulation Area'
}

// median household income by zip code
const year = "2018"
const geoLevel = "zip code tabulation area"
const dataset = "B19013_001E"
const concept = "MEDIAN HOUSEHOLD INCOME IN THE PAST 12 MONTHS (IN 2018 INFLATION-ADJUSTED DOLLARS)"
const formatConcept = concept.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');

//get the cities corresponding with the given zip
export function correspondingCities(zip) {
    let result = Object.keys(CCSR_CITY_ZIPS).filter(key => CCSR_CITY_ZIPS[key].includes(zip))
    return result.join(', ');
}

export function getAPICall(year, geoLevel, dataset, concept) {
    const geoSelection = geoLevelToSelection[geoLevel]
    return {
        "vintage": year,
        "geoHierarchy": geoSelection,
        "sourcePath": ["acs", "acs5"],
        "values": [dataset],
        "concept": concept,
        "statsKey": CENSUS_KEY
    };
}

// tooltip custom text and background
export const CustomToolTip = ({ active, payload, label }) => {
    console.log(active);
    console.log(payload);
    if (active && payload) {
        const tooltip = {
            backgroundColor: 'white',
            opacity: '0.9',
            border: '1px solid black',
            borderRadius: '15px',
            paddingLeft: '10px',
            paddingRight: '10px'
        }
        return (
            <div className="custom-tooltip" style={tooltip} >
                <p className="label">{`${formatConcept}: ${payload[0].value}`}</p>
                <p className="desc">{`${geoLevelToTitle[geoLevel]}: ${label} (${correspondingCities(label)})`}</p>
            </div>
        );
    }
    return null;
};

export default function CensusBarChart() {
    const [data, setData] = React.useState({})
    useEffect(() => {
        let censusPromise = function () {
            return new Promise(function (resolve, reject) {
                // this is where we would populate the API call
                census(getAPICall(year, geoLevel, dataset, concept),
                    (err, res) => {
                        if (!err) {
                            resolve(res);
                        }
                        else { reject(err); }
                    })
            })
        }

        const retrieveData = async () => {
            const result = await censusPromise();
            setData(result);
        }
        retrieveData();
    }, [])

    return (
        <div className="bar chart">
            <h2 align="center">
                {formatConcept} per Central Coast {geoLevelToTitle[geoLevel]} in {year}
            </h2>
            <ResponsiveContainer width="100%" height={600}>
                <BarChart cx="50%" cy="50%" outerRadius="80%"
                    data={data}
                    margin={{ top: 10, right: 10, left: 40, bottom: 30 }}           >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={geoLevelToFeatureAttribute[geoLevel]} >
                        <Label value={geoLevelToTitle[geoLevel]} position="bottom" />
                    </XAxis>
                    <YAxis >
                        <Label value={formatConcept} angle={-90} offset={-1} position="insideBottomLeft" width={542} />
                    </YAxis>
                    <Tooltip filterNull={false} content={CustomToolTip} />
                    <Bar dataKey={dataset} fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
