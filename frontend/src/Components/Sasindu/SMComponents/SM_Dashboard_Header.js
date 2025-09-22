import React from "react";
import  "../../.././Pages/Sasindu/StockManager.css"; // Import the CSS module
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../../hooks/useLogout";

function SM_Dashboard_Header(){

  const { logout } = useLogout();
  const navigate=useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

    return(
      <div>
        <div className="header">
          <br /><br />
          <h2>Welcome Stock Manager Dashboard !</h2>
          <br /><br />
           <nav>
              <div className="nav nav-tabs" style={{width:"100%"}} id="nav-tab" role="tablist">
                  <b> <h4 style={{color:"#000000e2"}}>&emsp;<b><u>Protons <span style={{color:"hwb(0 100% 0%)"}}>E&E</span></u></b></h4></b>
                  &emsp;&emsp; <button className="nav-link" onClick={()=> navigate('/smdashboard')} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true"><i class="fa fa-home" aria-hidden="true"></i>&emsp;Dashboard</button>
                  <button className="nav-link" onClick={()=> navigate('/ads')} id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>&emsp;Advertisement</button>
                  <button className="nav-link" onClick={()=> navigate('/stock')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-ambulance" aria-hidden="true"></i>&emsp;Stock</button>
                  <button className="nav-link" onClick={()=> navigate('/inventory')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-book" aria-hidden="true"></i>&emsp;Inventory</button>
                  &emsp;<button className="nav-link"  onClick={handleLogout} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</button>
              </div>
          </nav>
       
        </div>
      </div>
      
    )
}
export default SM_Dashboard_Header;