import React from "react";

import { useNavigate } from "react-router-dom";

function SM_Dashboard_Header(){

  const navigate=useNavigate();
    return(
      <div>
        <div className="header">
          <br /><br />
          <h2> Transportation Manager Dashboard </h2>
          <br></br>
           <nav>
              <div className="nav nav-tabs" style={{width:"100%"}} id="nav-tab" role="tablist">
                  <b> <h4 style={{color:"#000000e2"}}>&emsp;<u>Protons <span style={{color:"hwb(0 100% 0%)"}}>E&E</span></u></h4></b>
                  &emsp;&emsp; <button className="nav-link" onClick={()=> navigate('/transportation')} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true"><i class="fa fa-home" aria-hidden="true"></i>&emsp;Dashboard</button>
                  <button className="nav-link" onClick={()=> navigate('/transportationform')} id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>&emsp;Add Vehicle</button>
                  
                  <button className="nav-link" onClick={()=> navigate('/Editdetails')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-ambulance" aria-hidden="true"></i>&emsp;View Details</button>
                  <button className="nav-link" onClick={()=> navigate('/report_s')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-book" aria-hidden="true"></i>&emsp;Report</button>
                  
                  &emsp;<button className="nav-link" onClick={()=> navigate('/')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</button>
              </div>
          </nav>
       
        </div>
      </div>
      
    )
}
export default SM_Dashboard_Header;
