import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Style/Repair.css";
import { useParams } from "react-router-dom";


function EditRepairForm() { 

    const { itemId } = useParams();
    const [itemDetails, setItemDetails] = useState({});
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        phone:"",
        repairType:"",
        description:"",
    });

    // State variables for validation errors
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [repairTypeError, setRepairTypeError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8070/repair/${itemId}`)
            .then((response) => {
                setItemDetails(response.data);
                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                    phone: response.data.phone,
                    repairType: response.data.repairType,
                    description: response.data.description,
                  
            });
            })
            .catch((error) => {
                console.error("Error fetching item details:", error);
            });
    }, [itemId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation checks
        if (!formData.name) {
            setNameError("Name is required.");
            return;
        } else {
            setNameError("");
        }

        if (!formData.email) {
            setEmailError("Email is required.");
            return;
        } else {
            setEmailError("");
        }

        const EmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!EmailPattern.test(formData.email)) {
            setEmailError("Please enter a valid email address.");
            return;
        } else {
            setEmailError("");
        }

        if (!formData.phone) {
            setPhoneError("Phone number is required.");
            return;
        } else {
            setPhoneError("");
        }

        if (!formData.repairType) {
            setRepairTypeError(" Repair type is required.");
            return;
        } else {
            setRepairTypeError("");
        }

        if (!formData.description) {
            setDescriptionError("Description is required.");
            return;
        } else {
            setDescriptionError("");
        }

        // If all fields are valid, proceed with sending data
        axios.put(`http://localhost:8070/repair/update/${itemId}`, formData)
            .then((response) => {
                console.log(response.data);
                // Handle success
                setFormData({
                    name:"",
                    email:"",
                    phone:"",
                    repairType:"",
                    description:"",
                });
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    console.error("Resource not found:", error);
                    // Handle 404 error
                } else {
                    console.error("Error updating repair:", error);
                    // Handle other errors
                }
            });
    };

    return(
        <div className="body1">
            <br /> <br />
            <div className="container1">
                <br />
                <h1><i style={{marginLeft:"13%"}}>Update Repair Details</i></h1>
                <br />

                <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-10">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" value={formData.name} onChange={handleChange} />

                        <div className="valid">{nameError}</div>
                    </div>

                    <div className="col-10">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="text" className="form-control"  id="email" value={formData.email} onChange={handleChange} />

                        <div className="valid">{emailError}</div>
                    </div>

                    <div className="col-10">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input type="text" className="form-control" id="phone" value={formData.phone} onChange={handleChange}/>
                        <div className="valid">{phoneError}</div>
                    </div>

                    <div className="col-10">
                        <label htmlFor="inputType" className="form-label">Type</label>
                        <select  className="form-select" id="inputType" value={formData.repairType} onChange={handleChange}>
                        <option>none</option>
                        <option>CCTV</option>
                        <option>Door Lock</option>
                        <option>Door Phone</option>
                        <option>Alarms & Motion Detectors</option>
                        </select>

                        <div className="valid">{repairTypeError}</div>
                    </div>

                    <div className="col-10">
                        <label htmlFor="inputDescription" className="form-label">Description</label>
                        <textarea className="form-control"  id="inputDescription" value={formData.description} onChange={handleChange} />
                        <div className="valid">{descriptionError}</div>
                    </div>

                    <div className="col-4" style={{marginLeft:"30%"}}>
                        <button type="submit" className="btn btn-primary" >Submit</button>
                    </div>
                </form>
                <br />
            </div>
            <br /> <br />
            <br /> <br />
        </div>
    );
}
export default EditRepairForm;