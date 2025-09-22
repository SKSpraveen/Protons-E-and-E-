import React from "react"
import {useNavigate} from 'react-router-dom';




const NavHead =({}) =>{
    const navigate = useNavigate();

    const handleEmployeeClick1 = () => {
        navigate('/empTable');
    };

    const handleEmployeeClick2 = () => {
        navigate('/dashboard');
    };

    const handleEmployeeClick3 = () => {
        navigate('/salTable');
    };
    const handleEmployeeClick4 = () => {
        navigate('/finReport');
    };

    
    return(
        <div>
        <div className="rhead">
          <br /><br />
          <h2 className="rh2Header">Welcome Employee Manager Dashboard !</h2>
          <br /><br />
           <nav>
              <div className="nav nav-tabs"  id="nav-tab" role="tablist">
                  <b> <h4 style={{color:"#000000e2"}}>&emsp;<u>Protons <span style={{color:"hwb(0 100% 0%)"}}>E&E</span></u></h4></b>
                  &emsp;&emsp; <button  className="nav-link" onClick={handleEmployeeClick2} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true"><i class="fa fa-home" aria-hidden="true"></i>&emsp;Dashboard</button>
                  <button  className="nav-link " onClick={handleEmployeeClick1} id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false"><i class="fa fa-money" aria-hidden="true"></i>&emsp;Employee</button>
                  <button  className="nav-link " onClick={handleEmployeeClick3} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-money" aria-hidden="true"></i>&emsp;Salary</button>
                  <button  className="nav-link " onClick={handleEmployeeClick4} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-money" aria-hidden="true"></i>&emsp;Report</button>

                               &emsp;<button className="nav-link" onClick={()=> navigate('/')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</button>
              </div>
          </nav>
       
        </div>
      </div>
    )
}

export default NavHead;