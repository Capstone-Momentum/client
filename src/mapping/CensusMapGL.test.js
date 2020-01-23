import { addCommas } from './CensusMapGL';

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
})

