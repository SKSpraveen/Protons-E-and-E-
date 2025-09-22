import React, { useEffect, useState } from "react";
import axios from "axios";


// Modal component for editing vehicle details
const EditVehicleModal = ({ vehicle, onClose, onSave }) => {
    const [formData, setFormData] = useState({ ...vehicle });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email: </label>
                        <input type="email" name="Email" value={formData.Email} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Vehicle Type: </label>
                        <input type="text" name="Vehicletype" value={formData.Vehicletype} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Vehicle No: </label>
                        <input type="text" name="VehicleNo" value={formData.VehicleNo} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Telephone No: </label>
                        <input type="text" name="Telephoneno" value={formData.Telephoneno} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Work: </label>
                        <input type="text" name="Work" value={formData.Work} onChange={handleChange} />
                    </div>
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

const VehicleTable = () => {
  const [rows, setRows] = useState([]);
  const [editingVehicle, setEditingVehicle] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get("http://localhost:8070/vehicle")
      .then(response => {
        setRows(response.data);
      })
      .catch(error => console.error("Error fetching data:", error));
  };

  const handleDelete = (email) => {
    axios.delete('http://localhost:8070/deletevehicle', { data: { Email: email }})
      .then(() => {
        alert("Vehicle deleted successfully");
        fetchData();
      })
      .catch(error => {
        console.error("Failed to delete vehicle:", error);
        alert("Failed to delete vehicle");
      });
  };

  const handleUpdate = (updatedVehicle) => {
    axios.put('http://localhost:8070/updatevehicle', updatedVehicle)
      .then(() => {
        alert("Vehicle updated successfully");
        fetchData();
        setEditingVehicle(null);
      })
      .catch(error => {
        console.error("Failed to update vehicle:", error);
        alert("Failed to update vehicle");
      });
  };

  return (
    <div>
      <table className="table">
        <thead>
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
          {rows.map((vehicle, index) => (
            <tr key={index}>
              <td>{vehicle.Email}</td>
              <td>{vehicle.Vehicletype}</td>
              <td>{vehicle.VehicleNo}</td>
              <td>{vehicle.Telephoneno}</td>
              <td>{vehicle.Work}</td>
              <td>
                <button style={{background:"blue",color:"white",width:"40%"}} onClick={() => setEditingVehicle(vehicle)}>Edit</button>
                &ensp;<button style={{background:"red",color:"white",width:"40%"}} onClick={() => handleDelete(vehicle.Email)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingVehicle && (
        <EditVehicleModal
          vehicle={editingVehicle}
          onClose={() => setEditingVehicle(null)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
};

export default VehicleTable;
