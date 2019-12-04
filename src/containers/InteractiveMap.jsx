import React from 'react';
import CensusMap from '../mapping/CensusMap';

export default function InteractiveMap() {
    return (
        <CensusMap />
    )
}

// All queriable variables https://api.census.gov/data/{vintage}/acs/{acs5 | acs1}/variables.json

/*
Potential geoLevels within the county:
    tract
    county subdivision
    block group
*/

