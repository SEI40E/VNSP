import {useState, useEffect} from "react";
import './App.css';
import axios from 'axios'
import {getVehicles, baseUrl, addVehicle} from "./VehicleForm";
import AdminView from "./AdminView";
const App = () => {
    const [newStartVariable, setStartVariable] = useState('');
    const [newDestinationVariable, setDestinationVariable] = useState('');
    const [newTypeVariable, setTypeVariable] = useState('');
    const [notification,setNotification]=useState("")
    const [searchTermVariable, setSearchTermVariable] = useState('');
    const [vehicleVariable, setVehicleVariable] = useState([]);


    const hook = () => {
        console.log('effect')
        getVehicles()
            .then(response => {
                setVehicleVariable(response.data)
            })
    }
    useEffect(hook, [])
    
    const handleSubmitFunction = (e) => {
        e.preventDefault();
        const alreadyExists = vehicleVariable.some(
            (vehicle) => vehicle.Start.toLowerCase() === newStartVariable.toLowerCase()
        );

        if (alreadyExists) {
            const vehicleToUpdate = vehicleVariable.find(
                (vehicle) => vehicle.Start.toLowerCase() === newStartVariable.toLowerCase()
            );

            if (vehicleToUpdate) {
                if (window.confirm(`${vehicleToUpdate.Start} has already been added to the vehicle List, do you want to replace the old  with new one?`)) {
                    axios
                        .put(`${baseUrl}/${vehicleToUpdate.id}`, {
                            Name: newStartVariable,
                            Place:newDestinationVariable,
                            Type:newTypeVariable

                        })
                        .then((response) => {
                            const updatedvehicle = response.data;
                            setVehicleVariable((prevvehicle) =>
                                prevvehicle.map((vehicle) =>
                                    vehicle.id === updatedvehicle.id ? updatedvehicle : vehicle
                                )
                            );

                            setStartVariable("");

                            setDestinationVariable("");
                            setTypeVariable("");
                            setNotification("vehicle updated successfully")
                            setTimeout(()=>{
                                setNotification("")
                            },2000)
                        })
                        .catch((error) => {
                            console.log("Error updating list", error);
                        });
                }

            }
        } else {
            addVehicle({Start: newStartVariable, Destination:newDestinationVariable,Type:newTypeVariable})
                .then((response) => {
                    setVehicleVariable([...vehicleVariable, response.data]);
                    setStartVariable("");
                    setDestinationVariable("");
                    setTypeVariable("");

                    const hideDiv=()=>{
                        const myDiv=document.getElementById("few");
                        myDiv.style.display='none'
                        setNotification("");
                    }
                    setNotification(`${newStartVariable} has been added`)
                    setTimeout(hideDiv,3000);

                })
                .catch((error) => {
                    console.log("Error adding vehicle", error);
                });
        }
    };
    const handleDelete = (start) => {
        const vehicleToDelete = vehicleVariable.find(vehicle => vehicle.Start === start);

        if (vehicleToDelete && window.confirm(`Are you sure you want to delete vehicle with the name ${start}`)) {
            console.log(start)

            axios.delete(`${baseUrl}/${vehicleToDelete.id}`)
                .then(() => {
                    setVehicleVariable(vehicleVariable.filter(vehicle => vehicle.id !== vehicleToDelete.id));
                })
                .catch(() => {
                    console.log("Error deleting vehicle")
                })
        }

    }
    const filteredvehicles = vehicleVariable.filter(vehicle => {
        const vehicleStart = vehicle.Start;
        const vehicleDestination=vehicle.Destination;
        const vehicleType=vehicle.Type;
        const searchTerm = searchTermVariable;
        return vehicleStart.includes(searchTerm)||vehicleDestination.includes(searchTerm)||vehicleType.includes(searchTerm);
    }).sort((a, b) => a.Type.localeCompare(b.Type));

    return (

        <div>
            {
                <div>
                    <div>
                        <h2 className="title">vehicle Navigation System</h2>

                        {
                            notification && (
                                <div id="few" style={
                                    {
                                        display:"flex",
                                        backgroundColor: "#DCDCDC",
                                        color: "green",
                                        alignItems:"center",
                                        padding: "12px 16px",
                                        border:"5px  solid green",
                                        borderRadius:"30px",
                                        bottom: "10px",
                                        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)"
                                    }
                                }>
                                    {notification}
                                </div>

                            )

                        }

                        <form onSubmit={handleSubmitFunction} className="add-form">
                            <h2>Add vehicle</h2>
                            <div className="form-input">
                                <label htmlFor="start">Start:</label>
                                <input placeholder="please enter start point" type="text" id="start" value={newStartVariable}
                                       onChange={e => setStartVariable(e.target.value)}/>
                            </div>



                            <div className="form-input">
                                <label htmlFor="destination">Destination</label>
                                <input placeholder="please enter destination" type="text" id="destination" value={newDestinationVariable}
                                       onChange={e => setDestinationVariable(e.target.value)}/>
                            </div>

                            <div className="form-input">
                                <label htmlFor="type">Type:</label>
                                <input placeholder="please enter type of vehicle" type="text" id="type" value={newTypeVariable}
                                       onChange={e => setTypeVariable(e.target.value)}/>
                            </div>


                            <div className="form-input">
                                <button type="submit">Add vehicle</button>
                            </div>
                        </form>

                        <h3>List of Route searches</h3>
                        <br></br>
                        <div>
                            {
                                filteredvehicles.map(vehicle=>(
                                        <div className="container">
                                            <div className="vehicle-item" key={vehicle.id}>
                                                <div className="content">
                                                    <div className="details">
                                                        <h2>Start: {vehicle.Start} <br></br>  <span>
                                                             <a href={`https://www.google.com/maps/place/${vehicle.Start}`} target="_blank">
                                                                https://www.google.com/maps/place/{vehicle.Start}
                                                                </a>
                                                        </span></h2>
                                                        <div className="data">

                                                            <h3>Destination:{vehicle.Destination} <br></br> <span>
                                                             <a href={`https://www.google.com/maps/place/${vehicle.Destination}`} target="_blank">
                                                                https://www.google.com/maps/place/{vehicle.Destination}
                                                                </a>
                                                        </span></h3>
                                                            <h4>Type:{vehicle.Type}</h4>

                                                        </div>
                                                        <div className="actionBtn">
                                                            <button onClick={()=>handleDelete(vehicle.Start)}> Delete </button>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    )
                                )
                            }
                        </div>

                        <br></br>
                        <h4>Search the vehicle items:</h4>
                        <div className="search-input">
                            <input placeholder="please enter search text" value={searchTermVariable} onChange={e => setSearchTermVariable(e.target.value)}/>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};
export default App;
