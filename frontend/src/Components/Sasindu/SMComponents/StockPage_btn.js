import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Stock_btn() {
    const navigate = useNavigate();

    const [inventoryData, setInventoryData] = useState([]);
    const [dataList, setDataList] = useState([]);
    const [cartData, setCartData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8070/stock");
            if (response.data.success) {
                const stocks = response.data.stocks;
                const inventory = {};
                stocks.forEach(stock => {
                    if (inventory.hasOwnProperty(stock.productCode)) {
                        inventory[stock.productCode].quantity += stock.quantity;
                    } else {
                        inventory[stock.productCode] = { ...stock };
                    }
                });

                // Convert inventory object to array for rendering
                const aggregatedData = Object.values(inventory);
                setInventoryData(aggregatedData);
            } else {
                alert("Failed to fetch stocks");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Failed to fetch stocks");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchCartData = async () => {
        try {
            const response = await axios.get("http://localhost:8070/cart");
            if (response.data.success) {
                setCartData(response.data.cart);
            } else {
                alert("Failed to fetch cart data");
            }
        } catch (error) {
            console.error("Error fetching cart data:", error);
            alert("Failed to fetch cart data");
        }
    };

    useEffect(() => {
        fetchCartData();
    }, []);

    // Filter inventory data to get low stock products
    useEffect(() => {
        const lowStockData = inventoryData.filter(item => {
            const totalQuantityInCart = cartData.reduce((acc, cartItem) => {
                if (cartItem.product === item.product) {
                    return acc + cartItem.orderQuantity;
                }
                return acc;
            }, 0);
            const remainingQuantity = item.quantity - totalQuantityInCart;
            return remainingQuantity < 5;
        });
        setDataList(lowStockData);
    }, [inventoryData, cartData]);

    return (
        <div>
            <div className="col-sm-6 mb-3 mb-sm-0" style={{ margin: "auto" }}>
                <div className="card" style={{ marginLeft: "3%" }}>
                    <div className="card-body" style={{ border: "1px solid" }}>
                        <h5 className="card-title" style={{fontWeight:"700"}}><u>Stock Status</u></h5>
                        <br />
                        {dataList.length === 0 ? (
                            <marquee scrollamount="5" loop="-1"><p style={{fontWeight:"bold",color:"indigo",fontSize:"17px" }}>Stock is stable</p></marquee>
                        ) : (
                            <table className="ads-table table table-hover">
                                <thead>
                                    <tr style={{ textAlign: "center" }}>
                                        <th scope="col">Product Code</th>
                                        <th scope="col">Product</th>
                                        <th scope="col">Total Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataList.map((item, index) => {
                                        const totalQuantityInCart = cartData.reduce((acc, cartItem) => {
                                            if (cartItem.product === item.product) {
                                                return acc + cartItem.orderQuantity;
                                            }
                                            return acc;
                                        }, 0);
                                        const remainingQuantity = item.quantity - totalQuantityInCart;
                                        
                                        return (
                                            <tr key={index}>
                                                <td>{item.productCode}</td>
                                                <td>{item.product}</td>
                                                <td>
                                                    {remainingQuantity < 5 ? (
                                                        <span style={{ color: "red", fontWeight: "bold" }}>Low Stock Alert : {remainingQuantity}</span>
                                                    ) : (
                                                        remainingQuantity
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
                <br />
            </div>
            <div class="d-grid gap-2 d-md-block">
                <button class="Stockbtn" type="button" onClick={() => navigate('/addstock')}> <i class="fa fa-arrow-circle-down" aria-hidden="true"></i> Add Stock</button>
                <button class="Stockbtn" type="button" onClick={() => navigate('/viewAllStock')}> <i class="fa fa-arrow-circle-up" aria-hidden="true"></i> View Stock</button>
            </div>
            <br />
            <br /><br /><br /><br /><br />
        </div>
    )
}

export default Stock_btn;
