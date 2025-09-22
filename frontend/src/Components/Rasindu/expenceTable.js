import React from "react";
import '../../Components/Rasindu/css/table.css';
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";

const ExpenceTable = ({ rows }) => {
    const navigate = useNavigate();
    const { state } = useLocation();
    
    const deleteExpense = async (id) => {
        try {
            await Axios.delete(`http://localhost:8070/expence/delete/${id}`);
            alert("Expense deleted successfully.");
            // Reload the expense list after deletion
            window.location.reload();
        } catch (error) {
            console.error('Error deleting expense:', error);
            alert("Failed to delete expense. Please try again.");
        }
    };

    // Function to calculate total amount
    const calculateTotal = () => {
        let total = 0;
        rows.forEach(expense => {
            total += expense.amount;
        });
        return total;
    };

    

    

    return (
        <div>
            <div className="btn">
                <button style={{ color: "#ffffff", padding: "8px 20px", fontSize: "20px", background: '#fa5928' }} onClick={() => navigate('/addexpence')} type="button" className="btn btn-primary">Add Expence</button>
            </div>
            <div className="rtable-possition">
                <table className="rtable-fill">
                    <thead>
                        <tr>
                            <th className="rthTable">Date</th>
                            <th className="rthTable">Amount(Rs.)</th>
                            <th className="rthTable" >Title</th>
                            <th className="rthTable">Category</th>
                            <th className="rthTable"><center>Actions</center></th>
                        </tr>
                    </thead>
                    <tbody className="table-hover">
                        {rows && rows.length > 0 ? (
                            rows.map((expense, index) => (
                                <tr className="rtrTable" key={index}>
                                    <td className="rtdTable">{expense.date}</td>
                                    <td className="rtdTable">{expense.amount}</td>
                                    <td className="rtdTable">{expense.title}</td>
                                    <td className="rtdTable">{expense.category}</td>
                                    <td className="rtdTable">
                                        <button style={{ color: "#ffffff", padding: "5px 10px ", fontSize: "17px", background: '#4634eb' ,width:'100px'}} onClick={() => navigate(`/updateExpence/${expense._id}`)} type="button" className="btn btn-primary">Update</button>
                                    
                                    
                                        <button style={{ color: "#ffffff", padding: "5px 10px", fontSize: "17px", background: 'red' ,width:'100px' }} onClick={() => deleteExpense(expense._id)} type="button" className="btn btn-primary">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No expenses found</td>
                            </tr>
                        )}
                        {/* Display total */}
                        <tr>
                            <td colSpan="4" className="text-right">Total Expence(Rs):</td>
                            <td className="rtdTable">{calculateTotal()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExpenceTable;
