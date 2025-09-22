import React from "react";

import '../../Components/Rasindu/css/table.css';

function creditincomeTabale({ rows }){
    // Function to calculate total amount
    const calculateTotalC = () => {
        let total = 0;
        rows.forEach(Creditincome => {
            total += Creditincome.amount;
        });
        return total;
    };

    
    return(
        <div >
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
                            rows.map((Creditincome, index) => (
                                <tr className="rtrTable" key={index}>
                                    <td className="rtdTable">{Creditincome.product}</td>
                                    <td className="rtdTable">{Creditincome.amount}</td>
                                    
                                    
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
  <h3 style={{marginLeft:"56%"}}>Total Credit Incomes(Rs) :&emsp;{calculateTotalC()}/=</h3> 
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </div>
    )

}
export default creditincomeTabale;