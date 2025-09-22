import React from "react";
import  "../../.././Pages/Sasindu/StockManager.css"; 

function SuccessAlert({ message, onClose }) {
  return (
    <div className="alert alert-success" style={{width:"98%",marginLeft:"1%",fontWeight:"600"}} role="alert">
       {message}
       <button style={{marginLeft:"73%"}} type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
    </div>
  );
}

export default SuccessAlert;
