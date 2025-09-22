import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const VehicleTable = () => {
  const [vehicles, setVehicles] = useState([]);
  const [editData, setEditData] = useState(null);
  const navigate = useNavigate();

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

  const handleDelete = async (email) => {
    try {
      await axios.delete(`http://localhost:8070/deletevehicle`, { data: { Email: email } });
      const updatedVehicles = vehicles.filter(vehicle => vehicle.Email !== email);
      setVehicles(updatedVehicles);
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const handleEditClick = (vehicle) => {
    setEditData(vehicle);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.post('http://localhost:8070/updatevehicle', editData);
      console.log('Response server:', response.data);

      setVehicles(prevVehicles => {
        const updatedVehicles = prevVehicles.map(vehicle => {
          if (vehicle.Email === editData.Email) {
            return editData;
          }
          return vehicle;
        });
        return updatedVehicles;
      });

      setEditData(null);
    } catch (error) {
      console.error('Error updating vehicle:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (editData) {
      handleUpdate(editData);
      setEditData(null);
    }
  };

  return (
    
    <table className="table">
      
      <thead className='tableh'>
        <tr>
          <th>Email</th>
          <th>Vehicle Type</th>
          <th>Vehicle No</th>
          <th>Telephone No</th>
          <th>Work</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map(vehicle => (
          <tr key={vehicle._id}>
            <td>{vehicle.Email}</td>
            <td>{vehicle.Vehicletype}</td>
            <td>{vehicle.VehicleNo}</td>
            <td>{vehicle.Telephoneno}</td>
            <td>{vehicle.work}</td>

            <td>
              <button style={{background:"blue",color:"white",width:"40%"}} onClick={() => handleEditClick(vehicle)}>Edit</button>
              &emsp;<button style={{background:"red",color:"white",width:"40%"}}  onClick={() => handleDelete(vehicle.Email)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
      
      
      {editData && (
        <div className='tableh'>
          
          
          <label htmlFor="Email">Email:</label>
          <input type="Email" id="Email" name="Email" value={editData.Email} onChange={handleChange} />

          <label htmlFor="Vehicletype">Vehicle Type:</label>
          <input type="text" id="Vehicletype" name="Vehicletype" value={editData.Vehicletype} onChange={handleChange} />

          <label htmlFor="VehicleNo">Vehicle Number:</label>
          <input type="text" id="VehicleNo" name="VehicleNo" value={editData.VehicleNo} onChange={handleChange} />

          <label htmlFor="Telephoneno">Telephone Number:</label>
          <input type="text" id="Telephoneno" name="Telephoneno" value={editData.Telephoneno} onChange={handleChange} />

          <label htmlFor="Work">Work:</label>
          <input type="text" id="Work" name="Work" value={editData.work} onChange={handleChange} />

          <button type="button" onClick={handleSubmit}>Save</button>
          
        </div>
        
      )}
    </table>
   
  
    
    
  );
};




export default VehicleTable;
