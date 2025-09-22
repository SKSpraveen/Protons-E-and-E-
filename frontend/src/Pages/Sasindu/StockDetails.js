import React, { useEffect, useState } from "react";
import axios from "axios";
import "../StockManager.css";
import { useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function StockDetails() {

    const [dataList, setDataList] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const navigate = useNavigate();

    const getFetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8070/Stock");
            console.log(response.data);
            if (response.data.success) {
                setDataList(response.data.stocks);
                alert("Stocks fetched successfully");
            } else {
                alert("Failed to fetch stocks");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Failed to fetch stocks");
        }
    };

    useEffect(() => {
        getFetchData();
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8070/Stock/delete/${id}`)
            .then((res) => {
                alert("Delete Successfully");
                setDataList(dataList.filter(stock => stock._id !== id));
            })
            .catch((error) => {
                console.error("Error deleting stock:", error);
                alert("Failed to delete stock");
            });
    };

    const handleSearchArea = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        if (searchQuery === "") {
            getFetchData(); // Fetch all data when search query is empty
        } else {
            const filteredStocks = dataList.filter(stock => {
                return (
                    stock.product.toLowerCase().includes(searchQuery)
                );
            });
            setDataList(filteredStocks);
        }
    };

    const handleSearchAreaDate = () => {

        if (startDate === "" && endDate === "") {
            getFetchData(); // Fetch all data when both input fields are empty
        } else {
            const filteredStocks = dataList.filter(stock => {
                const stockDate = new Date(stock.dateReceived);
                const start = startDate ? new Date(startDate) : null;
                const end = endDate ? new Date(endDate) : null;

                if (start && end) {
                    return stockDate >= start && stockDate <= end;
                } else if (start) {
                    return stockDate >= start;
                } else if (end) {
                    return stockDate <= end;
                } else {
                    return true;
                }
            });

            setDataList(filteredStocks);
        }
    };

    const handleReset = () => {
        setStartDate("");
        setEndDate("");
        getFetchData(); // Fetch all data
    };

    const generatePDF = () => {
        // Create a new instance of jsPDF
        const doc = new jsPDF();

        // Get the current date
        const currentDate = new Date();
        
        // Define the columns for the table
        const columns = ["Product Code", "Product Category", "Product", "Supply Company", "Date Received", "Quantity", "Unit Price", "Cost"];
        
        // Define the rows for the table body
        const rows = dataList.map(stock => [stock.productCode, stock.productCategory, stock.product, stock.supplyCompany, stock.dateReceived, stock.quantity, "Rs: "+ stock.unitPrice, "Rs: "+ stock.quantity*stock.unitPrice]);
         
        // Calculate total cost
         const totalCost = dataList.reduce((acc, stock) => acc + (stock.quantity * stock.unitPrice), 0);
       
        // Set table header
         doc.setFont("helvetica", "bold");  // Set font style to bold
         doc.setFontSize(16);   // Set font size to 16
         doc.setTextColor(0, 0, 0);   // Header text color
         doc.text("Protons Electronics & Electrical", 18, 15);   // Print "Protons Electronics & Electrical"

        // Add horizontal line 
         doc.line(18, 18, 200, 18);

        // Add the current date to the document
         doc.setFontSize(10); 
         const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
         doc.text(`Date : ${formattedDate}`, 168, 30);  // Adjust the position as needed
   
         doc.setFont("helvetica", "bold"); // Set font style to bold
         doc.setTextColor(0, 0, 0); // Header text color
         doc.setFontSize(12); // Reset font size
         doc.text("Stock Report", 18, 35); // Print "Stock Report" after the company name
        
        // Add table with custom styling
         doc.autoTable({
            head: [columns], // Only one row for the table head
            body: rows,
            startY: 45, // margine top
            theme: 'grid', // Use 'grid' theme for better visual separation
            styles: {
                fontSize: 10,
                overflow: 'linebreak', // Handle text wrapping
                cellPadding: 2,
                textColor: [0, 0, 0], // Text color
                fontStyle: 'normal', // Normal font style
                halign: 'center', // Center align content horizontally
                valign: 'middle', // Center align content vertically
            },
            columnStyles: {
                // Adjust column width if needed
                0: { cellWidth: 18 }, 
                1: { cellWidth: 25 }, 
                2: { cellWidth: 25 }, 
                3: { cellWidth: 28 }, 
                4: { cellWidth: 25 }, 
                5: { cellWidth: 17 }, 
                6: { cellWidth: 21 },
                7: { cellWidth: 25 },
            },
            margin: { top: 10 }, // Adjust top margin if needed
        });

        // Add total cost under the table
         doc.setFont("helvetica", "normal"); // Set font style to normal
         doc.setFontSize(11); // Set font size to 10

          doc.text(`Total Cost : Rs ${totalCost.toFixed(2)}`, 156, doc.lastAutoTable.finalY + 10);
        
        // Save the PDF
         doc.save("stock_details.pdf");
    };
    

    return (
        <div className="body1">
            <br />
            <button type="button" onClick={() => navigate('/addstock')} className="viewAllBtn" style={{ marginLeft: "88%" }}>
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i> CreateNew
            </button>
            <br /> <br /><br />
            <div className="containerSM" style={{ width: "100%" }}>
                <h1 style={{ fontSize: "28px", marginLeft: "1%" }}><i>Manage Stock</i></h1>
            </div>
            <div className="row">
                <div className="col-lg-3 mt-2 mb-2" style={{ display:"flex",alignItems: "center", marginLeft:"578px"}}>
                <label htmlFor="endDate" style={{marginRight: "10px", fontWeight: "bold" }}>Product:</label>
                <input className="form-control-search" type="search" placeholder="Search products" name="searchQuery" onChange={handleSearchArea} />
                </div>
            </div>
            <br />
            <div className="row">
            <div className="col-lg-3 mt-2 mb-2" style={{ display: "flex", alignItems: "center",marginLeft:"38%" }}>
                <label htmlFor="startDate" style={{ marginRight: "10px", fontWeight: "bold" }}>From:</label>
                <input id="startDate" style={{ marginRight: "10px",padding: "5px" }} className="dsearch" type="date" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <label htmlFor="endDate" style={{ marginRight: "10px", fontWeight: "bold" }}>To:</label>
                <input id="endDate" style={{padding: "5px"}} className="dsearch" type="date" placeholder="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
           </div>
           <div style={{  display: "flex"}}>
                <button className="StockdetailsSearch" onClick={handleSearchAreaDate}>Apply</button>&emsp;
                    <button className="StockdetailsReset" onClick={handleReset}>Clear</button>
                    </div>
            </div>
            <button className="pdf-btn" style={{marginLeft:"86%"}} onClick={generatePDF}> <i class="fa fa-download" aria-hidden="true"></i> Export to PDF</button>
            <br /> <br />
            <table className="ads-table table table-hover">
                <thead>
                    <tr style={{ textAlign: "center" }}>
                        <th scope="col">Product Code</th>
                        <th scope="col">Product Category</th>
                        <th scope="col"  style={{ width: "7%" }}>Product</th>
                        <th scope="col" style={{ width: "7%" }}>Supply Company</th>
                        <th scope="col">Description</th>
                        <th scope="col" style={{ width: "12%" }}>Date Received</th>
                        <th scope="col" style={{ width: "4%" }}>Quantity</th>
                        <th scope="col"style={{ width: "10%" }}>Unit Price</th>
                        <th scope="col" style={{ width: "12%" }}>Cost</th>
                        <th scope="col" style={{ width: "15%" }}>Action</th>
                    </tr>         </thead>
                <tbody>
                    {dataList.map((stock) => (
                        <tr key={stock.id}>
                            <td>{stock.productCode}</td>
                            <td>{stock.productCategory}</td>
                            <td>{stock.product}</td>
                            <td style={{ textAlign: "center" }}>{stock.supplyCompany}</td>
                            <td>{stock.description}</td>
                            <td style={{ textAlign: "center" }}>{stock.dateReceived}</td>
                            <td style={{ textAlign: "center" }}>{stock.quantity}</td>
                            <td style={{ textAlign: "center" }}>Rs: {stock.unitPrice}</td>
                            <td style={{ textAlign: "center" }}>Rs: {stock.unitPrice*stock.quantity}</td>
                            <td>
                                <button type="button" onClick={() => navigate(`/editStock/${stock._id}`)} className="btnAction1">Edit</button> <button type="button" onClick={() => handleDelete(stock._id)} className="btnAction2">Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br /><br />
        </div>
    );
}
export default StockDetails;
