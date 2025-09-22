import React, { useEffect, useState } from 'react';
import Header from '../../Components/Rasindu/Header';
import ExpenceTable from '../../Components/Rasindu/expenceTable';
import Axios from 'axios';

function Expence() {
    const [expenses, setExpenses] = useState([]);
    

    useEffect(() => {
        getExpenses();
    }, []);

    const getExpenses = () => {
        Axios.get('http://localhost:8070/expence')
            .then(response => {
                setExpenses(response.data || []); // Assuming response.data contains the array of expenses
            })
            .catch(error => {
                console.error("Axios Error:", error);
            });
    };

    
    return (
        <div className="body1">
            <Header />
            <ExpenceTable rows={expenses} />
        </div>
    );
}

export default Expence;
