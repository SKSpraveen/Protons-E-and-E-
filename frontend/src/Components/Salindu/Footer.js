import React from "react";

function Footer(){
    
    return(
        <div>
            <div class="row" style={{marginTop:"14%"}}>
                <div class="col-sm-6 mb-3 mb-sm-0">
                    <div class="card">
                        <div class="card-body" style={{marginLeft:"7%"}}>
                            <h4 class="card-title"><img src="./Images/pe.png" alt="" style={{width:"6%",marginLeft:"1%"}} /></h4><p style={{fontWeight:"700",color:"#707B7C"}}>Protons electronic & electricles</p>
                            <p class="card-text">Call us.. 
                            <br />
                            <i class="fa fa-mobile" aria-hidden="true" style={{fontSize:"25px"}}> (+94) 779054434</i></p>
                            <br />
                            <p class="card-text" style={{color:"#707B7C"}}>No 34, 1st Lane,Weligama.</p>
                            <h3 style={{color:"#707B7C"}}><i class="fa fa-facebook-square" aria-hidden="true"></i> &emsp;
                            <i class="fa fa-twitter-square" aria-hidden="true"></i> &emsp;
                            <i class="fa fa-instagram" aria-hidden="true"></i></h3>
                            <br />
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body" style={{textAlign:"center",color:"#707B7C"}}>
                            <h6 class="card-title" style={{textAlign:"center",fontWeight:"800"}}><u>Info</u></h6>
                            <br />
                            <h6 class="card-title" ><a className="nav-link" href="#">Aboutus</a></h6>
                            <h6 class="card-title" ><a className="nav-link" href="#">Terms & conditions</a></h6>
                            <br />
                            <h6 class="card-title" style={{textAlign:"center",fontWeight:"800"}}><u>Customer Service</u></h6>
                            <br />
                            <h6 class="card-title" ><a className="nav-link" href="#">My Account</a></h6>
                            <h6 class="card-title" ><a className="nav-link" href="#">FAQs</a></h6>
                            <h6 class="card-title" ><a className="nav-link" href="#">Complain</a></h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer;