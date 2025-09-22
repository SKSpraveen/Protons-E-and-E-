import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../.././Pages/Sasindu/StockManager.css";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function CombinedDetails() {
    const [combinedData, setCombinedData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const stockResponse = await axios.get("http://localhost:8070/Stock");
                const advertisementResponse = await axios.get("http://localhost:8070/Advertisement");
                if (stockResponse.data.success && advertisementResponse.data.success) {
                    const combined = [];
                    const stockData = stockResponse.data.stocks;
                    
                    stockData.forEach(stock => {
                        const matchingAd = advertisementResponse.data.advertisements.find(advertisement => advertisement.item === stock.product);
                        if (matchingAd) {
                            const existingIndex = combined.findIndex(item => item.productCode === stock.productCode);
                            const newPrice = matchingAd.price - (matchingAd.price * matchingAd.discount / 100);
                            const newItem = {
                                productCode: stock.productCode,
                                product: stock.product,
                                price: matchingAd.price,
                                discount: matchingAd.discount,
                                newPrice: newPrice
                            };
                            
                            if (existingIndex === -1) {
                                combined.push(newItem);
                            } else {
                                combined[existingIndex] = newItem;     // Update existing item if found
                            }
                        }
                    });
    
                    setCombinedData(combined);
                    setOriginalData(combined);
                } else {
                    alert("Failed to fetch data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                alert("Failed to fetch data");
            }
        };
    
        fetchData();
    }, []);
   
    const handleSearchArea = (e) => {
        const searchQuery = e.target.value;
        setSearchQuery(searchQuery);   // Update searchQuery state
        
        if (searchQuery === "") {
            setCombinedData(originalData);    // If search query is empty, reset data to original
        } else {
            const filteredData = originalData.filter(data => {
                return (
                    data.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    data.productCode.toLowerCase().includes(searchQuery.toLowerCase())
                );
            });
            setCombinedData(filteredData);
        }
    };

    const generatePDF = () => {
        // Create a new instance of jsPDF
        const doc = new jsPDF();

        // Get the current date
        const currentDate = new Date();
        
        // Define the columns for the table
        const columns = ["Product Code", "Product", "Price", "Discount", "New Price"];
        
        // Define the rows for the table body
        const rows = combinedData.map(stock => [stock.productCode, stock.product, `Rs ${stock.price}`, stock.discount ? `${stock.discount}%` : '-', `Rs ${stock.price - (stock.price * (stock.discount || 0) / 100)}`]);

         
      
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
         doc.text("Price list", 18, 35); 
        
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
                0: { cellWidth: 20 }, 
                1: { cellWidth: 85 }, 
                2: { cellWidth: 25 }, 
                3: { cellWidth: 20 }, 
                4: { cellWidth: 25 }, 
         
            },
            margin: { top: 10 ,left: 17 }, // Adjust top margin if needed
        });
        
        // Save the PDF
         doc.save("Price_list.pdf");
    };



    return (
        <div>
            <br />
            <div className="containerSM" style={{ width: "80%" }}>
                <h1 style={{ fontSize: "28px", marginLeft: "1%" }}><i>Selling Price</i></h1>
            </div>  
            <div className="row">
                <div className="col-lg-3 mt-2 mb-2" style={{ display:"flex",alignItems: "center", marginLeft:"63%"}}>
                    <label htmlFor="searchQuery" style={{marginRight: "10px", fontWeight: "bold", display: "flex", alignItems: "center" }}><i class="fa fa-search" aria-hidden="true"  style={{ marginRight: "10px" }}></i>Search</label>
                    <input className="form-control-search" type="search" placeholder="Search product or productCode" name="searchQuery" value={searchQuery} onChange={handleSearchArea} />
                </div>
            </div>
            <br />
            <button className="pdf-btnSM" style={{marginLeft:"80%"}} onClick={generatePDF}> <i class="fa fa-download" aria-hidden="true"></i> Export to PDF</button>
            <br /> <br />
            <table className="ads-table table table-hover">
                <thead>
                    <tr style={{ textAlign: "center" }}>
                        <th scope="col">Product Code</th>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Discount</th>
                        <th scope="col">New Price</th>
                    </tr>
                </thead>
                <tbody>
                    {combinedData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.productCode}</td>
                            <td>{data.product}</td>
                            <td style={{ textAlign: "center" }}>{data.price ? `Rs ${data.price}` : '-'}</td>
                            <td style={{ textAlign: "center" }}>{data.discount ? `${data.discount}%` : '-'}</td>
                            <td style={{ textAlign: "center" }}>{data.newPrice ? `Rs ${data.newPrice}` : '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br /><br />
        </div>
    );
}

export default CombinedDetails;
