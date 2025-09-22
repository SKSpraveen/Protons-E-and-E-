import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../.././Pages/Sasindu/StockManager.css";
import { useParams } from "react-router-dom";
import SuccessAlert from "./SuccessAlert"; 

function EditStockForm() { 
    const { itemId } = useParams();
    const [itemDetails, setItemDetails] = useState({});
    const [formData, setFormData] = useState({
        productCode:"",
        productCategory:"",
        product:"",
        supplyCompany:"",
        description:"",
        dateReceived:"",
        quantity:"",
        unitPrice:"",
    });

    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [redirectUrl, setRedirectUrl] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8070/Stock/${itemId}`)
            .then((response) => {
                setItemDetails(response.data);
                setFormData({
                    productCode: response.data.productCode,
                    productCategory: response.data.productCategory,
                    product: response.data.product,
                    supplyCompany: response.data.supplyCompany,
                    description: response.data.description,
                    dateReceived: response.data.dateReceived,
                    quantity: response.data.quantity,
                    unitPrice: response.data.unitPrice,
                });
            })
            .catch((error) => {
                setError(error); 
                console.error("Error fetching item details:", error);
            });
    }, [itemId]);
    

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8070/Stock/update/${itemId}`, formData)
            .then((response) => {
                console.log(response.data);
                // Handle success
                setIsSuccess(true);
                setFormData({
                    productCode: "",
                    productCategory: "",
                    product: "",
                    supplyCompany: "",
                    description: "",
                    dateReceived: "",
                    quantity: "",
                    unitPrice:"",
                });
            })
            .catch((error) => {
                setError("Failed to update stock. Please try again."); 
                if (error.response && error.response.status === 404) {
                    console.error("Resource not found:", error);
                    // Handle 404 error
                } else {
                    console.error("Error updating stock:", error);
                    // Handle other errors
                }
            });
    }

    const handleCloseSuccessAlert = () => {
        setIsSuccess(false);
        setRedirectUrl("/viewAllStock"); // navigate to previous page
    };

    useEffect(() => {
        if (redirectUrl) {
            window.location.href = redirectUrl;
        }
    }, [redirectUrl]);


    return (

        <div className="bottom">
            <br /><br />
            <div className="containerSM">
                <h1 style={{fontSize:"28px",marginLeft:"36%"}}><i>Update Stock Details</i></h1>
            </div>
            <br />
            <div className="form">
                    <form  className="row g-3"  onSubmit={handleSubmit}>

                            {isSuccess && ( <SuccessAlert message="Stock successfully updated!" onClose={handleCloseSuccessAlert} /> )}

                            {error && (
                            <div className="alert alert-danger" role="alert">
                                Error: {error}
                                <button type="button" className="btn-close" style={{marginLeft:"58%"}} aria-label="Close" onClick={() => setError(null)}></button>
                            </div>
                            )}

                            <div className="col-md-5" style={{marginLeft:"4%"}}>
                                <br /><br />
                                <label for="inputProductCode" className="form-label1">&ensp;Product Code</label>
                                <input type="text"   className="form-control" id="productCode" value={formData.productCode} onChange={handleChange} />
                            </div>
                    &emsp;<div className="col-md-5">
                                <br /><br />
                                <label for="inputProductCategory" className="form-label1">&ensp;Product Category</label>
                                <select id="productCategory" className="form-select" value={formData.productCategory} onChange={handleChange}>
                                <option>Select Category</option>
                                <option>CCTV</option>
                                <option>Door Lock</option>
                                <option>Door Phone</option>
                                <option>Alarms & Motion Detectors</option>
                                </select>
                                <br />
                            </div>
                            <div className="col-md-5" style={{marginLeft:"4%"}}>
                                <label for="inputProduct" className="form-label1">&ensp;Product</label>
                                <input type="text" className="form-control" id="product" value={formData.product} onChange={handleChange} />
                            </div>
                    &emsp;<div className="col-md-5">
                                <label for="inputSupplyCompany" className="form-label1">&ensp;Supply Company</label>
                                <input type="text" className="form-control" id="supplyCompany" value={formData.supplyCompany} onChange={handleChange} />
                                <br />
                            </div>
                            <br /><br />
                            <div className="col-10" style={{marginLeft:"1%"}}>
                                <label for="inputDescription" className="form-label1">Description</label>
                                <input type="text" className="form-control" id="description" value={formData.description} onChange={handleChange} />
                                <br />
                            </div>
                            <br /><br />
                            <div className="col-md-3" style={{marginLeft:"11%"}}>
                                <label for="inputDateReceived" className="form-label1">&ensp;Date Received</label>
                                <input type="date" className="form-control" id="dateReceived" value={formData.dateReceived} onChange={handleChange} />
                            </div>
                            <br />
                            <div className="col-md-3">
                                <label for="inputQuantity" className="form-label1">&ensp;Quantity</label>
                                <input type="text" className="form-control" id="quantity" value={formData.quantity} onChange={handleChange} />
                            </div>
                            <div className="col-md-3">
                                <label for="inputUnitPrice" className="form-label1">&ensp;Unit Price</label>
                                <input type="text" className="form-control" id="unitPrice" placeholder=" Rs :" value={formData.unitPrice} onChange={handleChange} />
                            </div>
                            <div className="col-6">
                                <br /> 
                            <button type="submit"  className="btn btn-primary1">Update</button>
                        </div>
                </form>
                <br />
            </div>
            <br /> <br /> <br /> <br />
        </div>
    );
}
export default EditStockForm;
