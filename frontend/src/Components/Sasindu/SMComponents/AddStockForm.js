import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddStockForm() {
    const [productCode, setProductCode] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [product, setProduct] = useState("");
    const [supplyCompany, setSupplyCompany] = useState("");
    const [description, setDescription] = useState("");
    const [dateReceived, setDateReceived] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [errors, setErrors] = useState({
        productCode: "",
        productCategory: "",
        product: "",
        supplyCompany: "",
        description: "",
        dateReceived: "",
        quantity: "",
        unitPrice: "",
    });

    const clearForm = () => {
        setProductCode("");
        setProductCategory("");
        setProduct("");
        setSupplyCompany("");
        setDescription("");
        setDateReceived("");
        setQuantity("");
        setUnitPrice("");
    };

    const navigate = useNavigate();

    const validateInputs = () => {
        let valid = true;
        const newErrors = { ...errors };

        // Validation for Product Code
        if (!productCode) {
            newErrors.productCode = "* Product Code is required";
            valid = false;
        } else {
            newErrors.productCode = "";
        }

        // Validation for Product Category
        if (!productCategory) {
            newErrors.productCategory = "* Product Category is required";
            valid = false;
        } else {
            newErrors.productCategory = "";
        }

        // Validation for Product
        if (!product) {
            newErrors.product = "* Product is required";
            valid = false;
        } else {
            newErrors.product = "";
        }

        // Validation for Supply Company
        if (!supplyCompany) {
            newErrors.supplyCompany = "* Supply Company is required";
            valid = false;
        } else {
            newErrors.supplyCompany = "";
        }

        // Validation for Date Received
        if (!dateReceived) {
            newErrors.dateReceived = "* Date is required";
            valid = false;
        }
         else {
            newErrors.dateReceived = "";
        }

        // Validation for Quantity
        if (!quantity) {
            newErrors.quantity = "* Quantity is required";
            valid = false;
        } else if (isNaN(quantity)) {
            newErrors.quantity = "* Please enter valid input";
            valid = false;
        } else {
            newErrors.quantity = "";
        }

        // Validation for Unit Price
        if (!unitPrice) {
            newErrors.unitPrice = "* Unit Price is required";
            valid = false;
        } else if (isNaN(unitPrice)) {
            newErrors.unitPrice = "* Please enter valid input";
            valid = false;
        } else {
            newErrors.unitPrice = "";
        }

        setErrors(newErrors);
        return valid;
    };

    const sendData = (e) => {
        e.preventDefault();

        if (!validateInputs()) {
            return;
        }

        const newStock = {
            productCode,
            productCategory,
            product,
            supplyCompany,
            description,
            dateReceived,
            quantity: parseFloat(quantity),
            unitPrice: parseFloat(unitPrice),
        };

        axios
            .post("http://localhost:8070/stock/add", newStock)
            .then(() => {
                alert("Stock Added");
                clearForm();
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <div>
            <br />
            <br />
            <button type="button" onClick={() => navigate("/viewAllStock")} class="viewAllBtn"><i class="fa fa-eye" aria-hidden="true"></i> View All </button>
            <br />
            <br />
            <div className="containerSM">
                <h1 style={{ fontSize: "28px", marginLeft: "43%" }}>
                    <i>Add Stock</i>
                </h1>
            </div>
            <br />
            <div className="form">
                <form className="row g-3" onSubmit={sendData}>
                    <div className="col-md-5" style={{ marginLeft: "4%" }}>
                        <br /><br />
                        <label for="inputProductCode" className="form-label1">
                            &ensp;Product Code
                        </label>
                        <input type="text" value={productCode} onChange={(e) => { setProductCode(e.target.value); }} className="form-control" id="productCode" />
                        {errors.productCode && <div className="text-danger" style={{marginLeft:"12%"}}>{errors.productCode}</div>}
                    </div>
                     &emsp;
                    <div className="col-md-5">
                        <br /><br />
                        <label for="inputProductCategory" className="form-label1">
                            &ensp;Product Category
                        </label>
                        <select id="productCategory" value={productCategory} onChange={(e) => { setProductCategory(e.target.value); }} className="form-select">
                            <option>Select Category</option>
                            <option>CCTV</option>
                            <option>Door Lock</option>
                            <option>Door Phone</option>
                            <option>Alarms & Motion Detectors</option>
                        </select>
                        {errors.productCategory && <div className="text-danger" style={{marginLeft:"12%"}}>{errors.productCategory}</div>}
                    </div>
                    <div className="col-md-5" style={{ marginLeft: "4%" }}>
                        <label for="inputProduct" className="form-label1">
                            &ensp;Product
                        </label>
                        <input type="text" value={product} onChange={(e) => { setProduct(e.target.value); }} className="form-control" id="product" />
                        {errors.product && <div className="text-danger" style={{marginLeft:"12%"}}>{errors.product}</div>}
                    </div>
                    &emsp;
                    <div className="col-md-5">
                        <label for="inputSupplyCompany" className="form-label1">
                            &ensp;Supply Company
                        </label>
                        <input type="text" value={supplyCompany} onChange={(e) => { setSupplyCompany(e.target.value); }} className="form-control" id="supplyCompany" />
                        {errors.supplyCompany && <div className="text-danger" style={{marginLeft:"12%"}}>{errors.supplyCompany}</div>}
                        <br />
                    </div>
                    <br />
                    <div className="col-10" style={{ marginLeft: "1%" }}>
                        <label for="inputDescription" className="form-label1">
                            &ensp;Description
                        </label>
                        <input type="text" value={description} onChange={(e) => { setDescription(e.target.value); }} className="form-control" id="description" />
                        <br />
                    </div>
                    <br />
                    <div className="col-md-3" style={{ marginLeft: "11%" }}>
                        <label for="inputDateReceived" className="form-label1">
                            &ensp;Date Received
                        </label>
                        <input type="date" value={dateReceived} onChange={(e) => { setDateReceived(e.target.value); }} className="form-control" id="dateReceived" />
                        {errors.dateReceived && <div className="text-danger" style={{marginLeft:"12%"}}>{errors.dateReceived}</div>}
                    </div>
                    <br />
                    <div className="col-md-3">
                        <label for="inputQuantity" className="form-label1">
                            &ensp;Quantity
                        </label>
                        <input type="text" value={quantity} onChange={(e) => { setQuantity(e.target.value); }} className="form-control" id="quantity" />
                        {errors.quantity && <div className="text-danger" style={{marginLeft:"12%"}}>{errors.quantity}</div>}
                    </div>
                    <div className="col-md-3">
                        <label for="inputUnitPrice" className="form-label1">
                            &ensp;Unit Price
                        </label>
                        <input type="text" value={unitPrice} onChange={(e) => { setUnitPrice(e.target.value); }} className="form-control" id="unitPrice" placeholder=" Rs :" />
                        {errors.unitPrice && <div className="text-danger" style={{marginLeft:"12%",fontWeight:"400"}}>{errors.unitPrice}</div>}
                    </div>
                    <div className="col-6">
                        <br />
                        <button type="submit" className="btn btn-primary1"> Add</button>
                    </div>
                </form>
                <br />
            </div>
            <br /><br /><br />
        </div>
    );
}
export default AddStockForm;
