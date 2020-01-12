const census = require('./CensusMapGL');

test("Testing getHoverName(CS):", () => {
    const location = {
        properties: {'NAME': "San Luis Obispo County"}
    };
    expect(census.getHoveredName(location, 'county subdivision')).toBe("San Luis Obispo County")
})

test("Testing getHoverName(tract):", () => {
    const location = {
        properties: {'tract': "1234"}
    };
    expect(census.getHoveredName(location, 'tract')).toBe(`Tract (1234)`)
})

test("Testing getHoverName(bg):", () => {
    const location = {
        properties: {'block-group': "4321",
                     'tract': "1234"}
    };
    expect(census.getHoveredName(location, 'block group'))
    .toBe(`Tract (1234) / Block Group (4321)`)
})

test("addCommas:", () => {
    expect(census.addCommas(3000)).toBe("3,000");
})

