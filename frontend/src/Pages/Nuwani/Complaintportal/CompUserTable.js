import React from 'react';
import Footer from '../../../Components/Footer';
import '../userTable.css';
import './CompUsertable.css';

const CompUserTable = ({ rows, totalComplaints, selectedUser, deleteComps }) => {

  const handleEditClick = (row) => {
    selectedUser({
      id: row.id,
      uname: row.uname,
      email: row.email,
      category: row.category,
      complaint: row.complaint,
    });
  };

  const handleDeleteClick = (id) => {
    deleteComps({ id });
  };

  return (
    <div>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Category</th>
            <th>Complaint</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.uname}</td>
              <td>{row.email}</td>
              <td>{row.category}</td>
              <td>{row.complaint}</td>
              <td>
                <button style={{ marginRight: '10px', backgroundColor: 'blue', color: 'white' }} onClick={() => handleEditClick(row)} aria-label="Edit">
                  Edit
                </button>
                <button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleDeleteClick(row.id)} aria-label="Delete">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br /><br />
      <Footer />
    </div>
  );
}

export default CompUserTable;
