import React, { useEffect, useState } from 'react';
import Header from '../../../Components/Header'; 
import Footer from '../../../Components/Footer';
import '../App.css';

const CompUserForm = ({ addComps, updateComps, submitted, data, isEdit }) => {
    const [uname, setUname] = useState("");
    const [email, setEmail] = useState("");
    const [category, setCategory] = useState("Repairing"); 
    const [complaint, setComplaint] = useState("");
    const [submitButtonName, setSubmitButtonName] = useState("Submit My Complaint");

    useEffect(() => {
        if (!submitted) {
            setUname('');
            setEmail('');
            setCategory('');
            setComplaint('');
        }
    }, [submitted]);
  
    useEffect(() => {
        if (data?.id && data.id !== 0) {
            setUname(data.uname);
            setEmail(data.email);
            setCategory(data.category);
            setComplaint(data.complaint);
        }
    }, [data]);
  
    useEffect(() => {
        if (isEdit) {
            setSubmitButtonName("Update My Complaint");
        } else {
            setSubmitButtonName("Submit My Complaint");
        }
    }, [isEdit]);

    const handleUnameChange = (event) => {
        setUname(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleCategoryChange = (event) => { 
        setCategory(event.target.value);
    };

    const handleComplaintChange = (event) => {
        setComplaint(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isEdit) {
            updateComps({
                id: data.id,
                uname: uname,
                email: email,
                category: category,
                complaint: complaint,
            });
        } else {
            addComps({
                id: Date.now(),
                uname: uname,
                email: email,
                category: category,
                complaint: complaint,
            });
        }
        setUname("");
        setEmail("");
        setCategory("Repairing");
        setComplaint("");
    };

    return (
        <div>
            <Header /> 
            <br /><br />
            <div style={{backgroundColor:"rgba(16, 16, 16, 0.926)",height:"56px"}}>
                <h1 style={{fontSize:"35px",padding:"4px"}}>Make a Complaint</h1>
            </div>
            <br />
            <div className="form-container">
                <div id="popupsmart-feedback">
                    <form onSubmit={handleSubmit}>
                        <label class="labelnuw" htmlFor="uname">Username:</label>
                        <input class="inputnuw" type="text" id="uname" name="uname" value={uname} onChange={handleUnameChange}/><br /><br />
                        <label class="labelnuw" htmlFor="email">Email:</label>
                        <input  class="inputnuw"type="email" id="email" name="email" value={email} onChange={handleEmailChange}/><br /><br />
                        <label class="labelnuw" htmlFor="category">Category</label>
                        <select class="selectnuw"  id="category" name="category" value={category} onChange={handleCategoryChange}>
                            <option value="">Select a category</option>
                            <option value="Installation">Installation</option>
                            <option value="Repairing">Repairing</option>
                            <option value="Other">Other</option>
                        </select>
                        
                        <label class="labelnuw" htmlFor="complaint">Your Complaint:</label><br />
                        <textarea class="textareafeed" id="complaint" name="complaint" value={complaint} onChange={handleComplaintChange} placeholder="What can we do to improve your experience." maxLength={50}></textarea><br />
                        
                        <input class="inputfeedback" type="submit" value={submitButtonName} />
                    </form>
                </div>
            </div><br></br><br></br>
            <Footer />
        </div>
    );
}

export default CompUserForm;