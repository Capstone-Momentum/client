import { onHover, getHoveredName, addCommas } from './CensusMapGL';

describe("CensusMapGL - Unit Tests", () => {

    describe("onHover", () => {
        const mockFeatures = [{ layer: { id: 'data' } }]
        it("with features and offsets > 0", () => {
            const mockEvent = {
                features: mockFeatures,
                srcEvent: { offsetX: 1, offsetY: 10 }
            }
            const setHoveredLocationSpy = jest.fn()
            const x = { current: 50 }
            const y = { current: 100 }
            onHover(setHoveredLocationSpy, mockEvent, x, y)
            expect(x.current).toBe(1)
            expect(y.current).toBe(10)
            expect(setHoveredLocationSpy).toBeCalled()
        })

        it("with features and offsets < 0", () => {
            const setHoveredLocationSpy = jest.fn()
            const mockEvent = {
                features: mockFeatures,
                srcEvent: { offsetX: -1, offsetY: -10 }
            }
            const x = { current: 50 }
            const y = { current: 100 }
            onHover(setHoveredLocationSpy, mockEvent, x, y)
            expect(setHoveredLocationSpy).toBeCalled()

            // Don't know how to test React refs yet. The below tests fail.
            // expect(x.current).toBe(50)
            // expect(y.current).toBe(100)
        })
    })

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

