import React, { useEffect, useState } from 'react';
import Header from '../../Components/Rasindu/Header';
import '../../App.css';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import '../../Components/Rasindu/css/flex.css';

function Income() {
    const navigate = useNavigate();

    // State variables to store total amounts
    const [totalBankIncome, setTotalBankIncome] = useState(0);
    const [totalCreditIncome, setTotalCreditIncome] = useState(0);
    const [totalDirectIncome, setTotalDirectIncome] = useState(0);

    useEffect(() => {
        // Fetch bank income data
        Axios.get('http://localhost:8070/api/bpayment')
            .then(response => {
                const bankIncome = response.data || [];
                const total = bankIncome.reduce((acc, income) => acc + income.amount, 0);
                setTotalBankIncome(total);
            })
            .catch(error => {
                console.error("Error fetching bank income:", error);
            });

        // Fetch credit income data
        Axios.get('http://localhost:8070/api/cards')
            .then(response => {
                const creditIncome = response.data || [];
                const total = creditIncome.reduce((acc, income) => acc + income.amount, 0);
                setTotalCreditIncome(total);
            })
            .catch(error => {
                console.error("Error fetching credit income:", error);
            });

        // Fetch direct income data
        Axios.get('http://localhost:8070/api/dpayment')
            .then(response => {
                const directIncome = response.data || [];
                const total = directIncome.reduce((acc, income) => acc + income.amount, 0);
                setTotalDirectIncome(total);
            })
            .catch(error => {
                console.error("Error fetching direct income:", error);
            });
    }, []);

    // Calculate the sum of totals
    const sumOfTotals = totalBankIncome + totalCreditIncome + totalDirectIncome;

    return (
        <div className="body1">
            <Header />
            <br />
            <br />
            <div className="card-body cbody" style={{width:"80%",marginLeft:"10%",paddingBottom:"20px"}}>
                <h5 className="card-header chead">Quick Views</h5><br />
                    <div class="d-grid gap-2 d-md-block">
                        <button className=" QuickViewbtn" style={{marginLeft:"5%"}} onClick={()=> navigate('/Bankintable')} type="button"><i class="fa fa-eye" aria-hidden="true"></i> Bank Payment</button>
                        <button className=" QuickViewbtn" style={{marginLeft:"17%"}} onClick={()=> navigate('/Directintable')} type="button"><i class="fa fa-eye" aria-hidden="true"></i> Direct Payment</button>
                        <button className=" QuickViewbtn" style={{marginLeft:"20%"}} onClick={()=> navigate('/Cardintable')} type="button"><i class="fa fa-eye" aria-hidden="true"></i> Card Payment</button>
                        
                </div>
            </div>
            <br />
            <div style={{backgroundColor:"#000000cd",marginTop:"2%",height:"60%"}}>
                <h2 style={{fontSize:"50px"}}>Total Incomes</h2>

                <div className="full">
                    <div className="rflex-container">
      

                        <div  style={{ backgroundColor: "#f77834", padding: "10px", borderRadius: "10px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",height:"200px" }} className="rflex-box">
                            <h1 style={{ fontSize: "30px", marginTop: "10px", marginBottom: "10px", color: "#0f0f0f" ,fontWeight:"bold"}}>Total Bank Income</h1>
                            <h2 style={{ fontSize: "70px", marginTop: "10px", marginBottom: "10px", color: "#fff", fontWeight: "bold" }}>{totalBankIncome}</h2>
                        </div>

                        <div  style={{ backgroundColor: "#f77834", padding: "10px", borderRadius: "10px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",height:"200px" }} className="rflex-box">
                            <h1 style={{ fontSize: "30px", marginTop: "10px", marginBottom: "10px", color: "#0f0f0f",fontWeight:"bold" }}>Total Credit Income</h1>
                            <h2 style={{ fontSize: "70px", marginTop: "10px", marginBottom: "10px", color: "#fff", fontWeight: "bold" }}>{totalCreditIncome}</h2>
                        </div>

                        <div  style={{ backgroundColor: "#f77834", padding: "10px", borderRadius: "10px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",height:"200px" }} className="rflex-box">
                            <h1 style={{ fontSize: "30px", marginTop: "10px", marginBottom: "10px", color: "#0f0f0f",fontWeight:"bold" }}>Total Direct Income</h1>
                            <h2 style={{ fontSize: "70px", marginTop: "10px", marginBottom: "10px", color: "#fff", fontWeight: "bold" }}>{totalDirectIncome}</h2>
                        </div>

                        <div  style={{ backgroundColor: "#f77834", padding: "10px", borderRadius: "10px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",height:"200px" }} className="rflex-box">
                            <h1 style={{ fontSize: "30px", marginTop: "10px", marginBottom: "10px", color: "#0f0f0f",fontWeight:"bold" }}>Sum of Totals</h1>
                            <br></br>
                            <h2 style={{ fontSize: "70px", marginTop: "10px", marginBottom: "10px", color: "#fff", fontWeight: "bold" }}>{sumOfTotals}</h2>
                        </div>

                     </div>
                </div>
            </div>
            <br /><br />
        </div>
    )
}

export default Income;
