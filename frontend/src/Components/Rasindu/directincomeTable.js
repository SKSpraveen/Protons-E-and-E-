import React from "react";

import '../../Components/Rasindu/css/table.css';

function directincomeTabale({ rows }){
    // Function to calculate total amount
    const calculateTotalD = () => {
        let total = 0;
        rows.forEach(Directincome => {
            total += Directincome.amount;
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
                            rows.map((Directincome, index) => (
                                <tr className="rtrTable" key={index}>
                                    <td className="rtdTable">{Directincome.product}</td>
                                    <td className="rtdTable">{Directincome.amount}</td>

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
  <h3 style={{marginLeft:"60%"}}> Total Direct Incomes(Rs) :&emsp{calculateTotalD()}</h3>
  <br /><br /><br /><br /><br /><br />
        </div>
    )

}
export default directincomeTabale;