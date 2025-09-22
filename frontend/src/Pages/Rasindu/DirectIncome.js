import React, { useEffect, useState } from 'react';
import Header from '../../Components/Rasindu/Header';
import '../../App.css';
import DirectincomeTable from '../../Components/Rasindu/creditincomeTable'
import Axios from 'axios';


function DirectIncome(){
    const [Directincome,setIncome] = useState([]);

    useEffect(() => {
        getIncome();
    },[]);

    const getIncome = () => {
        Axios.get('http://localhost:8070/api/dpayment')
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
           <DirectincomeTable rows={Directincome} />

        </div>
    )
}
export default DirectIncome; 