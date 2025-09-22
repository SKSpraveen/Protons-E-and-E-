import React, { useEffect, useState } from "react";
import axios from "axios";
import './Style/styles.css';
import { useParams } from "react-router-dom";

function Item() {
    const [product, setProduct] = useState("");
    const [orderQuantity, setOrderQuantity] = useState("");
    const [amount, setAmount] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const clearForm = () => {
        setProduct("");
        setOrderQuantity("");
        setAmount("");
    };

    function sendData(e) {
        e.preventDefault();

        // Check if orderQuantity is a valid number
        if (isNaN(orderQuantity) || orderQuantity <= 0) {
            alert("Please enter a valid quantity.");
            return;
        }

         // Calculate the discounted price
    const discountedPrice = itemDetails.discount > 0 ?
    (itemDetails.price - (itemDetails.price * itemDetails.discount / 100)) :
    itemDetails.price;

        const newCart = {
            product: itemDetails.item,
            orderQuantity: parseFloat(orderQuantity),
            amount: parseFloat(discountedPrice),  // Ensure amount is parsed to float
        };

        axios.post("http://localhost:8070/Cart/add", newCart)
            .then(() => {
                setShowPopup(true);
                clearForm();
            })
            .catch((err) => {
                alert(err);
            });
    }

    const { itemId } = useParams();
    const [itemDetails, setItemDetails] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8070/advertisement/${itemId}`)
            .then((response) => {
                setItemDetails(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching item details:", error);
                setLoading(false);
            });
    }, [itemId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="cardView"> 
                <div className="cardView-body">
                    <form onSubmit={sendData} className="row g-3">
                        <img  src={itemDetails.photo} style={{width:"100%",height:"300px",marginTop:"4%"}}/>
                        <p style={{textAlign: "center",marginTop:"4%"}}><strong  className="topic"><input style={{width:"100%",height:"40px",border:"none",fontSize:"20px",textAlign: "center", background: "#8f8f8fd1",fontWeight:"700"}} value={itemDetails.item} onChange={(e) => { setProduct(e.target.value); }} /></strong></p>
                        <p style={{textAlign: "center",fontSize:"20px"}}>{itemDetails.description}</p>
                        <input 
    style={{
        width:"100%",
        height:"40px",
        border:"none",
        fontSize:"20px",
        textAlign: "center",
        background: "#8f8f8fd1",
        fontWeight:"700"
    }}
    value={
        itemDetails.discount > 0 ? 
        `${itemDetails.price - (itemDetails.price * itemDetails.discount / 100)}` : 
        `${itemDetails.price}`
    }
    onChange={(e) => { setAmount(e.target.value); }} // Add this line to update amount state
/>


                        <div style={{textAlign: "center", marginTop: "10px"}}>
                            <label htmlFor="quantity"><strong>Quantity :</strong></label>
                            <input 
                                value={orderQuantity} 
                                onChange={(e) => { setOrderQuantity(e.target.value); }}
                                type="number" 
                                id="quantity" 
                                name="quantity" 
                                min="1"
                                max="8"
                                style={{
                                    width: "60px",
                                    padding: "5px",
                                    border: "2px solid #ccc",
                                    borderRadius: "30px",
                                    boxSizing: "border-box",
                                    fontSize: "16px",
                                    textAlign: "center",
                                    marginLeft: "10px"
                                }}
                            />
                        </div>
                        <button type="submit" className="btnAdd">Add to Cart</button>  
                    </form>
                    {/* Popup message */}
                    {showPopup && (
                        <div className="popup" style={{ top: "100%", right: "39%", transform: "translateY(-50%)" }}>
                            <div className="popup-content">
                                <p>Item added to cart!</p>
                                <button onClick={() => setShowPopup(false)}>Close</button>
                            </div>
                        </div>
                    )}
                </div>
            </div> 
        </div>
    );
}

export default Item;
