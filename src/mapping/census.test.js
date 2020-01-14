import { getHoveredName, addCommas } from './CensusMapGL';

// CensusMapGL Test Suite
describe("CensusMapGL Unit Tests", () => {

    // getHoveredName Test Suite
    describe("getHoveredName", () => {

        // Test Case 1
        it("geoLevel: 'county subdivision'", () => {
            const hoveredLocation = {
                properties: { 'NAME': "San Luis Obispo County" }
            };
            expect(getHoveredName(hoveredLocation, 'county subdivision'))
                .toBe("San Luis Obispo County")
        })

        // Test Case 2
        it("geoLevel: 'tract':", () => {
            const hoveredLocation = {
                properties: { 'tract': "1234" }
            };
            expect(getHoveredName(hoveredLocation, 'tract'))
                .toBe(`Tract (1234)`)
        })

        // Test Case 3
        it("geoLevel: 'block group'", () => {
            const hoveredLocation = {
                properties: {
                    'block-group': "4321",
                    'tract': "1234"
                }
            };
            expect(getHoveredName(hoveredLocation, 'block group'))
                .toBe(`Tract (1234) / Block Group (4321)`)
        })
    })

    // addCommas Test Suite
    describe('addCommas', () => {

        // Test Case 1
        it("addCommas:", () => {
            expect(addCommas(3000)).toBe("3,000");
        })
    })
})

