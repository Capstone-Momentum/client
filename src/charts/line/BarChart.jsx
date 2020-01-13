import { SLO_LATITUDE, SLO_LONGITUDE, CALIFORNIA_CODE, SLO_COUNTY_CODE, CENSUS_KEY 
} from '../../constants';
import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
const census = require('citysdk')

// export default class SimpleBarChart extends PureComponent {
//   static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';
//   constructor(props) {
//     super(props)
//     //     const selection = {
//     //         "selection": "B19013_001E",
//     //         "label": "Estimate!!Median household income in the past 12 months (in 2018 inflation-adjusted dollars)",
//     //         "concept": "MEDIAN HOUSEHOLD INCOME IN THE PAST 12 MONTHS (IN 2018 INFLATION-ADJUSTED DOLLARS)",
//     //         "predicateType": "int",
//     //         "group": "B19013",
//     //         "limit": 0,
//     //         "attributes": "B19013_001M,B19013_001MA,B19013_001EA"
//     //         }

//     // const data = census({
//     //     "vintage" : "2018",
//     //     "geoHierarchy" : {
//     //         "state": CALIFORNIA_CODE,
//     //         "county": SLO_COUNTY_CODE,
//     //     },
//     //     "sourcePath" : ["acs", "acs1"],  
//     //     "values" : [selection],
//     //     "statsKey" : CENSUS_KEY
//     //     }, 
//     //     (err, res) => console.log(res)
//     //     )
//     //     console.log(data)
//     }
//   // we want to use B19013_001E (Median household income in the past 12 months)
// }

export default function CensusBarChart() {
    const [data, setData] = React.useState({})
    let censusPromise = function (){
        return new Promise(function (resolve, reject){
            census({
                "vintage" : "2018",
                "geoHierarchy" : {
                    "state": CALIFORNIA_CODE,
                    "county": "*",
                },
                "sourcePath" : ["acs", "acs1"],  
                "values" : ["B19013_001E"],
                "statsKey" : CENSUS_KEY
            },
            (err, res) => {
                if (!err){
                    resolve(res);
                } 
                else{ reject(err); }})})}
    let getCensusData = async function () {
        let censusJSON = await censusPromise();
        return { data: censusJSON };}
    const retrieveData = async () => {
        const result = await getCensusData();
        setData(result.data);
    }
    retrieveData();
        return (
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5,}}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="county" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="county" fill="#8884d8" />
            <Bar dataKey="B19013_001E" fill="#8884d8" />
            </BarChart>
        );
    }
