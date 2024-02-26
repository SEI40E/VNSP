import axios from "axios";

export const baseUrl = 'api/vehicles';

export const getVehicles = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response);
};
export const addVehicle = (vehicle) => {
    const request = axios.post(baseUrl, vehicle);
    return request.then(response => response);
};