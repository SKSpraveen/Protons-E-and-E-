import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSignUp } from '../../hooks/useSignUp';


function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const { signUp, error, isLoading } = useSignUp();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signUp(name, email, phoneNumber, password, role);
    };

    return (
        <div className="signup-container">
            <div className="signup-content">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="input-group ">
                            <input type="text" id="firstName" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                  
                    <div className="input-group">
                        <select id="inputType" className={`form-select ${error && 'is-invalid'}`} value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="" >Role</option>
                            <option value="Admin">Admin</option>
                            <option value="Stock Manager">Stock Manager</option>
                            <option value="Employee Manager">Employee Manager</option>
                            <option value="Order Manager">Order Manager</option>
                            <option value="Financial Manager">Financial Manager</option>
                            <option value="Transportation Manager">Payment Manager</option>
                        </select>
                        {error && <div className="invalid-feedback">{error}</div>}
                    </div>
                    <div className="input-group">
                        <input type="text" id="contactNumber" placeholder="Contact Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    
                    <button type="submit" className="signup-button">Sign Up</button> 
                    {error && <div className="error">{error}</div>}
                    <br />
                    <p>Have an account? <a href="" onClick={() => navigate('/stafflogin')} className="">Login Here </a></p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
