import CensusBarChart, { getAPICall } from '../BarChart';
import {
    CALIFORNIA_CODE, CENSUS_KEY, CCSR_COUNTIES, CCSR_ZIPS
} from '../../../constants';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import React from 'react';
import { BarChart } from 'recharts';

configure({ adapter: new Adapter() });

describe("bar graph tests", () => {
    test('returns correct api call', () => {
        const concept = "MEDIAN HOUSEHOLD INCOME IN THE PAST 12 MONTHS (IN 2018 INFLATION-ADJUSTED DOLLARS)";
        const expected = {
            "vintage": "2017",
            "geoHierarchy": { 'zip code tabulation area': CCSR_ZIPS },
            "sourcePath": ["acs", "acs5"],
            "values": ["B19013_001E"],
            "concept": concept,
            "statsKey": CENSUS_KEY
        };

        expect(getAPICall("2017", "zip code tabulation area", "B19013_001E", concept)).toStrictEqual(expected);
    });

    test('returns correct bar chart', () => {
        const wrapper = shallow(<CensusBarChart />);
        const p = wrapper.find('div');
        expect(p.hasClass("bar chart")).toBe(true);
    });

})