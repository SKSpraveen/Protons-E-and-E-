import React, { useEffect, useState } from "react";
import "./StockManager.css";
import SM_Dashboard_Header from "../../Components/Sasindu/SMComponents/SM_Dashboard_Header";
import AddStockForm from "../../Components/Sasindu/SMComponents/AddStockForm";


function AddStock() {
  return (
    <div className="body1">
        <SM_Dashboard_Header />
       <AddStockForm />
    </div>
  );
}

export default AddStock;