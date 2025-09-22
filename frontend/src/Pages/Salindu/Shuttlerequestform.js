import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Headert from '../../Components/Salindu/Headert';

const Shuttlerequestform = () => {
  const [Remail, setRemail] = useState("");
  const [Employeename, setEmployeename] = useState("");
  const [Reason, setReason] = useState("");
  const [RvehicleType, setRVehicleType] = useState("");
  const [Work, setWork] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (Remail) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(Remail);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(Remail)) {
      setEmailError("Invalid email address");
      return;
    }

    // Clear the email error when a valid email is entered
    setEmailError("");

    const newrequest = {
      Remail: Remail,
      Employeename: Employeename,
      Reason: Reason,
      RvehicleType: RvehicleType,
      Work: Work
    };

    try {
      const response = await axios.post("http://localhost:8070/createShuttleRequest", newrequest);
      console.log("Response:", response.data); // Log response for debugging
      // Navigate to RequestTable after successful submission
      navigate('/ShuttleDetails');
    } catch (error) {
      console.error("Error:", error); // Log error for debugging
      alert("Failed to submit request. Please try again."); // Display user-friendly error message
    }
  };

  return (
    <div className="body1">
      <Headert />
      <br/><br/>
      <form  style={{  display: "flex", flexDirection: "column", flexGrow: 0, alignItems: "center", justifyContent: "center", height: "100vh" ,backgroundColor:"hwb(0 89% 11% / 0.803)",width:"60%",marginLeft:"20%",borderRadius:"15px"}}>
        <h2 style={{ color: "#000", textAlign: "center",marginTop:"3%" }}>Vehicle Request Form</h2>

        {/* Your form inputs here */}

        <button type="button" className="btn btn-dark-orange" onClick={handleSubmit} style={{ backgroundColor: "#8b7962", border: "none", color: "white", padding: "14px 50px", textAlign: "center", textDecoration: "none", display: "inline-block", fontSize: "16px", borderRadius: "10px" }}>
          Submit
        </button>
        <br/>
      </form>
      <br/><br/><br/>
    </div>
  );
};

export default Shuttlerequestform;
