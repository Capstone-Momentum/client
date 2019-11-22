import React, { useEffect } from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';
import { SLO_LATITUDE, SLO_LONGITUDE, CALIFORNIA_CODE, SLO_COUNTY_CODE, CENSUS_KEY } from '../constants';
let chroma = require("chroma-js");
const census = require('citysdk')
let _ = require("lodash");

// Sources: 
//  - https://github.com/uscensusbureau/citysdk
//  - https://github.com/uscensusbureau/citysdk/blob/master/examples/mapbox/with-mapbox-gl_geocoding/src/index.js
// Reference for adding onHover: https://github.com/uber/react-map-gl/blob/5.1-release/examples/geojson/src/app.js
// Potential alternative free solution to mapping: https://www.react-simple-maps.io/examples/

export default function MapGL(props) {
    const { vintage, geoLevel, selection, viewportDefault } = props
    const [data, setData] = React.useState({})
    const [layer, setLayer] = React.useState({})
    const [viewport, setViewport] = React.useState(
        viewportDefault ? viewportDefault : {
            width: '80vw',
            height: '80vh',
            latitude: SLO_LATITUDE,
            longitude: SLO_LONGITUDE,
            zoom: 8
        })

    useEffect(() => {
        let quantiles = 10;
        let colorScale = chroma.scale(["#ffffff", "#000000"]).domain([0, 1]);

        let censusPromise = function () {
            return new Promise(function (resolve, reject) {
                const geoHierarchy = {
                    "state": CALIFORNIA_CODE,
                    "county": SLO_COUNTY_CODE,
                }
                geoHierarchy[geoLevel] = '*'
                census({
                    "vintage": vintage,
                    "geoHierarchy": geoHierarchy,
                    "sourcePath": ["acs", "acs5"],
                    "values": [selection],
                    "statsKey": CENSUS_KEY,
                    "geoResolution": "500k"
                }, function (err, json) {
                    if (!err) {
                        resolve(json);
                    } else {
                        reject(err);
                    }
                });
            });
        };

        let quantileMaker = function (min, max) {
            let diff = max - min;
            let bucket = diff / quantiles;
            let dataScale = Array.apply(null, { length: quantiles })
                .map(Number.prototype.valueOf, 0)
                .map(function (val, idx) { return idx === 0 ? min : (this.acc += bucket) }, { acc: min });
            let normalScale = dataScale
                .map(function (val, idx) { return idx === 0 ? Math.round((min + 1 / max) * 100) / 100 : val / max });
            let chromaScale = normalScale.map(function (val) { return colorScale(val).hex() });
            return _.zip(dataScale, chromaScale);
        };

        let getCensusData = async function () {
            let censusGeoJSON = await censusPromise();
            let features = censusGeoJSON.features;
            let maxStat = _.maxBy(features, function (o) {
                return o.properties[selection];
            });
            let maxVal = maxStat.properties[selection];
            let minStat = _.minBy(features, function (o) {
                return o.properties[selection];
            });
            let minVal = minStat.properties[selection];
            let scale = quantileMaker(minVal, maxVal);
            return { data: censusGeoJSON, stops: scale };
        };

        const retrieveMapData = async () => {
            const result = await getCensusData()
            setLayer({
                id: 'data',
                type: 'fill',
                paint: {
                    'fill-color': {
                        property: selection,
                        stops: result.stops
                    },
                    'fill-opacity': 0.8
                }
            });
            setData(result.data)
        }

        retrieveMapData()

    }, [geoLevel, vintage, selection])

    return (Object.keys(data).length > 0) ? (
        <ReactMapGL
            mapboxApiAccessToken={process.env.REACT_APP_TOKEN}
            {...viewport}
            onViewportChange={(viewport) => setViewport(viewport)}
        >
            <Source type="geojson" data={data}>
                <Layer {...layer} />
            </Source>
        </ReactMapGL>
    ) : (<div />);
}

