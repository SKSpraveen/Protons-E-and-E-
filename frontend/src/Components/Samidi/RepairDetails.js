import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Style/Repair.css"; 
import { useNavigate } from "react-router-dom";


function RepairDetails(){

    

    const [dataList, setDataList] = useState([]);
    const navigate=useNavigate();


    const getFetchData = async () =>{
        try {
            const response = await axios.get("http://localhost:8070/repair");
            console.log(response.data);
            if (response.data.success) {
                setDataList(response.data.repair);
                alert("Repair fetched successfully");
            } else {
                alert("Failed to fetch repair");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Failed to fetch repair");
        }
    };
    useEffect(() => {
        getFetchData();

    }, []);

    const handleDelete = (id) => {

        axios.delete(`http://localhost:8070/repair/delete/${id}`).then((res) => {
            alert("Delete Successfully");
            setDataList(dataList.filter(repair => repair._id !== id));
        }).catch((error) => {
            console.error("Error deleting repair:", error);
            alert("Failed to delete repair");
        });
    };


    return(
        <div className="body1">
        <br /><br />

        <div className="container1" style={{width:"100%"}}>
            <h1 style={{fontSize:"30px",marginLeft:"30%"}}><i>My Repair Request</i></h1>
        </div>
        <br />  
        <br />
        <br />



        <table class="table">
    <thead>
        <tr style={{textAlign:"center"}}>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Repair Type</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
                </tr>
    </thead>
    <tbody>
            {dataList.map((repair) =>(
                        <tr key={repair.id}>
                        <td>{repair.name}</td>
                        <td>{repair.email}</td>
                        <td>{repair.phone}</td>
                        <td>{repair.repairType}</td>
                        <td>{repair.description}</td>    
            <td>
                <button type="button"  onClick={()=> navigate(`/editRepair/${repair._id}`)}  class="btnAction1">Update</button>&emsp;<button type="button" onClick={() => handleDelete(repair._id)} class="btnAction2">Delete</button>
            </td>
                    </tr>
            ))}
    </tbody>
        </table>
        
        <br />


    <br /><br />
    </div> 

    );

}
export default RepairDetails;