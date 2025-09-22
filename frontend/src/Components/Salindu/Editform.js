import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const Editform = () => {
  const {vehicleId} = useParams();
  const [formdata, setformdata] = useState({
    Email: "",
    Vehicletype: "",
    VehicleNo: "",
    Telephoneno: "",
    work: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8070/vehicle/${vehicleId}`)
      .then((response) => {
        
        setformdata(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vehicle details:", error);
      });
  }, [vehicleId]);

  const handleChange = (e) => {
    setformdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Insert");

    try{
      await axios.put(`http://localhost:8070/updatevehicle/${vehicleId}`, formdata)
      alert("Vehicle details updated successfully!");
    }catch(error){
      console.error("Error updating vehicle details:", error);
      alert("Failed to update vehicle details. Please try again.");
    } 
        
  };

  return (
    <form>
      <h2 className="display-4">Vehicle Details Edit Form</h2>

      <div className="form-group mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="text"
          className="form-control"
          id="email"
          placeholder="Enter Email"
          value={formdata.Email}
          onChange={handleChange}
        />
      </div>

      {/* Additional form fields... */}

      <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
    </form>
  );
};

export default Editform;
