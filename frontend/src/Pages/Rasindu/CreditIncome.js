import React, { useEffect, useState } from 'react';
import Header from '../../Components/Rasindu/Header';
import '../../App.css';
import CreditincomeTable from '../../Components/Rasindu/creditincomeTable'
import Axios from 'axios';


function CreditIncome(){
    const [Creditincome,setIncome] = useState([]);

    useEffect(() => {
        getIncome();
    },[]);

    const getIncome = () => {
        Axios.get('http://localhost:8070/api/cards')
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
           <CreditincomeTable rows={Creditincome} />

        </div>
    )
}
export default CreditIncome; 