import '../css/dash_container.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployee_intern } from '../api/addEmployeeInternDataApi';

function DashContainer() { // Renamed to start with an uppercase letter
    const [employeeCount, setEmployeeCount] = useState(0);
    const navigate = useNavigate();
  
    useEffect(() => {
      // Fetch the employee count when the component mounts
      getEmployeeCount();
    }, []);
  
    // Function to fetch the count of employees
    const getEmployeeCount = async () => {
      try {
        const employees = await getEmployee_intern();
        setEmployeeCount(employees.length);
      } catch (error) {
        console.error("Error:", error);
        // Handle error
      }
    };
    const handleEmployeeClick1 = () => {
        navigate('/admin');
    };
    return (
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
       
        <div style={{ backgroundColor: "#000000cd", marginTop: "2%", height: "60%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            
            <div className="full">
                <div className="rflex-container">
                    <div style={{ 
                            backgroundColor: "#f77834", 
                            padding: "10px", 
                            borderRadius: "10px", 
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", 
                            height: "200px",
                            display: "flex", 
                            flexDirection: "column", 
                            justifyContent: "center", 
                            alignItems: "center" 
                        }} className="rflex-box">
                        <h1 style={{ fontSize: "30px", marginTop: "10px", marginBottom: "10px", color: "#0f0f0f", fontWeight: "bold" }}>Admin Main</h1>
                        <button className="button-42" onClick={handleEmployeeClick1}>GO</button>
                        <h2 style={{ fontSize: "70px", marginTop: "10px", marginBottom: "10px", color: "#fff", fontWeight: "bold" }}></h2>
                    </div>
                    <div style={{ 
                            backgroundColor: "#f77834", 
                            padding: "10px", 
                            borderRadius: "10px", 
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", 
                            height: "200px",
                            display: "flex", 
                            flexDirection: "column", 
                            justifyContent: "center", 
                            alignItems: "center" 
                        }} className="rflex-box">
                        <h1 style={{ fontSize: "30px", marginTop: "10px", marginBottom: "10px", color: "#0f0f0f", fontWeight: "bold" }}>Employee count</h1>
                        <h1 style={{color:"#FFFFFF"}}>{employeeCount}</h1>
                        <h2 style={{ fontSize: "70px", marginTop: "10px", marginBottom: "10px", color: "#fff", fontWeight: "bold" }}></h2>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )

}

export default DashContainer;
