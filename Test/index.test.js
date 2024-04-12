//Authors: Omhier Khan
//Date: 4/11/2024
//Testing INDEX
// Mock Leaflet and geolocation dependencies
jest.mock('leaflet');
jest.mock('geolocation');

describe('onLocationFound', () => {
    test('should add marker at user location and set up routing control', () => {
        // Mock Leaflet map, tileLayer, and other methods
        const mapMock = {
            setView: jest.fn(),
            locate: jest.fn(),
            on: jest.fn((eventName, callback) => {
                if (eventName === 'locationfound') {
                    // Simulate location found event
                    callback({ latlng: { lat: 37.978977321661155, lng: -121.30170588862478 } });
                }
            }),
            removeLayer: jest.fn(),
            marker: jest.fn(() => ({
                addTo: jest.fn(),
            })),
            featureGroup: jest.fn(() => ({
                addTo: jest.fn(),
            })),
            Routing: {
                control: jest.fn(() => ({
                    addTo: jest.fn(),
                })),
                errorControl: jest.fn(() => ({
                    addTo: jest.fn(),
                })),
            },
        };

        // Set up Leaflet mock to return the map mock
        jest.spyOn(L, 'map').mockImplementation(() => mapMock);

        // Call the function being tested
        onLocationFound();

        // Verify that map methods are called correctly
        expect(mapMock.setView).toHaveBeenCalledWith([37.978977321661155, -121.30170588862478], 16);
        expect(mapMock.locate).toHaveBeenCalled();
        expect(mapMock.on).toHaveBeenCalledWith('locationfound', expect.any(Function));
        expect(mapMock.marker).toHaveBeenCalledWith([0, 0], { icon: expect.any(Object) });
        expect(mapMock.Routing.control).toHaveBeenCalled();
        expect(mapMock.Routing.errorControl).toHaveBeenCalled();
    });
});
