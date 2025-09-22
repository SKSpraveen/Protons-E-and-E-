import React, { useState } from "react";
import "../Style/Repair.css";
import axios from "axios";

function RepairForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [repairType, setRepairType] = useState("");
    const [description, setDescription] = useState("");
    
    // State variables for validation
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [repairTypeError, setRepairTypeError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");

    const clearForm = () => {
        setName("");
        setEmail("");
        setPhone("");
        setRepairType("");
        setDescription("");
    };

    function sendData(e) {
        e.preventDefault();

        // Validation checks
        if (!name) {
            setNameError("Name is Required.");
            return;
        } else {
            setNameError("");
        }

        if (!email) {
            setEmailError("Email is Required.");
            return;
        } else {
            setEmailError("");
        }

        const EmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!EmailPattern.test(email)) {
            setEmailError("Enter valid Email.");
            return;
        }
    

        if (!phone) {
            setPhoneError("Phone Number is Required.");
            return;
        } else {
            setPhoneError("");
        }

        if (!repairType) {
            setRepairTypeError("Repair Type is Required.");
            return;
        } else {
            setRepairTypeError("");
        }

        if (!description.trim()) {
            setDescriptionError("Description is Required.");
            return;
        } else {
            setDescriptionError("");
        }

        // If all fields are valid, proceed with sending data
        const newRepair = {
            name,
            email,
            phone,
            repairType,
            description,
        };

        axios.post("http://localhost:8070/repair/add", newRepair)
            .then(() => {
                alert("Repair Request Added");
                clearForm();
            })
            .catch((err) => {
                alert(err);
            });
    }

    return (
       
        <div className="bottom1"><br /><br />
             <div style={{backgroundColor:"rgba(16, 16, 16, 0.926)",height:"56px"}}>
                <h1 style={{fontSize:"35px",padding:"4px"}}>Repair Service</h1>
            </div>
            <br />
            <img className="img" src="./Images/services.jpg" alt="" style={{marginLeft:"2%",width:"96%",height:"310px"}} />
            <br /> <br />
            <div className="container1">
                <br />
                <h1 style={{marginLeft:"30%"}}>
                    <i>
                        Repair Service
                    </i>
                </h1>
                <br />
                <div>
                    <form onSubmit={sendData} className="row g-3">
                        <div className="col-10">
                            <label htmlFor="name" className="form-label repairLabel">  Name </label>
                            <input type="text" className="form-control"  id="name"  value={name} onChange={(e) => { setName(e.target.value);}}/>
                           
                            <div className="valid">{nameError}</div>
                        </div>

                        <div className="col-10">
                            <label htmlFor="email" className="form-label repairLabel"> Email </label>
                            <input type="text" className="form-control"  id="email"  value={email} onChange={(e) => {setEmail(e.target.value);}}/>
                               
                            <div className="valid">{emailError}</div>
                        </div>

                        <div className="col-10">
                            <label htmlFor="phone" className="form-label repairLabel"> Phone</label>
                            <input  type="text" className="form-control" id="phone"  value={phone}  onChange={(e) => { setPhone(e.target.value); }}/>
                                
                            <div className="valid">{phoneError}</div>
                        </div>

                        <div className="col-10">
                            <label  htmlFor="inputType" className="form-label repairLabel">  Type </label>
            
                            <select id="inputType"  value={repairType}  onChange={(e) => { setRepairType(e.target.value);}}  className="form-select">
                               <option>none</option>
                               <option>CCTV</option>
                               <option>Door Lock</option>
                               <option>Door Phone</option>
                               <option>Alarms & Motion Detectors</option>
                            </select>

                            <div className="valid">  {repairTypeError} </div>
                        </div>

                        <div className="col-10">
                            <label  htmlFor="inputDescription"  className="form-label repairLabel">  Description </label>
                            <textarea  className="form-control" id="inputDescription" value={description}  onChange={(e) => {setDescription(e.target.value); }}/>
                                
                            <div className="text-danger"> {descriptionError} </div>
                        </div>

                        <div className="col-4" style={{ marginLeft: "30%" }}>
                            <button type="submit" className="btn btn-primary repairBtn"> Submit </button>
                        </div>
                    </form>
                    <br />
                </div>
            </div>
            <br /> <br /> <br /> <br />
        </div>
    );
}
export default RepairForm;