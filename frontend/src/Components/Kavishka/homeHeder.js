import React from "react";
import { useNavigate } from "react-router-dom";
import '../Style/styles.css';
function Header(){

  const navigate=useNavigate();
    return(
        <div>
           <p style={{marginLeft:"8%",color:"#5D6D7E",fontWeight:"800"}}>Wellcome Protons e&e <i class="fa fa-mobile" aria-hidden="true" style={{marginLeft:"63%",fontWeight:"700"}}>  
                   +110007654437</i> &ensp; | &ensp; <i class="fa fa-envelope-o" aria-hidden="true"  style={{fontWeight:"700"}}> qqqqqq@hff.com</i></p> 
           <hr  style={{border:"1px solid"}}></hr>
           <img src="../Images/pe.png" alt="" style={{width:"5%",height:"5%",marginLeft:"1%"}} />
           <button className="login-btn" onClick={()=> navigate('/profile')} style={{marginLeft:"87%",backgroundColor:"#E9E9E9",borderRadius:"3px",border:"none"}}><i class="fa fa-user-o" aria-hidden="true" style={{fontSize:"17px",color:"black",fontWeight:"550"}}>Profile</i></button>
           <nav className="navbar navbar-expand-lg bg-body-tertiary">
           <div className="container-fluid">
               <a className="navbar-brand" href="#"><b><h4 style={{color:"white"}}><u>Protons <span style={{color:"rgba(255, 74, 2, 0.816)"}}>E&E</span></u></h4></b></a>
               <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                 <span className="navbar-toggler-icon"></span>
               </button>
               <div className="collapse navbar-collapse" id="navbarNavDropdown">
                   <ul className="navbar-nav" style={{marginLeft:"13%"}}>

                      <li className="nav-item" >
                      <button className="nav-btn" onClick={()=> navigate('/')}> <a className="nav-link_H" aria-current="page" href="#">Home</a></button>
                      </li>

                      <li className="nav-item dropdown" style={{marginLeft:"18%"}}>
                       <a className="nav-link_H dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                           Instollation
                        </a>
                        <ul className="dropdown-menu" style={{width:"255px"}}>
                          <li><button className="dropdown-btn" onClick={()=> navigate('/cctv')}>CCTV&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;</button></li>
                          <li><button className="dropdown-btn" onClick={()=> navigate('/doorphone')}>DOOR PHONE&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;</button></li>
                          <li><button className="dropdown-btn" onClick={()=> navigate('/doorlock')}>DOOR LOCK&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&ensp;&ensp;</button></li>
                          <li><button className="dropdown-btn" onClick={()=> navigate('/alarm')}>ALARMS & MOTION DETECTOR&emsp;</button></li>
                        </ul>
                     </li>

                     <li className="nav-item" style={{marginLeft:"18%"}}>
                     <button className="nav-btn" onClick={()=> navigate('/repair')}><a className="nav-link_H" href="#">Repairing</a></button>
                     </li> 

                     <li className="nav-item" style={{marginLeft:"18%"}}>
                     <button className="nav-btn" onClick={()=> navigate('/')}>  <a className="nav-link_H" href="#">Aboutus</a></button>
                     </li>

                     <li className="nav-item" style={{marginLeft:"18%"}}>
                     <button className="nav-btn" onClick={()=> navigate('/')}>  <a className="nav-link_H" href="#">Complain</a></button>
                     </li>

                     <li className="nav-item" style={{marginLeft:"18%"}}>
                     <button className="nav-btn" onClick={()=> navigate('/Cart_View')}>  <a className="nav-link_H" href="#"><i class="fa fa-shopping-cart" aria-hidden="true"></i></a></button>
                     </li>

                   </ul>
                 </div>
               </div>
            </nav>
        </div>
    )
}
export default Header;