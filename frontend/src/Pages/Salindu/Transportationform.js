import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Headert from '../../Components/Salindu/Headert';


const TransportationForm = () => {
  const [email, setEmail] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [telephoneNo, setTelephoneNo] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [works, setWorks] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      return;
    }

    setEmailError("");  // Clear previous errors

    const newVehicle = {
      Email: email,
      Vehicletype: vehicleType,
      VehicleNo: vehicleNo,
      Telephoneno: telephoneNo,
      Work: works
    };

    axios.post("http://localhost:8070/createvehicle", newVehicle)
      .then(() => {
        navigate('/vehicleTable');
      })
      .catch((err) => {
        console.error("Failed to submit vehicle:", err);
      });
  };

  return (
    <div className="body1">
      <Headert/>
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "auto" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "20px", textAlign: "center", color: "#FFF" }}>Vehicle Details Form</h2>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="email" style={{ color: "#FFF" }}>Email</label>
            <input
              type="text"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "10px", fontSize: "1rem", border: "none", borderRadius: "5px" }}
            />
            {emailError && <div style={{ color: "red" }}>{emailError}</div>}
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="vehicleNo" style={{ color: "#FFF" }}>Vehicle Number</label>
            <input
              type="text"
              id="vehicleNo"
              placeholder="Enter Vehicle Number"
              value={vehicleNo}
              onChange={(e) => setVehicleNo(e.target.value)}
              style={{ width: "100%", padding: "10px", fontSize: "1rem", border: "none", borderRadius: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="telephoneno" style={{ color: "#FFF" }}>Telephone Number</label>
            <input
              type="text"
              id="telephoneno"
              placeholder="Enter Telephone Number"
              value={telephoneNo}
              onChange={(e) => setTelephoneNo(e.target.value)}
              style={{ width: "100%", padding: "10px", fontSize: "1rem", border: "none", borderRadius: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="vehicleType" style={{ color: "#FFF" }}>Vehicle Type</label>
            <input
              type="text"
              id="vehicleType"
              placeholder="Enter Vehicle Type"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              style={{ width: "100%", padding: "10px", fontSize: "1rem", border: "none", borderRadius: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="works" style={{ color: "#FFF" }}>Works</label>
            <input
              type="text"
              id="works"
              placeholder="Enter Works"
              value={works}
              onChange={(e) => setWorks(e.target.value)}
              style={{ width: "100%", padding: "10px", fontSize: "1rem", border: "none", borderRadius: "5px" }}
            />
          </div>
          <button
            type="submit"
            style={{ display: "block", margin: "auto", backgroundColor: "#FFA500", border: "none", color: "#FFF", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransportationForm;