
import React from 'react';
import { Box } from "@mui/material";
import '../../Components/kk/css/profile_emp.css';
import { useNavigate, useLocation } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const employeeData = state ? state.employeeData : null;

    const goBack = () => {
        navigate('/empTable');
    };
    const salCal = () => {
        navigate('/salary_cal');
    };

    const viewProfile = (employee) => {
        navigate('/emp_edit_permanentForm', { state: { employeeData: employee } });
    };
    return (
        <Box className='body1'>
            <div className="Container">
                <div className="main">
                    <div className="topbar">
                        <a href="#" onClick={goBack}>Go Back</a>
                        
                    </div>
                    {employeeData && (
                    <div className="row">
                        <div className="col-md-4 mt-1">
                            <div className="card text-center sidebar">
                                <div className="card-body">
                                <h1 style={{marginBottom:"40%"}}>{employeeData.name}</h1>
                                <h3 style={{marginBottom:"40%"}}>{employeeData.type}</h3>
                                    <div className="mt-3" >
                                   
                                        <button className='button-42' style={{marginRight:"4%"}} onClick={()=>viewProfile(employeeData)}>.Edit.</button>
                                        <button className='button-42'>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 mt-1">
                            <div className="card mb-3 content1">
                                <h1 className="m-3 pt-3 title_prof">User profile</h1>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <h5>Name</h5>
                                        </div>
                                        <div className="col-md-9 text-secondary">
                                        {employeeData.name}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-3">
                                            <h5>NIC</h5>
                                        </div>
                                        <div className="col-md-9 text-secondry">
                                        {employeeData.nic}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-3">
                                            <h5>Age</h5>
                                        </div>
                                        <div className="col-md-9 text-secondry">
                                        {employeeData.age}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-3">
                                            <h5>Email</h5>
                                        </div>
                                        <div className="col-md-9 text-secondry">
                                        {employeeData.email}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-3">
                                            <h5>Whatsapp Number</h5>
                                        </div>
                                        <div className="col-md-9 text-secondry">
                                        {employeeData.wNumber}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-3">
                                            <h5>Contact Number</h5>
                                        </div>
                                        <div className="col-md-9 text-secondry">
                                        {employeeData.cNumber}
                                        </div>
                                    </div>
                                  
                                </div>
                            </div>

                            <div className="card mb-3 content1">
                                <h1 className="m-3">Recent Projects</h1>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <h5>Salary Details</h5>
                                        </div>
                                        <div className="col-md-9 text-secondary">
                                            <button className="button-42" onClick={salCal}>Check</button>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-3">
                                            <h5>Leaves</h5>
                                        </div>
                                        <div className="col-md-9 text-secondary">
                                            <button className="button-42">Check</button>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-3">
                                            <h5>Attandance</h5>
                                        </div>
                                        <div className="col-md-9 text-secondary">
                                            <button className="button-42">Check</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
  )}
                </div>

            </div>
        </Box>
    );
}

export default Profile;
