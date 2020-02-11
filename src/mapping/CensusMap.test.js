import { getSelectionOptions, TabPanel } from './CensusMap';
import { CensusMap } from './CensusMap';
import { configure, shallow } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// describe("CensusMap - Unit Tests", () => {
//     describe('getSelectionOptions', () => {
        
//     })
// })

// Want to mock the database to test this function, right now it returns too many things in an array.
// Will finish this when we have the database worked out. 

describe("CensusMap - Unit Tests", () => {

    test('returns correct TabPanel', () => {
        const wrapper = shallow(<TabPanel children = {'string'} value = {2} index = {1} />)
        expect(wrapper.props()).toEqual({"aria-labelledby": "simple-tab-1", "children": false, "component": "div", "hidden": true, "id": "simple-tabpanel-1", "role": "tabpanel"});
    });

}); 