import React, {useState, useEffect} from "react";
import axios from "axios";
import VehicleTable from "./VehicleTable";

function VehicleDetails(){
  const [vehicles, setVehicles] = useState([]);

    
    useEffect(() =>{
        function getVehicles(){
            axios.get("http://localhost:8070/vehicle").then((res) => {
               
                setVehicles(res.data);
            }).catch((err)=> {alert(err.message);
            })
        }
        getVehicles();
    },[])
// VehicleDetails.js



  useEffect(() => {
    axios.get("http://localhost:8070/vehicle")
      .then((res) => {
        setVehicles(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  return (
    <div className="container">
      <h1>Vehicle Details</h1>
      <VehicleTable rows={vehicles} />
    </div>
  );
};

export default VehicleDetails;
