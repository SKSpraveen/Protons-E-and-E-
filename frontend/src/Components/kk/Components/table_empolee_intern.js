import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteEmployee_intern } from "../api/addEmployeeInternDataApi";
import '../css/table.css'

const Table_employee_intern = ({ rows,fetchData }) => {
    const navigate = useNavigate();

    const viewProfile = (employee) => {
        navigate('/profile_kk', { state: { employeeData: employee } });
    };

    const handleDelete = async (nic) => {
        try {
            await deleteEmployee_intern(nic); 
            fetchData();
     
        } catch (error) {
            console.error("Error deleting employee:", error);
  
        }
    };

    

   
    return (
        <Box>
            <div className="rtable-possition">
                <table className="rtable-fill">
                    <thead>
                        <tr>
                            <th className="rthTable">Name</th>
                            <th className="rthTable">NIC</th>
                            <th className="rthTable">Age</th>
                            <th className="rthTable">Email</th>
                            <th className="rthTable">Whatsapp No.</th>
                            <th className="rthTable">Contact No.</th>
                            <th className="rthTable">Action</th>
                        </tr>
                    </thead>
                    <tbody className="table-hover">
                        {rows && rows.length > 0 && rows.map(row => (
                            <tr key={row.nic}>
                                <td className="rtdTable">{row.name}</td>
                                <td className="rtdTable">{row.nic}</td>
                                <td className="rtdTable">{row.age}</td>
                                <td className="rtdTable">{row.email}</td>
                                <td className="rtdTable">{row.wNumber}</td>
                                <td className="rtdTable">{row.cNumber}</td>
                                <td className="rtdTable">
                                    <button className="button-42" onClick={() => viewProfile(row)}>View</button>
                                    <button className="button-42" onClick={() => handleDelete(row.nic)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Box>
    );
};

export default Table_employee_intern;
