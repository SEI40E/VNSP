var map = L.map('map').setView([37.978977321661155, -121.30170588862478],16);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var geocoderControlOptions = {
    placeholder: 'search h'
}
var taxiIcon = L.icon({
	iconUrl: 'Images/location.png',
	iconSize: [30, 30]
})
var geocoder = L.Control.Geocoder.nominatim();
var marker = L.marker([0,0], {icon: taxiIcon}).addTo(map);
var control = L.Routing.control(L.extend(window.lrmConfig, {
	waypoints: [],
	geocoder: geocoder,
	reverseWaypoints: true,
	showAlternatives: false,
	fitSelectedRoutes: true,
	altLineOptions: {
		styles: [
			{color: 'black', opacity: 0.15, weight: 9},
			{color: 'white', opacity: 0.8, weight: 6},
			{color: 'blue', opacity: 0.5, weight: 2}
		]
	}
})).on('routesfound', function(e) {
	console.log(e);
	e.routes[0].coordinates.forEach(function(coord, index) {
		setTimeout(() => {
			marker.setLatLng([coord.lat, coord.lng])
		},100 * index)
	})
});

setTimeout(function() { 
	control.addTo(map)
	L.Routing.errorControl(control).addTo(map);
}, 3000);

setTimeout(function() { 
	map.removeControl(control);
}, 5000);

setTimeout(function() { 
	control.addTo(map)
}, 6000);
