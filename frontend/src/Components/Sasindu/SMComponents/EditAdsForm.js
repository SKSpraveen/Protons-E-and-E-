import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../.././Pages/Sasindu/StockManager.css";
import { useParams } from "react-router-dom";

function EditAdsForm() { 
    const { itemId } = useParams();
    const [itemDetails, setItemDetails] = useState({});
    const [formData, setFormData] = useState({
        item: "",
        description: "",
        photo: "",
        discount: "",
        price: "",
        availability: "",
    });

    useEffect(() => {
        axios.get(`http://localhost:8070/Advertisement/${itemId}`)
            .then((response) => {
                setItemDetails(response.data);
                setFormData({
                    item: response.data.item,
                    description: response.data.description,
                    photo: response.data.photo,
                    discount: response.data.discount,
                    price: response.data.price,
                    availability: response.data.availability,
                });
            })
            .catch((error) => {
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
        axios.put(`http://localhost:8070/Advertisement/update/${itemId}`, formData)
            .then((response) => {
                console.log(response.data);
                // Handle success
                setFormData({
                    item: "",
                    description: "",
                    photo: "",
                    discount: "",
                    price: "",
                    availability: "",
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

        <div className="bottom">
            <br /> <br />
            <div className="containerSM">
                <h1 style={{fontSize:"28px",marginLeft:"30%"}}><i>Update Advertisement Details</i></h1>
            </div>
            <br />
            <div className="form">
                <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-10">
                    <br /><br />
                    <label for="inputItem" className="form-label1">Item</label>
                    <input type="text" className="form-control" id="item"  value={formData.item} onChange={handleChange}/>
                </div>
                <div className="col-10">
                    <label for="inputDescription" className="form-label1">Description</label>
                    <input type="text" className="form-control" id="description" value={formData.description} onChange={handleChange}/>
                </div>
                <div className="col-10">
                    <label for="inputPhoto" className="form-label1">Image</label>
                    <input type="text" className="form-control" id="photo" value={formData.photo} onChange={handleChange}/>
                </div>
                <div className="col-md-5" style={{marginLeft:"4%"}}>
                    <label for="inputDiscount" className="form-label1">Discount</label>
                    <input type="text" className="form-control" id="discount" value={formData.discount} onChange={handleChange}/>
                </div>
                <div className="col-10">
                    <label for="inputNewPrice" className="form-label1">Price</label>
                    <input type="text" className="form-control" id="price" value={formData.price} onChange={handleChange}/>
                </div>
                <div className="col-10">
                    <label for="inputAvailability" className="form-label1">Availability</label>
                    <input type="text" className="form-control" id="availability" value={formData.availability} onChange={handleChange}/>
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
export default EditAdsForm;
