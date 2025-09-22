import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../StockManager.css";
import { useNavigate } from "react-router-dom";

function Alarms_MotionDetectorAdvertisements() {
    const [alarm_motionAdvertisements, setAlarm_MotionAdvertisements] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8070/Advertisement")
            .then((response) => {
                if (response.data.success) {
                    const filteredAds = response.data.advertisements.filter(ad => ad.type === "Alarms & Motion Detectors");
                    setAlarm_MotionAdvertisements(filteredAds);
                } else {
                    console.error("Failed to fetch advertisements");
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching advertisements:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {

        return <div>Loading...</div>;
    }

    return (
        <div>
            <br />
            <div style={{backgroundColor:"rgba(16, 16, 16, 0.926)",height:"56px"}}>
                <h1 style={{fontSize:"35px",padding:"4px"}}>Alarms & Motion Detectors</h1>
            </div>
            <br />
            <div className="gallery">
                {alarm_motionAdvertisements.map((ad) => (
                    
                    <div key={ad._id} className="content">
                         {ad.discount > 0 && (
                            <div style={{background:"rgb(236, 67, 0)",width:"35%",borderTopLeftRadius:"20px",height:"36px"}}>
                                <p style={{fontSize:"20px",color:"white",fontWeight:"600"}}>Off : {ad.discount}</p>
                            </div>
                        )}
                         <img className="card-img" src={ad.photo} alt="CCTV Advertisement" />
                         <br />
                        <h3 style={{marginTop:"20px"}}>{ad.item}</h3>
                        <br />
                        <p style={{fontSize:"20px",fontWeight:"700"}}>
                            {ad.discount > 0 && <s>{`Rs: ${ad.price}`}</s>}
                            &ensp; &ensp;Rs: {ad.price - (ad.price * ad.discount / 100)}
                        </p>
                        <p  style={{color:"#000000e2",fontWeight:"bold",margin:"auto",fontSize:"20px",background:"rgb(245, 77, 10)",width:"40%",borderRadius:"15px 0 15px 0"}}>{ad.availability}</p>
                        <br />
                        <button type="button" onClick={() => navigate(`/view/${ad._id}`)} className="btn1"> View</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Alarms_MotionDetectorAdvertisements;
