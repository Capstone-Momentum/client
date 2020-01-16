import { getHoveredName, addCommas } from './CensusMapGL';

describe("CensusMapGL - Unit Tests", () => {

    describe("getHoveredName", () => {
        const inputs = [
            {
                properties: { NAME: "San Luis Obispo County" },
                geoLevel: 'county subdivision',
                expected: `San Luis Obispo County`,
            },
            {
                properties: { tract: "1234" },
                geoLevel: 'tract',
                expected: `Tract (1234)`,
            },
            {
                properties: { 'block-group': "4321", tract: "1234" },
                geoLevel: 'block group',
                expected: `Tract (1234) / Block Group (4321)`,
            },
        ]
        for (let i = 0; i < inputs.length; i++) {
            const { properties, geoLevel, expected } = inputs[i]
            it(`geoLevel: ${geoLevel}`, () => {
                const hoveredLocation = { properties };
                expect(getHoveredName(hoveredLocation, geoLevel))
                    .toBe(expected)
            })
        }
    })

    describe('addCommas', () => {
        const inputs = [
            {
                num: 1,
                expected: '1',
            },
            {
                num: 20,
                expected: '20',
            },
            {
                num: 999,
                expected: '999',
            },
            {
                num: 3000,
                expected: '3,000',
            },
            {
                num: 4000000,
                expected: '4,000,000',
            },
        ]
        for (let i = 0; i < inputs.length; i++) {
            const { num, expected } = inputs[i]
            it(`x: ${num}`, () => {
                expect(addCommas(num)).toBe(expected);
            })
        }
    })
})

