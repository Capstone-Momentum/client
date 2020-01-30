import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { CensusTooltip } from '../CensusTooltip'

configure({ adapter: new Adapter() });

describe("tool tip tests", () => {
    test('returns correct component', () => {
        const wrapper = shallow(<CensusTooltip value={50000} zipCode={93405} />);
        console.log(wrapper.text());
        expect(wrapper.text()).toStrictEqual("Value: 50,000Zip Code: 93405 (San Luis Obispo, Avila Beach)");
    })
})