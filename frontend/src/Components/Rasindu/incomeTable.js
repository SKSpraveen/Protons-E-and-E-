import React from "react";
import { useNavigate } from 'react-router-dom';
import '../../Components/Rasindu/css/table.css';


function incomeTabale({ rows }){
    // Function to calculate total amount
    const calculateTotalB = () => {
        let total = 0;
        rows.forEach(Bankincome => {
            total += Bankincome.amount;
        });
        return total;
    };


    
    return(
        <div>
            <div className="rtable-possition">
            <table className="rtable-fill">
            <thead>
            <tr className="rtrTable">
            <th className="rthTable">Product Name</th>
            <th className="rthTable">Amount(Rs.)</th>
            
            
            </tr>
            </thead>
            <tbody className="table-hover">
            {rows && rows.length > 0 ? (
                            rows.map((Bankincome, index) => (
                                <tr className="rtrTable" key={index}>
                                    <td className="rtdTable">{Bankincome.product}</td>
                                    <td className="rtdTable">{Bankincome.amount}</td>
                                    
                                    
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No Data found</td>
                            </tr>
                        )}
            
            </tbody>
            </table>
  

            </div>
  <h3 style={{marginLeft:"60%"}}>Total Bank Incomes(Rs) :&emsp;{calculateTotalB()}/=</h3>
  <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
        </div>
    )

}
export default incomeTabale;