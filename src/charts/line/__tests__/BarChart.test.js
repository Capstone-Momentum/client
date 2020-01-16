import CensusBarChart, { getAPICall } from '../BarChart';
import {
    CALIFORNIA_CODE, CENSUS_KEY, CCSR_COUNTIES
} from '../../../constants';

describe("bar graph tests", () => {
    test('returns correct api call', () => {
        const expected = {
            "vintage": "2018",
            "geoHierarchy": {
                "state": CALIFORNIA_CODE,
                "county": CCSR_COUNTIES
            },
            "sourcePath": ["acs", "acs1"],
            "values": ["B19013_001E", "NAME"],
            "statsKey": CENSUS_KEY
        };
        expect(getAPICall()).toStrictEqual(expected);
    })
})