import React from "react";

const RequestTable = ({ rows }) => {
  return (
    <table className="table">
      <thead>
        <br></br><br></br>
        <tr>
          <th>Email</th>
          <th>Employee Name</th>
          <th>Reason</th>
          <th>Vehicle Type</th>
          <th>Work</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((ShuttleRequest, index) => (
          <tr key={index}>
            <td>{ShuttleRequest.Remail}</td>
            <td>{ShuttleRequest.Employeename}</td>
            <td>{ShuttleRequest.Reason}</td>
            <td>{ShuttleRequest.RvehicleType}</td>
            <td>{ShuttleRequest.Work}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RequestTable;
