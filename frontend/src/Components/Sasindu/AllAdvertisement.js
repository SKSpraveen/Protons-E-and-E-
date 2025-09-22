import React, { useEffect, useState } from "react";
import axios from "axios";
import "../StockManager.css";
import { useNavigate } from "react-router-dom";

function AllAdvertisements() {
   
    const [dataList, setDataList] = useState([]);
    const navigate=useNavigate();
    const getFetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8070/Advertisement");
            console.log(response.data);
            if (response.data.success) {
                setDataList(response.data.advertisements);
                alert("Advertisements fetched successfully");
            } else {
                alert("Failed to fetch advertisements");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Failed to fetch advertisements");
        }
    };

    useEffect(() => {
        getFetchData();

    }, []);


    return (
        <div>
            <div style={{ backgroundColor: "black" }}>
                <h1>All Advertisements</h1>
                <br />
            </div>
            <br />
            <div className="gallery">
            {dataList.map((advertisement) =>(
                    <div key={advertisement._id} className="content">
                        <h3>{advertisement.item}</h3>
                        <p>{advertisement.description}</p>
                        <img src={advertisement.photo} alt="CCTV advertisementvertisement" />
                        <p>Discount: {advertisement.discount}</p>
                        <p>Old Price: {advertisement.oldPrice}</p>
                        <p>New Price: {advertisement.price}</p>
                        <p>Availability: {advertisement.availability}</p>
                        <button type="button" onClick={() => navigate(`/view/${advertisement._id}`)} className="btn1"> View</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllAdvertisements;
