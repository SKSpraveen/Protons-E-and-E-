import React, { useEffect, useState } from "react";
import axios from "axios";
import "../StockManager.css";
import { useNavigate, useParams } from "react-router-dom";

function MyCart() {

    const [dataList, setDataList] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();

    const getFetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8070/Cart");
            console.log(response.data);
            if (response.data.success) {
                setDataList(response.data.cart);
            } else {
                alert("Failed to fetch my items");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Failed to fetch my item");
        }
    };

    useEffect(() => {
        getFetchData();
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8070/Cart/delete/${id}`)
            .then((res) => {
                alert("Delete Successfully");
                setDataList(dataList.filter(cart => cart._id !== id));
            })
            .catch((error) => {
                console.error("Error deleting cart:", error);
                alert("Failed to delete cart");
            });
    };

    const handleQuantityUpdate = (id, newQuantity) => {
        axios.put(`http://localhost:8070/Cart/update/${id}`, { orderQuantity: newQuantity })
            .then((res) => {
                // Refresh the cart data after update
                getFetchData();
            })
            .catch((error) => {
                console.error("Error updating quantity:", error);
                alert("Failed to update quantity");
            });
    };

    useEffect(() => {
        // Calculate total amount whenever dataList changes
        let sum = 0;
        dataList.forEach((cart) => {
            sum += cart.amount * cart.orderQuantity;
        });
        setTotalAmount(sum);
    }, [dataList]);

    return (
        <div>
            <br /> <br />
            <div className="containerSM" style={{ width: "90%" }}>
                <h1 style={{ fontSize: "28px", marginLeft: "1%" }}><i>My cart</i></h1>
            </div>
            <br /><br />
            <div style={{ display: "flex", justifyContent: "center" }}>
            {dataList.length === 0 ? (
                <p style={{fontWeight:"bold"}}>Your cart is empty... <i style={{fontWeight:"bold",color:"rgb(236, 67, 0)",fontSize:"22px"}} class="fa fa-frown-o" aria-hidden="true"></i></p>
            ) : (
                <React.Fragment>
                    <table className="ads-table table table-hover" style={{ marginLeft: "6%" }}>
                        <thead>
                            <tr style={{ textAlign: "center",background:"#383838",fontWeight:"bold" }}>
                                <td><i style={{color:"black",fontWeight:"bold"}} class="fa fa-trash" aria-hidden="true"></i> #</td>
                                <td>Product</td>
                                <td>Qty</td>
                                <td>Unit Price</td>
                                <td>Tot Price + deli</td>
                                <td>Shop</td>
                            </tr>
                        </thead>
                        <tbody>
                            {dataList.map((cart) => (
                                <tr key={cart.id}>
                                    <td>
                                        <button type="button" onClick={() => handleDelete(cart._id)} style={{width:"80%",borderRadius:"5px",background:"red"}}><i class="fa fa-times" aria-hidden="true" style={{color:"white",fontWeight:"bold"}}></i></button>
                                    </td>
                                    <td>{cart.product}</td>
                                    <td style={{ textAlign: "center",width:"3%" }}>
                                        <input
                                            type="number"
                                            value={cart.orderQuantity}
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
                                            onChange={(e) => {
                                                const newQuantity = parseInt(e.target.value);
                                                handleQuantityUpdate(cart._id, newQuantity);
                                            }}
                                        />
                                    </td>
                                    <td style={{ textAlign: "center" }}>{cart.amount}</td>
                                    <td style={{ textAlign: "center" }}>{cart.amount * cart.orderQuantity+350}</td>
                                    <td>
                                    <button type="button" onClick={() => navigate('/payments', {
    state: {
        product: cart.product,
        amount: cart.amount * cart.orderQuantity + 350, // Total price including delivery
        orderQuantity: cart.orderQuantity
    }
})} className="btnPay">Pay</button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div class="card" style={{ width: "35%", marginLeft: "4%",marginRight:"7%", border: "1px solid",background:"#f2f2f2" }}>
                        <div class="card-body">
                            <h5 class="card-title"><i class="fa fa-calculator" aria-hidden="true"></i>&emsp;Cart totals &emsp;&emsp;&ensp;  </h5><hr /><br />
                            <div style={{ width: "100%", background: "rgba(228, 225, 225, 0.919)" }}><p class="card-text" style={{ marginLeft: "18px" }}>Total amount <b style={{ marginLeft: "33%" }}>Rs: {totalAmount.toFixed(2)}</b></p></div><br />
                            <div style={{ width: "100%", background: "rgba(228, 225, 225, 0.919)" }}><p class="card-text" style={{ marginLeft: "18px" }}>Product Tax <b style={{ marginLeft: "48%" }}>Rs : 0.00</b></p></div><br />
                            <div style={{ width: "100%", background: "rgba(228, 225, 225, 0.919)" }}><p class="card-text" style={{ marginLeft: "18px" }}>Delivery <b style={{ marginLeft: "50%" }}>Rs : 350.00</b></p></div><br />
                            <div style={{ width: "100%", background: "rgba(228, 225, 225, 0.919)" }}> <p class="card-text" style={{ marginLeft: "18px" }}>Grand Total <b style={{ marginLeft: "37%" }}>Rs : {(totalAmount + 350).toFixed(2)}</b></p></div><br />
                            <button className="checkout" onClick={() => navigate('/payments')} ><a href="#" style={{ textDecoration: "none", color: "white" }}>Checkout</a></button>
                        </div>
                    </div>
                </React.Fragment>
            )}
            </div>
            <br /><br /><br />
        </div>
    )
}

export default MyCart;
