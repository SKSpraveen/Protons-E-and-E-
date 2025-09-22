import React, { useEffect, useState } from 'react';
import Header from '../../Components/Rasindu/Header';
import '../../App.css';
import IncomeTabale from '../../Components/Rasindu/incomeTable.js';
import Axios from 'axios';


function BankIncome(){
    const [Bankincome,setIncome] = useState([]);

    useEffect(() => {
        getIncome();
    },[]);

    const getIncome = () => {
        Axios.get('http://localhost:8070/api/bpayment')
            .then(response => {
                setIncome(response.data || []); 
            })
            .catch(error => {
                console.error("Axios Error:", error);
            });
    };

    return(
        <div className="body1">
           <Header />
           <br />
           <br />
           <IncomeTabale rows={Bankincome} />

        </div>
    )
}
export default BankIncome; 