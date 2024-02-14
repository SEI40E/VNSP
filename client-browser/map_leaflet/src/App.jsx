import React, { useState } from "react";
import { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './App.css';
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import RoutingMachine from "./RoutingMachine";
import LeafletControlGeocoder from"./leafletGeoCoder";

const SimpleMap = () => {
  const mapRef = useRef(null);
  const location = [37.95810779285353, -121.2963873427847]
  const position = [37.95810779285353, -121.2963873427847]
  const pos1 = [37.979962982583956, -121.31287916066515]
  return (
    // Make sure you set the height and width of the map container otherwise the map won't show
    <MapContainer center={location} zoom={13} ref={mapRef} style={{ height: "80vh", width: "80vw" }}>
      <TileLayer
        attribution="Google Maps"
        //attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"

      />
      
      {/* <Marker position={position}>
          <Popup>
            Stockton. <br/> 
          </Popup>
        </Marker>
        <Marker position={pos1}>
          <Popup>
            University of The Pacific <br/> Currently i am here.
          </Popup>
        </Marker> */}
        {/* <LeafletControlGeocoder /> */}
      <RoutingMachine />
      {/* Additional map layers or components can be added here */}

    </MapContainer>
  );
};

function App() {

  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');

  const handleFromLocationChange = (event) => setFromLocation(event.target.value);
  const handleToLocationChange = (event) => setToLocation(event.target.value);

  const addNewLocationDetails = (event) => {
    event.preventDefault();
    if (fromLocation === 0 || toLocation === 0) {
      window.alert("From/To location cannot be empty");
    }
    setFromLocation(fromLocation);
    setToLocation(toLocation);
  }

  return (
    <div>
      <h1>Vehicle Navigation System MAP API</h1>
      <form onSubmit={addNewLocationDetails}>
        <div>
          From: <input value={fromLocation} onChange={handleFromLocationChange} />
        </div>
        <div>
          To: <input value={toLocation} onChange={handleToLocationChange} />
        </div>
        <div>
          <button type='submit'>Search</button>
        </div>
      </form>
      <SimpleMap />
    </div>
  );
}

export default App
