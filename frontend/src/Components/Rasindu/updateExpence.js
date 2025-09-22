import React, { useState, useEffect } from "react";
import '../../Components/Rasindu/css/exform.css';
import {  useNavigate, useParams } from 'react-router-dom';
import  axios  from "axios";


function UpdateExpence(){
    const navigate=useNavigate();

    const {expenceId} = useParams();
    const [expenceDetails,setExpenceDetails]=useState({});
    const[formData,setFormData]=useState({
        title:"",
        amount:"",
        date:"",
        category:"",
    });

    useEffect(() => {
        axios.get(`http://localhost:8070/expence/${expenceId}`)
        .then((response)=>{
            setExpenceDetails(response.data);
            setFormData({
                title: response.data.title,
                amount: response.data.amount,
                date: response.data.date,
                category: response.data.category,
                
            });
        })
        .catch((error) => {
            console.error("Error fetching item details:", error);
        });
}, [expenceId]);


const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.id]: e.target.value,
    });
};

const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8070/expence/update/${expenceId}`, formData)
        .then((response) => {
            console.log(response.data);
            // Handle success
            setFormData({
                title:"",
                amount:"",
                date:"",
                category:"",
            });
        })
        .catch((error) => {
            if (error.response && error.response.status === 404) {
                console.error("Resource not found:", error);
                // Handle 404 error
            } else {
                console.error("Error updating advertisement:", error);
                // Handle other errors
            }
        });
}
        
   
    return (

        <div className="fu">
            <button style={{color:"#ffffff",padding:"4px 10px",fontSize:"18px", background:"#f56f42",marginTop:"17px",marginLeft:"90%",borderRadius:"10px"}} onClick={()=> navigate('/exform')}>Back</button>
        

            <div className="container_exform">
            <br></br>
            <br></br>
            <br></br>
            
            
            <h1 className="rh1"><i>Update Expense</i></h1>
            <br />
           
            <form className="row g-3_up" onSubmit={handleSubmit}>
                <div className="col-10">
                    <label htmlFor="inputTitle" className="rformLabel">Title</label>
                    <input type="text" className="rform-control" id="title" value={formData.title} onChange={handleChange} />
                </div>
                <div className="col-10">
                    <label htmlFor="inputAmount" className="rformLabel">Amount</label>
                    <input type="text" className="rform-control" id="amount" value={formData.amount} onChange={handleChange} />
                </div>
                <div className="col-10">
                    <label htmlFor="inputDate" className="rformLabel">Date</label>
                    <input type="Date" className="rform-control" id="date" value={formData.date} onChange={handleChange} />
                </div>
                <div className="col-10">
                    <label htmlFor="inputType" className="rformLabel">Set Category</label>
                    <select id="category" className="form-select" value={formData.category} onChange={handleChange}>
                        <option></option>
                        <option>Transport</option>
                        <option>Salary</option>
                        <option>Check</option>
                        <option>Other</option>
                    </select>
                </div>
                <div>
                    <button style={{width:"100px"}} className="rbtn-primary" type="submit">Submit</button>

                </div>
            </form>
            <br />
        </div>
        <br /> <br /> <br /> <br /> <br />
        </div>
    );
}

export default UpdateExpence;
