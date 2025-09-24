import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { useSignUp } from '../../hooks/useSignUp';
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import OAuth from "../../Components/Kavishka/OAuth";


function Signup() {
    const navigate = useNavigate();
    const [name, setname] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({}); // State for validation errors
    const [error, setError] = useState(""); // State for sign up error message
    const { signUp, isLoading } = useSignUp();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await signUp(name, email, address, phoneNumber, password);
            } catch (error) {
                // Handle sign up error
            }
        }
    };

    const validateForm = () => {
        let errors = {};

        if (!name.trim()) {
            errors.name = "Name is required";
        }

        if (!email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid";
        }

        if (!address.trim()) {
            errors.address = "Address is required";
        }

        if (!phoneNumber.trim()) {
            errors.phoneNumber = "Phone number is required";
        } else if (!/^\d{10}$/.test(phoneNumber)) {
            errors.phoneNumber = "Phone number is invalid";
        }

       // Strong password validation
        if (!password.trim()) {
            errors.password = "Password is required";
        } else {
            const minLength = 8;
            const uppercase = /[A-Z]/;
            const lowercase = /[a-z]/;
            const number = /[0-9]/;
            const symbol = /[!@#$%^&*(),.?":{}|<>]/;

            if (
                password.length < minLength ||
                !uppercase.test(password) ||
                !lowercase.test(password) ||
                !number.test(password) ||
                !symbol.test(password)
            ) {
                errors.password = "Password must be at least 8 characters, include uppercase, lowercase, number, and symbol";
            }
        }
        setErrors(errors);

        return Object.keys(errors).length === 0; // Return true if there are no errors
    };

    return (
        <div>
            <Header />
            <div className="signup-container" style={{ display: 'flex' }}>
                <div className="image-container" style={{ flex: "1", backgroundColor: "#f2f2f2" }}>
                    <img src="https://w0.peakpx.com/wallpaper/471/576/HD-wallpaper-cctv-security-cameras-security-cctv-tech.jpg" alt="Signup Image" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "20px", width: "40%", backgroundColor: 'white' }}>
                    <div className="form-wrapper" style={{ padding: "30px", borderRadius: "10px", boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)" }}>
                        <h2 style={{ color: "black", textAlign: "center", marginBottom: "30px" }}>Sign Up</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group" style={{ marginBottom: "20px" }}>
                                <input type="text" id="firstName" placeholder="Name" value={name} onChange={(e) => setname(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: `1px solid ${errors.name ? "red" : "#ccc"}` }} />
                                {errors.name && <div className="error" style={{ color: "red" }}>{errors.name}</div>}
                            </div>
                            <div className="input-group" style={{ marginBottom: "20px" }}>
                                <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: `1px solid ${errors.email ? "red" : "#ccc"}` }} />
                                {errors.email && <div className="error" style={{ color: "red" }}>{errors.email}</div>}
                            </div>
                            <div className="input-group" style={{ marginBottom: "20px" }}>
                                <input type="text" id="address" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: `1px solid ${errors.address ? "red" : "#ccc"}` }} />
                                {errors.address && <div className="error" style={{ color: "red" }}>{errors.address}</div>}
                            </div>
                            <div className="input-group" style={{ marginBottom: "20px" }}>
                                <input type="text" id="contactNumber" placeholder="Contact Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: `1px solid ${errors.phoneNumber ? "red" : "#ccc"}` }} />
                                {errors.phoneNumber && <div className="error" style={{ color: "red" }}>{errors.phoneNumber}</div>}
                            </div>
                            <div className="input-group" style={{ marginBottom: "20px" }}>
                                <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: `1px solid ${errors.password ? "red" : "#ccc"}` }} />
                                {errors.password && <div className="error" style={{ color: "red" }}>{errors.password}</div>}
                            </div>
                            <button type="submit" className="signup-button" style={{ backgroundColor: "orange", color: "white", padding: "14px 20px", margin: "8px 0", border: "none", borderRadius: "4px", cursor: "pointer", width: "100%" }}>Sign Up</button>
                            {error && <div className="error" style={{ color: "red", textAlign: "center" }}>{error}</div>}
                            <br />
                            <OAuth/>
                            <p style={{ textAlign: "center" }}>Have an account? <a href="" onClick={() => navigate('/login')}>Login Here</a></p>
                        </form>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <Footer />
        </div>
    );
}

export default Signup;
