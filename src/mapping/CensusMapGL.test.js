import { addCommas, quantileMaker } from './CensusMapGL';
let chroma = require("chroma-js");

describe("CensusMapGL - Unit Tests", () => {
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

    describe('quantileMaker', () => {
        const colorScale = chroma.scale(['white', 'black']).domain([0, 1])
        const inputs = [
            {
                quantiles: 2, min: 0, max: 4, expected: [
                    [0, '#bfbfbf'],
                    [2, '#808080']
                ],
            },
            {
                quantiles: 5, min: 0, max: 10, expected: [
                    [0, '#e6e6e6'],
                    [2, '#cccccc'],
                    [4, '#999999'],
                    [6, '#666666'],
                    [8, '#333333']
                ],
            },
            {
                quantiles: 20, min: 0, max: 100, expected: [
                    [0, '#fcfcfc'],
                    [5, '#f2f2f2'],
                    [10, '#e6e6e6'],
                    [15, '#d9d9d9'],
                    [20, '#cccccc'],
                    [25, '#bfbfbf'],
                    [30, '#b3b3b3'],
                    [35, '#a6a6a6'],
                    [40, '#999999'],
                    [45, '#8c8c8c'],
                    [50, '#808080'],
                    [55, '#737373'],
                    [60, '#666666'],
                    [65, '#595959'],
                    [70, '#4d4d4d'],
                    [75, '#404040'],
                    [80, '#333333'],
                    [85, '#262626'],
                    [90, '#1a1a1a'],
                    [95, '#0d0d0d']
                ],
            },
        ]
        for (let i = 0; i < inputs.length; i++) {
            const { quantiles, min, max, expected } = inputs[i]
            it(`quantiles: ${quantiles}, min: ${min}, max: ${max}`, () => {
                expect(
                    quantileMaker(colorScale, quantiles, min, max)
                ).toEqual(expected)
            })
        }
    })


})

