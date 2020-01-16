import {
    CALIFORNIA_CODE, CENSUS_KEY, CCSR_COUNTIES
} from '../../constants';
import React from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label
} from 'recharts';
import { useEffect } from 'react';
const census = require('citysdk')

export function getAPICall() {
    return {
        "vintage": "2018",
        "geoHierarchy": {
            "state": CALIFORNIA_CODE,
            "county": CCSR_COUNTIES
        },
        "sourcePath": ["acs", "acs1"],
        "values": ["B19013_001E", "NAME"],
        "statsKey": CENSUS_KEY
    };
}

export default function CensusBarChart() {
    const [data, setData] = React.useState({})
    useEffect(() => {
        let censusPromise = function () {
            return new Promise(function (resolve, reject) {
                census(getAPICall(),
                    (err, res) => {
                        if (!err) {
                            console.log(res);
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

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`Median Household Income: ${payload[0].value}`}</p>
                    <p className="desc">{`County: ${label}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="median income bar chart">
            <h6 align="center">
                Median Household Income per Central Coast County, 2018
            </h6>
            <ResponsiveContainer width="100%" height={600}>
                <BarChart cx="50%" cy="50%" outerRadius="80%"
                    data={data}
                    margin={{ top: 10, right: 10, left: 30, bottom: 30 }}           >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="NAME" >
                        <Label value="County" offset={0} position="bottom" />
                    </XAxis>
                    <YAxis label={{ value: 'Median Household Income', angle: -90, position: "left", textAnchor: "middle" }} />
                    <Tooltip filterNull={false} content={<CustomTooltip />} />
                    <Bar dataKey="B19013_001E" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>

    );
}
