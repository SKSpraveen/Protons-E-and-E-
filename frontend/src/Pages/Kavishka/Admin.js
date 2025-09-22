import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";

function Admin() {
  const navigate = useNavigate();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    
   
      <div  className="body1">
        <div className="header">
          <br /><br />
          <h2>Welcome Admin Dashboard !</h2>
          <br /><br />
           <nav>
              <div className="nav nav-tabs" style={{width:"100%"}} id="nav-tab" role="tablist">
                  <b> <h4 style={{color:"#000000e2"}}>&emsp;<u>Protons <span style={{color:"hwb(0 100% 0%)"}}>E&E</span></u></h4></b>
                  &emsp;&emsp; <button className="nav-link" onClick={()=> navigate('/Admin')} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true"><i class="fa fa-home" aria-hidden="true"></i>&emsp;Dashboard</button>
                  <button className="nav-link" onClick={()=> navigate('/userDetails')} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true"><i class="fa fa-users" aria-hidden="true"></i>&emsp;Users</button>
                  <button className="nav-link" onClick={()=> navigate('/manager')} id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false"><i class="fa fa-users" aria-hidden="true"></i>&emsp;Managers</button>
                  <button className="nav-link" onClick={()=> navigate('/nonregfeed')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-comments" aria-hidden="true"></i>&emsp;Feedback</button>
                  <button className="nav-link" onClick={()=> navigate('/compadmin')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-book" aria-hidden="true"></i>&emsp;Complaint</button>
                  <button className="nav-link" onClick={()=> navigate('/faqadmin')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-comments" aria-hidden="true"></i>&emsp;FAQ</button>
                  <button className="nav-link" onClick={()=> navigate('/support')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-book" aria-hidden="true"></i>&emsp;Support</button>
                  &emsp;<button className="nav-link" onClick={()=> navigate('/Admin')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</button>
              </div>
          </nav>
       
        </div>
              <br/>
              <br/>
              <br/>

                  <div className="card" style={{width:"80%",marginLeft:"10%"}}> 
                
                <div className="card-body cbody">
                <h5 className="card-header chead">Quick Views</h5><br />
                    <div class="d-grid gap-2 d-md-block">
                        <div style={{display:"flex"}}>
                        <button className=" QuickViewbtn" style={{marginLeft:"6%",width:"200px",height:"100px",borderRadius:"10px",background:"black",color:"rgb(236, 67, 0)"}} onClick={()=> navigate('/smdashboard')} type="button"><i class="fa fa-eye" aria-hidden="true"></i>Stock Manager</button>
                        <button className=" QuickViewbtn" style={{marginLeft:"17%",width:"200px",height:"100px",borderRadius:"10px",background:"black",color:"rgb(236, 67, 0)"}} onClick={()=> navigate('/dashboard')} type="button"><i class="fa fa-eye" aria-hidden="true"></i>Employee Manager</button>
                        <button className=" QuickViewbtn" style={{marginLeft:"20%",width:"200px",height:"100px",borderRadius:"10px",background:"black",color:"rgb(236, 67, 0)"}} onClick={()=> navigate('/omdashboard')} type="button"><i class="fa fa-eye" aria-hidden="true"></i> Payment Manager</button>
                        </div>
                        <br/>
                        <br/>
                        <div style={{display:"flex"}}>
                        <button className=" QuickViewbtn" style={{marginLeft:"23%",width:"200px",height:"100px",borderRadius:"10px",background:"black",color:"rgb(236, 67, 0)"}} onClick={()=> navigate('/home')} type="button"><i class="fa fa-eye" aria-hidden="true"></i>Financial Manager</button>
                       
                        <button className=" QuickViewbtn" style={{marginLeft:"6%",width:"300px",marginLeft:"19%" ,width:"200px",height:"100px",borderRadius:"10px",background:"black",color:"rgb(236, 67, 0)"}} onClick={()=> navigate('')} type="button"><i class="fa fa-eye" aria-hidden="true"></i>Transportation Manager</button>
                        </div>
                    </div>
                </div>
            </div>
            <br /><br /><br />


      </div>
      
    
  );
}
export default Admin;