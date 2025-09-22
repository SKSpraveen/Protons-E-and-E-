import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Stock_btn(){
  
    const navigate = useNavigate();

    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Added state for loading indicator

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8070/stock");
                if (response.data.success) {
                    const stocks = response.data.stocks;

                    // Group stocks by product code and sum their quantities
                    const inventory = {};
                    stocks.forEach(stock => {
                        if (inventory.hasOwnProperty(stock.productCode)) {
                            inventory[stock.productCode].quantity += stock.quantity;
                        } else {
                            inventory[stock.productCode] = { ...stock };
                        }
                    });

                    // Filter low stock products (quantity < 5)
                    const lowStock = Object.values(inventory).filter(item => item.quantity < 5);

                    setLowStockProducts(lowStock);
                    setIsLoading(false); // Update loading state
                } else {
                    setIsLoading(false); // Update loading state
                    alert("Failed to fetch stocks");
                }
            } catch (error) {
                setIsLoading(false); // Update loading state
                console.error("Error fetching data:", error);
                alert("Failed to fetch stocks");
            }
        };

        fetchData();
    }, []);

    return(
        <div>
             <div className="col-sm-6 mb-3 mb-sm-0" style={{margin:"auto"}}>
                    <div className="card" style={{marginLeft:"3%"}}>
                    <div className="card-body" style={{border:"1px solid"}}>
                        <h5 className="card-title"><u>Low Stock Notification</u></h5>
                        <br />
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : lowStockProducts.length > 0 ? (
                            <table className="ads-table table table-hover">
                                <thead>
                                    <tr style={{ textAlign: "center" }}>
                                        <th scope="col">Product Code</th>
                                        <th scope="col">Total Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lowStockProducts.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.productCode}</td>
                                            <td>
                                                <span style={{ color: "red" }}>Low Stock: {item.quantity}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p style={{color:"rgb(236, 67, 0)"}}>Stock are stable</p>
                        )}
                    </div>
                    </div>
                    <br />
                </div>
            <div class="d-grid gap-2 d-md-block">
                <button class="Stockbtn" type="button" onClick={()=> navigate('/addstock')}> <i class="fa fa-arrow-circle-down" aria-hidden="true"></i> Add Stock</button>
                <button class="Stockbtn" type="button" onClick={()=> navigate('/viewAllStock')}> <i class="fa fa-arrow-circle-up" aria-hidden="true"></i> View Stock</button>
             </div>
            
        </div>
    )
}
export default Stock_btn;
