
// App Routes
export const LANDING = '/'
export const INTERACTIVE_MAP = '/interactive-map'
export const INITATIVES = '/initiatives'
export const CUSTOMIZATION = '/customization'
export const EXPLORE = '/explore'
export const DATAVIEWER = '/data-viewer'
export const TUTORIALS = '/tutorials'
export const CONTACT_US = '/contact-us'
export const ACCOUNT = '/account'

// GraphQL Route
// export const GRAPHQL_ROUTE = 'http://localhost:5000/graphql' // local
export const GRAPHQL_ROUTE = 'http://momentumapi-env.cpmzn2wrpm.us-east-2.elasticbeanstalk.com/graphql' // deployed

// Census API
export const CENSUS_KEY = "59b58e145abf5f84f347813e3e52cca496db9a0f"

// Geography
export const CALIFORNIA_CODE = '06'
export const SLO_COUNTY_CODE = '079'
export const SLO_LATITUDE = 35.2828
export const SLO_LONGITUDE = -120.6596
export const CCSR_COUNTIES = "079, 083, 053"
// ideally I want to be able to attribute the zip codes to the cities they are in
// 93410 is broken for some reason..
export const CCSR_CITY_ZIPS = {
    "Paso Robles": "93446, 93447",
    "Atascadero": "93422, 93423",
    "San Luis Obispo": "93401, 93403, 93405, 93406, 93408",
    "Morro Bay": "93442, 93443",
    "Pismo Beach": "93448, 93449",
    "Arroyo Grande": "93420, 93421",
    "Grover Beach": "93433, 93445, 93483",
    "Santa Margarita": "93453",
    "San Miguel": "93451",
    "Los Osos": "93402, 93412",
    "Cambria": "93428, 93435",
    "Creston": "93432",
    "Shandon": "93461",
    "Nipomo": "93444",
    "Avila Beach": "93401, 93405, 93424",
    "Solvang": "93463, 93464",
    "Santa Maria": "93454, 93455, 93456, 93458",
    "Buellton": "93427",
    "Guadalupe": "93434",
    "Lompoc": "93436, 93438",
    "Orcutt": "93455, 93457",
    "Sant Ynez": "93460, 93463",
    "Vandenberg Village": "93436"
}
export const CCSR_CITIES = Object.keys(CCSR_CITY_ZIPS).join(', ');
export const CCSR_ZIPS = Object.values(CCSR_CITY_ZIPS).join(', ');
// not sure if we will need this...
export const CCSR_SUBDIVS = ''
export const CCSR_TRACTS = ''
export const CCSR_BLOCKS = ''

export const GEOLEVEL_TO_SELECTION = {
    'county': { 'county': CCSR_COUNTIES },
    'tract': { 'tract': CCSR_TRACTS },
    'county subdivision': { 'county-subdivision': CCSR_SUBDIVS },
    'block group': { 'block group': CCSR_BLOCKS },
    'zip code tabulation area': { 'zip code tabulation area': CCSR_ZIPS }
}

export const GEOLEVEL_TO_FEATUREATTR = {
    'tract': 'tract',
    'county subdivision': 'NAME',
    'block group': 'block-group',
    'zip code tabulation area': 'zip-code-tabulation-area',
}
