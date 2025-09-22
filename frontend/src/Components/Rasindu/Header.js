import React from "react";
import  "../../Components/Rasindu/css/FMdashboard.css"; // Import the CSS module
import { useNavigate } from "react-router-dom";

function FM_Dashboard_Header(){

  const navigate=useNavigate();
    return(
      <div>
        <div className="rhead">
          <br /><br />
          <h2 className="rh2Header">Welcome Financial Manager Dashboard !</h2>
          <br /><br />
           <nav>
              <div className="nav nav-tabs"  id="nav-tab" role="tablist">
                  <b> <h4 style={{color:"#000000e2"}}>&emsp;<u>Protons <span style={{color:"hwb(0 100% 0%)"}}>E&E</span></u></h4></b>
                  &emsp;&emsp; <button  className="nav-link" onClick={()=> navigate('/home')} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true"><i class="fa fa-home" aria-hidden="true"></i>&emsp;Dashboard</button>
                  <button  className="nav-link " onClick={()=> navigate('/intable')} id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false"><i class="fa fa-money" aria-hidden="true"></i>&emsp;Income</button>
                  <button  className="nav-link " onClick={()=> navigate('/exform')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-money" aria-hidden="true"></i>&emsp;Expense</button>
                  <div className="dropdown">
                  <button style={{textDecoration:"none"}} className="nav-link "  type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-file" aria-hidden="true"></i>&emsp;
                    Report
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><button className="dropdown-item" onClick={()=> navigate('/report')}>Expense Report</button></li>
                    <li><button className="dropdown-item" onClick={()=> navigate('/incomeReport')}>Income Report</button></li>
                    <li><button className="dropdown-item" onClick={()=> navigate('/finalReport')}>Final Report</button></li>
                  </ul>
                </div>                   &emsp;<button className="nav-link" onClick={()=> navigate('/')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</button>
              </div>
          </nav>
       
        </div>
      </div>
      
    )
}
export default FM_Dashboard_Header;