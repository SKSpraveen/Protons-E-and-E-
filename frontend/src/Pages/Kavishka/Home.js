import React from "react";
import {useNavigate} from "react-router-dom";



 function Home(){
    const Navigate=useNavigate();
    
    return(

        <div>
            <button onClick={()=>Navigate('/profile')}>User Profile</button>
            <button onClick={()=>Navigate('/admin')}>Admin</button>
            <button onClick={()=>Navigate('/staff')}>Staff</button>
        </div>
        
      
    )
 }
 export default Home;