import React, { useState } from "react";
import '../../Components/Rasindu/css/exform.css';
import Axios from 'axios';

function AddExpencesForm() {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");
    const [errors, setErrors] = useState({});

    const clearForm = () => {
        setTitle("");
        setAmount("");
        setDate("");
        setCategory("");
        setErrors({});
    };

    const validateForm = () => {
        const errors = {};
        if (!title.trim()) {
            errors.title = "Title is required";
        }
        if (!amount.trim()) {
            errors.amount = "Amount is required";
        } else if (isNaN(amount)) {
            errors.amount = "Amount must be a number";
        }
        if (!date) {
            errors.date = "Date is required";
        }
        if (!category) {
            errors.category = "Category is required";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const sendData = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const newExpense = {
                title,
                amount,
                date,
                category,
            };
            Axios.post("http://localhost:8070/expence/add", newExpense)
                .then(() => {
                    alert("Successfull...");
                    clearForm();
                })
                .catch((err) => {
                    alert(err);
                });
        }
    };

    return (
        <div>
        
            <div className="container"style={{width:"45%",height:"65px",padding:"10px",background:"#000000cd"}} >
            <h1 style={{fontSize:"28px",marginLeft:"40%"}} className="rh1"><i>Add Expense</i></h1>
            <br />
            </div>
            <br></br>
            <div className="container_exform">
            <form onSubmit={sendData} className="row g-3 exform1">

                

                <div className="col-10">
                <br></br>
                <br></br>
                    <label htmlFor="inputDate" className="rformLabel">Date</label>
                    <input type="Date" className={`rform-control ${errors.date && 'is-invalid'}`} id="inputDate" value={date} onChange={(e) => setDate(e.target.value)} />
                    {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                </div>
                
                <div className="col-10">
                    <label htmlFor="inputAmount" className="rformLabel">Amount</label>
                    <input type="text" className={`rform-control ${errors.amount && 'is-invalid'}`} id="inputAmount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
                </div>

                <div className="col-10">
                    <label htmlFor="inputTitle" className="rformLabel">Title</label>
                    <input type="text" className={`rform-control ${errors.title && 'is-invalid'}`} id="inputTitle" value={title} onChange={(e) => setTitle(e.target.value)} />
                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>
                
                <div className="col-10">
                    <label htmlFor="inputType" className="rformLabel">Set Category</label>
                    <select id="inputType" className={`form-select ${errors.category && 'is-invalid'}`} value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option></option>
                        <option>Transport</option>
                        <option>Salary</option>
                        <option>Check</option>
                        <option>Other</option>
                    </select>
                    {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                </div>
                <div>
                    <button  className="rbtn-primary" type="submit">Submit</button>
                </div>
            </form>
            <br />
            
        </div>
        <br /> <br /> <br /> <br />
        </div>
        
    )
}

export default AddExpencesForm;
