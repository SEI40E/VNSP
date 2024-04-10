
var map = L.map('map').setView([37.978977321661155, -121.30170588862478],16);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var taxiIcon = L.icon({
	iconUrl: 'Images/location.png',
	iconSize: [30, 30]
});

map.locate({setView: true, maxZoom: 16});
var arr_gps = [];

function onLocationFound(e) {
var geocoder = L.Control.Geocoder.nominatim();
console.log(e.latlng.lng);
var marker = L.marker([0,0], {icon: taxiIcon}).addTo(map);
var control = L.Routing.control(L.extend(window.lrmConfig, {
	waypoints: [
		L.latLng(e.latlng.lat,e.latlng.lng)
	],
	geocoder: geocoder,
	reverseWaypoints: false,
	showAlternatives: false,
	fitSelectedRoutes: true,
	draggableWaypoints: false,
	addGpsButton: true,
	autoRoute: true,
	altLineOptions: {
		styles: [
			{color: 'black', opacity: 0.15, weight: 9},
			{color: 'white', opacity: 0.8, weight: 6},
			{color: 'blue', opacity: 0.5, weight: 2}
		]
	}
})).on('routesfound', function(e) {
	console.log(e);
	if(!navigator.geolocation) {
		console.log("Your browser doesn't support geolocation feature!")
	} else {
		setInterval(() => {
			navigator.geolocation.getCurrentPosition(getPosition)
		}, 1000);
	}
	// e.routes[0].coordinates.forEach(function(coord, index) {
	// 	setTimeout(() => {
	// 		marker.setLatLng([coord.lat, coord.lng])
	// 	},100 * index)
	// })
});
var marker_gps, circle;

function getPosition(position){
	// console.log(position)
	
	var lat = position.coords.latitude
	var long = position.coords.longitude
	var accuracy = position.coords.accuracy
	if(marker_gps) {
		console.log('removing marker');
		map.removeLayer(marker_gps)
	}

	marker_gps = L.marker([lat, long], {icon: taxiIcon})

	

	var featureGroup = L.featureGroup([marker_gps]).addTo(map)

	//map.fitBounds(featureGroup.getBounds())

	console.log("Your coordinate is: Lat: "+ lat +" Long: "+ long+ " Accuracy: "+ accuracy)
}



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
}
//L.latLng(map.on('locationfound', onLocationFound))

var test = map.on('locationfound', onLocationFound);


