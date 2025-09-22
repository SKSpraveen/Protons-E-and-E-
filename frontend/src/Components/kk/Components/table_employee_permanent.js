import { Box } from "@mui/material"
import React from "react";
import { useNavigate } from "react-router-dom";
import '../../Rasindu/css/table.css';
import { deleteEmployee_permanent } from "../api/addEmployeePermanentDataApi";


const Table_employee_permanent = ({rows2,fetchData}) =>{

    const navigate = useNavigate();
    
    const viewProfile = (employee) => {
        navigate('/profile_p', { state: { employeeData: employee } });
    };

    const handleDelete2 = async (nic) => {
        try {
            await deleteEmployee_permanent(nic); 
            console.error('aaaaa')
            fetchData();
            console.error('bbbb')

     
        } catch (error) {
            console.error("Error deleting employee:", error);
  
        }
    };
        

    return(
        <Box >
           
        <div className="rtable-possition">
            <table class="rtable-fill">
            <thead>
            <tr className="rtrTable">
            <th class="text-left rthTable">Name</th>
            <th class="text-left rthTable">NIC</th>
            <th class="text-left rthTable">Age</th>
            <th class="text-left rthTable">Email</th>
            <th class="text-left rthTable">Whatsapp No.</th>
            <th class="text-left rthTable">Contact No.</th>
            <th class="text-left rthTable">Password</th>
            <th class="text-left rthTable">Action</th>
            </tr>
            </thead>
            <tbody class="table-hover">
            {rows2 && rows2.length > 0 && rows2.map(row => (
                            <tr key={row.nic}>
                                <td className="text-left rtdTable">{row.name}</td>
                                <td className="text-left rtdTable">{row.nic}</td>
                                <td className="text-left rtdTable">{row.age}</td>
                                <td className="text-left rtdTable">{row.email}</td>
                                <td className="text-left rtdTable">{row.wNumber}</td>
                                <td className="text-left rtdTable">{row.cNumber}</td>
                                <td className="text-left rtdTable">{row.password}</td>
                                <td className="text-left rtdTable">
                                    <button className="button-42" onClick={() => viewProfile(row)}>View</button>
                                    <button className="button-42" onClick={() => handleDelete2(row.nic)}>Delete</button>

                                </td>
                            </tr>
                        ))}
            </tbody>
            </table>
  

            </div>
        </Box>
    )
}
export default Table_employee_permanent;