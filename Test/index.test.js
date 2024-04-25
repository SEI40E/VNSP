// Mock the Leaflet library
// Import the actual Leaflet module
const actualLeaflet = jest.requireActual('leaflet');

// Mock the Leaflet library
const leafletMock = jest.mock('leaflet', () => {
    const L = {
        map: jest.fn(),
        tileLayer: jest.fn(),
        icon: jest.fn(),
        marker: jest.fn(),
        Control: {
            Geocoder: {
                nominatim: jest.fn(),
            },
        },
        Routing: {
            control: jest.fn(),
            errorControl: jest.fn(),
        },
        extend: jest.fn().mockImplementation(actualLeaflet.extend),
        latLng: jest.fn().mockImplementation(actualLeaflet.latLng),
        featureGroup: jest.fn().mockImplementation(actualLeaflet.featureGroup),
    };
    return L;
});

const mockNavigator = {
    geolocation: {
        getCurrentPosition: jest.fn(),
    },
};

global.navigator = mockNavigator;

// Mock the Leaflet library before importing the index.js file
//jest.mock('leaflet', () => leafletMock);

// Import the relevant functions
const { onLocationFound, getPosition } = require('../client-browser/Map_Component/JavaScript/index.js');

describe('onLocationFound', () => {
    test('calls the necessary functions', () => {
        const e = { latlng: { lat: 37.978977321661155, lng: -121.30170588862478 } };
        onLocationFound(e);
        // Add assertions to verify that the necessary functions were called
    });
});

describe('getPosition', () => {
    test('handles position data correctly', () => {
        const position = {
            coords: {
                latitude: 37.978977321661155,
                longitude: -121.30170588862478,
                accuracy: 10,
            },
        };
        getPosition(position);
        // Add assertions to verify the expected behavior
    });
});