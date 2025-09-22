import React, { useState, useEffect } from 'react';
//import Footer from '../../../Components/Footer';
import '../userTable.css';
import './CompUsertable.css';
import Button from '@mui/material/Button';
import { jsPDF } from "jspdf";
import "jspdf-autotable";



const CompAdminTable = ({ rows, selectedUser, deleteComps, searchKeyword }) => {
 
  const [rowData, setRowData] = useState(rows);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const completed = rowData.filter(row => row.status === 'completed').length;
    setCompletedCount(completed);
    localStorage.setItem('completedCount', completed);
  }, [rowData]);

  useEffect(() => {
    const storedCompletedCount = localStorage.getItem('completedCount');
    if (storedCompletedCount) {
      setCompletedCount(parseInt(storedCompletedCount, 10));
    }
  }, []);

  useEffect(() => {
    const storedRowData = JSON.parse(localStorage.getItem('rowData'));
    if (storedRowData) {
      setRowData(storedRowData);
    }
  }, []);

  useEffect(() => {
    const filteredRows = rows.filter(row => String(row.id).toLowerCase().includes(searchKeyword.toLowerCase()));
    setRowData(filteredRows);
  }, [searchKeyword, rows]);

  const updateStatus = (id, newStatus) => {
    const updatedRows = rowData.map(row => {
      if (row.id === id) {
        return { ...row, status: newStatus };
      }
      return row;
    });
    localStorage.setItem('rowData', JSON.stringify(updatedRows));
    setRowData(updatedRows);
  };

  const handleGenerateReport = () => {
    const doc = new jsPDF();

    // Set header
    doc.setFontSize(18);
    doc.text("Complaints Summary", 10, 10);

    // Create the table with user data
    doc.autoTable({
      head: [['ID', 'Username', 'Email', 'Status', 'Category']],
      body: rowData.map(row => [row.id, row.uname, row.email, row.status, row.category]),
    });

    // Save the PDF
    doc.save('complaints_summary.pdf');
  };

  return (
    <div>
      <div className="total-complaints-container">
        <div className="total-complaints-box1">
          <h5>Total Complaints: {rows.length}</h5>
        </div>
        <div className="total-complaints-box3">
          <h5>Completed Complaints: {completedCount}</h5>
        </div>
        <div className="total-complaints-box4">
          <Button variant="contained" onClick={handleGenerateReport}>Generate report</Button>
        </div>
      </div>
      <br />

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Category</th>
            <th>View Complaint</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {rowData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.uname}</td>
              <td>{row.email}</td>
              <td>
                <select
                  value={row.status}
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    updateStatus(row.id, newStatus);
                  }}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </td>
              <td>{row.category}</td>
              <td>
                <button type="button" onClick={() => selectedUser(row.complaint)}>View Complaint</button>
              </td>
              <td><button type="button" onClick={() => updateStatus(row.id, 'remarked')} name="remarks">Remarks</button></td>
            </tr>
          ))}
        </tbody>
      </table>
     <br /> <br /> <br />
    </div>
  );
}

export default CompAdminTable;
