import CensusBarChart, { getAPICall, CustomToolTip, addCommas, correspondingCities, formatConcept, calculateAverage, filterUnknowns } from '../BarChart';
import {
    CALIFORNIA_CODE, CENSUS_KEY, CCSR_COUNTIES, CCSR_ZIPS
} from '../../../constants';
import { Tooltip } from 'recharts';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import React from 'react';
import { BarChart } from 'recharts';
import renderer, { act } from 'react-test-renderer';


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

    test('tooltip returns null if given false data', () => {
        const tooltip = CustomToolTip(false, false, "income");
        expect(tooltip).toBe(null);
    });

    test('tooltip returns correct component', () => {
        const tooltip = CustomToolTip(true, 50000, "income");
        //const wrapper = shallow(<tooltip />);
        //console.log(wrapper.getElement());
        const wrapper = shallow(<Tooltip filterNull={false} content={tooltip} />);
        //console.log(wrapper2.find('content').hasClass('label'));
        const p = wrapper.find('div');
        expect(p.hasClass("recharts-tooltip-wrapper")).toBe(true);
    });

    test('add commas', () => {
        const val = 50000;
        expect(addCommas(val)).toBe("50,000");
    });

    test('add commas', () => {
        expect(addCommas(null)).toBe('');
    });

    test('corresponding cities', () => {
        expect(correspondingCities("93422")).toBe("Atascadero");
    });
    test('format concept', () => {
        expect(formatConcept("HELLO WORLD")).toBe("Hello World");
    });
    test('calculate average', () => {
        const data = [{'x':10, 'y':20}, {'x':20, 'y':30}];
        expect(calculateAverage(data, 'x')).toBe(15);
    });
    test('filter unknowns', () => {
        const data = [{'x':10, 'y':20}, {'x':-10, 'y':30}];
        const expected = [{'x':10, 'y':20}]
        expect(filterUnknowns(data, 'x')).toStrictEqual(expected);
    });

});

describe("testing async functions 1", () => {
    let props;
    let wrapper;
    let useEffect;

    const data = { id: 1, name: "hey" };
    const mockUseEffect = () => {
        useEffect.mockImplementationOnce(f => f());
    };
    beforeEach(() => {
        useEffect = jest.spyOn(React, "useEffect");
        props = {
            fetchData: jest.fn().mockResolvedValue(data),
        };

        mockUseEffect();
        wrapper = shallow(<CensusBarChart {...props} />);
        console.log(wrapper);
    });

    describe("on start", () => {
        it("loads the data", () => {
            console.log(props.fetchData);
            expect(props.fetchData).not.toHaveBeenCalled();
        });
        it("testing async", async () => {
            let component;
            await act(async () => {
                component = renderer.create(<CensusBarChart />);
            });
            console.log(component.toJSON());
        })
    });
})

// describe("testing async functions 2", () => {
//     const data = { id: 1, name: "hey" };

//     it('should show data when chart is loaded', async () => {
//         const mockuseEffect = jest.spyOn(React, 'useEffect').mockResolvedValueOnce(data);
//         let component;
//         await act(async () => {
//             component = renderer.create(<CensusBarChart />);
//         });
//         console.log(component.toJSON());
//         //expect(component.toJSON());
//         mockUseEffect.mockRestore();
//     });
// })

