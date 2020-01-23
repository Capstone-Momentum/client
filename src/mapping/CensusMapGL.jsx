import React, { useEffect } from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SLO_LATITUDE, SLO_LONGITUDE, CALIFORNIA_CODE, SLO_COUNTY_CODE, CENSUS_KEY } from '../constants';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Typography } from '@material-ui/core';
let chroma = require("chroma-js");
const census = require('citysdk')
let _ = require("lodash");

// Sources: 
//  - https://github.com/uscensusbureau/citysdk
//  - https://github.com/uscensusbureau/citysdk/blob/master/examples/mapbox/with-mapbox-gl_geocoding/src/index.js
// Reference for adding onHover: https://github.com/uber/react-map-gl/blob/5.1-release/examples/geojson/src/app.js
// Potential alternative free solution to mapping: https://www.react-simple-maps.io/examples/

const useStyles = makeStyles({
    card: {
        backgroundColor: 'white'
    },
    tooltipText: {
        textTransform: 'capitalize',
        whiteSpace: 'nowrap',
    }
})

export default function CensusMapGL(props) {
    const classes = useStyles()
    const { vintage, geoLevel, selection, viewportDefault, quantiles, colorScale } = props
    const [data, setData] = React.useState({})
    const [hoveredLocation, setHoveredLocation] = React.useState(null)
    const x = React.useRef(0)
    const y = React.useRef(0)
    const [layer, setLayer] = React.useState({})
    const [viewport, setViewport] = React.useState(
        viewportDefault ? viewportDefault : {
            width: '60vw',
            height: '60vh',
            latitude: SLO_LATITUDE,
            longitude: SLO_LONGITUDE,
            zoom: 8
        })

    useEffect(() => {
        setData({})
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
            const quantiles_ = quantiles ? quantiles : 20;
            const colorScale_ = colorScale ? colorScale : chroma.scale(['white', 'green']).domain([0, 1]);
            let scale = quantileMaker(colorScale_, quantiles_, minVal, maxVal);
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
                    'fill-opacity': 0.7
                }
            });
            setData(result.data)
        }

        retrieveMapData()

    }, [geoLevel, quantiles, colorScale, vintage, selection])

    const _renderTooltip = () => {
        return (
            hoveredLocation && (
                <div className="tooltip" style={{ left: x.current, top: y.current, zIndex: 999, pointerEvents: 'none', position: 'absolute' }}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.tooltipText} variant='body1'>
                                {`${getHoveredName(hoveredLocation, geoLevel)}: ${addCommas(hoveredLocation.properties[selection])}`}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            )
        );
    }


    return (Object.keys(data).length > 0) ? (
        <ReactMapGL
            mapboxApiAccessToken={process.env.REACT_APP_TOKEN}
            {...viewport}
            onViewportChange={(viewport) => setViewport(viewport)}
            onHover={event => onHover(setHoveredLocation, event, x, y)}
        >
            <Source type="geojson" data={data}>
                <Layer {...layer} />
            </Source>
            {_renderTooltip()}
        </ReactMapGL>
    ) : (
            <div style={{ width: viewport.width, height: viewport.height, backgroundColor: 'grey', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
            </div>
        );
}

export function onHover(setHoveredLocation, event, x, y) {
    const {
        features,
        srcEvent: { offsetX, offsetY }
    } = event;
    const hoveredLocation = features && features.find(f => f.layer.id === 'data');
    x.current = offsetX > 0 ? offsetX : x
    y.current = offsetY > 0 ? offsetY : y
    setHoveredLocation(hoveredLocation)
};

export function quantileMaker(colorScale, quantiles, min, max) {
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

const geoLevelToFeatureAttribute = {
    'tract': 'tract',
    'county subdivision': 'NAME',
    'block group': 'block-group'
}

export function getHoveredName(hoveredLocation, geoLevel) {
    const geoLevelProperty = geoLevelToFeatureAttribute[geoLevel]
    const location = hoveredLocation.properties[geoLevelProperty]
    if (geoLevel === 'county subdivision') {
        return location
    } else if (geoLevel === 'tract') {
        return `Tract (${location})`
    } else if (geoLevel === 'block group') {
        const tract = hoveredLocation.properties[geoLevelToFeatureAttribute['tract']]
        return `Tract (${tract}) / Block Group (${location})`
    }
}

export function addCommas(x) {
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ''
}
