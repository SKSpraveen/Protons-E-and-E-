
import React from 'react';
import { Box,Input } from "@mui/material";
import '../../Components/kk/css/salCal.css';
import { useNavigate, useLocation } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();


    const goBack = () => {
        navigate('/empTable');
    };
 


    return (
        <Box className='body1'>
            <div className="Container1">
                <div className="main">
                    <div className="topbar">
                        <a href="#" onClick={goBack}>Go Back</a>
                        
                    </div>
                    
                    <div className="row">
                        <div className="col-md-4 mt-1">
                            <div className="card text-center sidebar">
                                <div className="card-body">
                                <h1></h1>
                                    <div className="mt-3">
                                   
                                        <h1>Final Salary</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container">
     <form className="row g-3">
                           
        <div className="col-md-5" style={{marginLeft:"4%"}}>
            <label for="inputDiscount" className="form-label">Over Time</label>
            <Input type="phone" className="form-control" id="wNumber"/>
        </div>
        <div className="col-md-5">
            <label for="inputOldPrice" className="form-label">Bonuses</label>
            <Input type="phone" className="form-control" id="cNumber" />
        </div>
        <div className="col-10">
            <label for="inputNewPrice" className="form-label">Basic Salary</label>
            <Input type="password" className="form-control" id="inputNewPrice" />
        </div>
       
        <div className="col-md-5" style={{marginLeft:"4%"}}>
            <button type="submit" className="btn btn-primary">ADD</button>
        </div>

        <div className="col-md-5">
            <button type="button" className="btn btn-primary" >Cancel</button>
        </div>
                            </form>

                            <div className="card mb-3 content cardMargin">
                                
                                <div className="card-body">
                                   
                                   
                                    <div className="row">
                                        <div className="col-md-3">
                                            <h5>Leaves</h5>
                                        </div>
                                        <div className="col-md-9 text-secondary">
                                            <button className="button-42">Update table</button>
                                        </div>
                                    </div>
                                    <hr />
                                    
                                </div>
                            </div>
                        </div>
                    </div>
 
                </div>

            </div>
        </Box>
    );
}

export default Profile;
