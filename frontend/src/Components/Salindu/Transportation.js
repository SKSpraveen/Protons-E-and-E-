import Transportationform from '../../Pages/Salindu/Transportationform';
import VehicleTable from '../../Pages/Salindu/VehicleTable';
import Header from '../../Components/Salindu/Headert';
import Footer from '../../Components/Salindu/Footer';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Vehicles = [
    {
        Email: 'Salindussm@gmail.com',
        Vehicletype: 'bus',
        VehicleNo: 'ABC-2345',
        Telephoneno: '0783460040',
        Work: 'iteam transport',
    },

    {
        Email: 'sandun@123gmail.com',
        Vehicletype: 'Lorry',
        VehicleNo: 'DEF-9654',
        Telephoneno: '0783460060',
        Work: 'employee transtport',
    },
];

console.log('transportation');

const Transportation = () => {
    const [vehicles1, setVehicles] = useState([]);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get('http://localhost:8070/vehicle');
                setVehicles(response.data);
            } catch (error) {
                console.error('Error fetching vehicles:', error);
            }
        };

        fetchVehicles();
    }, []);

    const dataCount = vehicles1.length;

    return (
        <div className='body1'>
            <Header />
            <br/><br/>
            <div className="full">
                    <div className="rflex-container">
      

                        <div  style={{ backgroundColor: "#f77834", padding: "10px", borderRadius: "10px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",height:"200px" ,width:"50%",marginLeft:"25%"}} className="rflex-box">
                            <h1 style={{ fontSize: "30px", marginTop: "10px", marginBottom: "10px", color: "#0f0f0f" ,fontWeight:"bold"}}>Total Available Vehicle Count</h1>
                            <h2 style={{ fontSize: "70px", marginTop: "10px", marginBottom: "10px", color: "#fff", fontWeight: "bold" }}>{dataCount}</h2>
                        </div>

                        

                     </div>
                </div>

      <VehicleTable rows={Vehicles} />
      <br /><br />

        </div>
    );
};

export default Transportation;
