import {
    CENSUS_KEY, CCSR_CITY_ZIPS, GEOLEVEL_TO_FEATUREATTR, GEOLEVEL_TO_SELECTION
} from '../../constants';
import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, ReferenceLine
} from 'recharts';
import { useEffect } from 'react';
import { CensusTooltip } from '../../components/tooltip/CensusTooltip';
import green from '@material-ui/core/colors/green';
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

//format the concept for the title of the graph
export function formatConcept(concept){
    return concept.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
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

// ideally to add stats to the graph...
function calculateAverage(dataset, datakey) {
    console.log(dataset)
	const count = dataset.length;
    let item = null;
    let sum = 0;
    for (let i = 0; i < count; i++) {
        item = dataset[i][datakey];
        sum = item + sum;
    }
    return sum/count;
};

export default function CensusBarChart(props) {
    const { dataset, concept } = props;
    const [data, setData] = React.useState({})
    React.useEffect(() => {
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
    }, [dataset, concept])

    return (
        <div className="bar chart">
            <h2 align="center">
                {formatConcept(concept)}
            </h2>
            <ResponsiveContainer width="100%" height={600}>
                <BarChart cx="50%" cy="50%" outerRadius="80%"
                    data={data}
                    margin={{ top: 10, right: 10, left: 40, bottom: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={GEOLEVEL_TO_FEATUREATTR[geoLevel]} >
                        <Label value={geoLevelToTitle[geoLevel]} position="bottom" />
                    </XAxis>
                    <YAxis >
                        <Label value={'Value'} angle={-90} offset={-10} position="insideLeft" />
                    </YAxis>
                    <Tooltip filterNull={false} content={CustomToolTip} />
                    <Bar dataKey={dataset} fill={green[500]} />
                    <ReferenceLine y={calculateAverage(data, dataset)} label={"Average: " + calculateAverage(data, dataset)} stroke='#00bfa5' strokeDasharray="3 3"/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
