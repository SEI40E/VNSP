import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = (props) => {
    const instance = L.Routing.control({
      waypoints: [
        L.latLng(37.95864918381329, -121.28883427366546),
        L.latLng(38.576649964748086, -121.50126727200649)
      ],
      lineOptions: {
        styles: [{ color: "#6FA1EC", weight: 4 }]
      },
      addWaypoints: false,
      draggableWaypoints: true,
      fitSelectedRoutes: true,
      showAlternatives: false
    });
  
    return instance;
  };
  
  const RoutingMachine = createControlComponent(createRoutineMachineLayer);

  export default RoutingMachine;