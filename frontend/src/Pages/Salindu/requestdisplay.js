import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const RequestTable = () => {
  const [ShuttleRequest, setShuttleRequest] = useState([]);
  const [editData, setEditData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8070/ShuttleRequest');
        setShuttleRequest(response.data);
      } catch (error) {
        console.error('Error fetching ShuttleRequest:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleDelete = async (Remail) => {
    try {
      await axios.delete(`http://localhost:8070/deleteShuttleRequest`, { data: { Remail: Remail } });
      const updatedShuttleRequest = ShuttleRequest.filter(ShuttleRequest => ShuttleRequest.Remail !== Remail);
      setShuttleRequest(updatedShuttleRequest);
    } catch (error) {
      console.error('Error deleting ShuttleRequest:', error);
    }
  };

  const handleEditClick = (ShuttleRequest) => {
    setEditData(ShuttleRequest);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.post('http://localhost:8070/updatShuttleRequest', editData);
      console.log('Response server:', response.data);

      setShuttleRequest(prevShuttleRequest => {
        const updatedShuttleRequest = prevShuttleRequest.map(ShuttleRequest => {
          if (ShuttleRequest.Remail === editData.Remail) {
            return editData;
          }
          return ShuttleRequest;
        });
        return updatedShuttleRequest;
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
      <br></br>
      <br></br>
        <tr>
          <th>Email</th>
          <th>Employeename</th>
          <th>Reason</th>
          <th>Vehicle Type</th>
          <th>Work</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {ShuttleRequest.map(ShuttleRequest => (
          <tr key={ShuttleRequest._id}>
            <td>{ShuttleRequest.Remail}</td>
            <td>{ShuttleRequest.Employeename}</td>
            <td>{ShuttleRequest.Reason}</td>
            <td>{ShuttleRequest.RvehicleType}</td>
            <td>{ShuttleRequest.Work}</td>

            <td>
              <button onClick={() => handleEditClick(ShuttleRequest)}>Edit</button>
              <button onClick={() => handleDelete(ShuttleRequest.Remail)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
      
      
      {editData && (
        <div className='tableh'>
          
          
          <label htmlFor="Email">Email:</label>
          <input type="Email" id="Email" name="Email" value={editData.Remail} onChange={handleChange} />

          <label htmlFor="Employeename">Employee Name:</label>
          <input type="text" id="Employeename" name="Employeename" value={editData.Employeename} onChange={handleChange} />

          <label htmlFor="Reason">Vehicle Number:</label>
          <input type="text" id="Reason" name="Reason" value={editData.Reason} onChange={handleChange} />

          <label htmlFor="RvehicleType">Vehicle Type:</label>
          <input type="text" id="RvehicleType" name="RvehicleType" value={editData.RvehicleType} onChange={handleChange} />

          <label htmlFor="Work">Work:</label>
          <input type="text" id="Work" name="Work" value={editData.Work} onChange={handleChange} />

          <button type="button" onClick={handleSubmit}>Save</button>
          
        </div>
        
      )}
    </table>
   
  
    
    
  );
};




export default RequestTable;
