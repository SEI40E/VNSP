const TextEncodingPolyfill = require('text-encoding');

global.TextEncoder = TextEncodingPolyfill.TextEncoder;
global.TextDecoder = TextEncodingPolyfill.TextDecoder;

const jsdom = require('jsdom');

// Create a mock DOM environment
const { JSDOM } = jsdom;
const dom = new JSDOM('<div id="map"></div>');

// Get the mock window object
global.window = dom.window;
global.document = dom.window.document;

// Mock Leaflet and assign the global.L variable
jest.mock('leaflet', () => {
    const actualLeaflet = jest.requireActual('leaflet');

    const leafletMock = {
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

    global.L = leafletMock;

    return leafletMock;
});

const mockNavigator = {
    geolocation: {
        getCurrentPosition: jest.fn(),
    },
};

global.navigator = mockNavigator;

// Import the relevant functions after setting up the mocks
const { onLocationFound, getPosition } = require('../client-browser/Map_Component/JavaScript/index.js');

describe('onLocationFound', () => {
    test('calls the necessary functions', () => {
        const e = { latlng: { lat: 37.978977321661155, lng: -121.30170588862478 } };

        // Mock the functions that onLocationFound is expected to call
        const mockFunction1 = jest.fn();
        const mockFunction2 = jest.fn();

        jest.mock('../client-browser/Map_Component/JavaScript/index.js', () => ({
            onLocationFound: () => {
                mockFunction1();
                mockFunction2();
            },
        }));

        onLocationFound(e);

        // Add assertions to verify that the mocked functions were called
        expect(mockFunction1).toHaveBeenCalled();
        expect(mockFunction2).toHaveBeenCalled();
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

        // Mock the functions that getPosition is expected to call
        const mockRemoveLayer = jest.fn();
        const mockMarker = jest.fn();
        const mockFeatureGroup = jest.fn();

        jest.mock('leaflet', () => ({
            marker: jest.fn().mockReturnValue({ setLatLng: jest.fn() }),
            featureGroup: jest.fn().mockReturnValue({ addTo: jest.fn() }),
        }));

        global.map = {
            removeLayer: mockRemoveLayer,
        };

        getPosition(position);

        // Add assertions to verify the expected behavior
        expect(mockRemoveLayer).toHaveBeenCalledTimes(1);
        expect(mockMarker).toHaveBeenCalledTimes(1);
        expect(mockFeatureGroup).toHaveBeenCalledTimes(1);
    });
});