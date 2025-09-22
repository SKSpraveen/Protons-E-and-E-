import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { useAuthContext } from "../../hooks/useAuthContext";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function AdminPanel() {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [users, setUsers] = useState([]);
    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        if (user) {
            Axios.get(`http://localhost:8070/api/auth/profile`, {
                headers: {
                    "Authorization": `Bearer ${user.token}`,
                },
            })
            .then((res) => {
                setUsers(res.data);
                setDataList(res.data);
            })
            .catch(error => console.error('Error fetching user data:', error));
        }
    }, [user]);

    const handleDelete = async (email) => {
        try {
            await Axios.delete(
                `http://localhost:8070/api/auth/delete/${email}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            // Remove the deleted user from the dataList
            setDataList(dataList.filter(u => u.email !== email));
            alert("User deleted successfully.");
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user. Please try again.");
        }
    };
    
    const generatePDF = () => {
        const doc = new jsPDF();
        const tableData = dataList.map(user => [user.name, user.email, user.address, user.phoneNumber]);
        const headers = [['Name', 'Email', 'Address', 'Contact Number']];
    
        doc.autoTable({
            head: headers,
            body: tableData,
        });
    
        doc.save('users.pdf');
    };
    

    const handleSearchArea = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        if (searchQuery === "") {
            setDataList(users);
        } else {
            const filteredUsers = users.filter(user => {
                return (
                    user.name.toLowerCase().includes(searchQuery) ||
                    user.email.toLowerCase().includes(searchQuery) ||
                    (user.address && user.address.toLowerCase().includes(searchQuery)) || // Check if address exists
                    (user.phoneNumber && user.phoneNumber.includes(searchQuery)) // Check if phoneNumber exists
                );
            });
            setDataList(filteredUsers);
        }
    };

    return (
        <div className="body1" style={{ minHeight: '100vh' }}>
            <div className="header">
                <br /><br />
                <h2>Welcome Admin Dashboard !</h2>
                <br /><br />
                <nav>
                    <div className="nav nav-tabs" style={{width:"100%"}} id="nav-tab" role="tablist">
                        <b> <h4 style={{color:"#000000e2"}}>&emsp;<u>Protons <span style={{color:"hwb(0 100% 0%)"}}>E&E</span></u></h4></b>
                        &emsp;&emsp;
                        <button className="nav-link" onClick={()=> navigate('/Admin')} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true"><i class="fa fa-home" aria-hidden="true"></i>&emsp;Dashboard</button>
                        <button className="nav-link" onClick={()=> navigate('/userDetails')} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true"><i class="fa fa-users" aria-hidden="true"></i>&emsp;Users</button>
                        <button className="nav-link" onClick={()=> navigate('/manager')} id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false"><i class="fa fa-users" aria-hidden="true"></i>&emsp;Managers</button>
                        <button className="nav-link" onClick={()=> navigate('/nonregfeed')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-comments" aria-hidden="true"></i>&emsp;Feedback</button>
                        <button className="nav-link" onClick={()=> navigate('/compadmin')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-book" aria-hidden="true"></i>&emsp;Complaint</button>
                        <button className="nav-link" onClick={()=> navigate('/support')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-book" aria-hidden="true"></i>&emsp;Support</button>
                        <button className="nav-link" onClick={()=> navigate('/faqadmin')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-book" aria-hidden="true"></i>&emsp;FAQ</button>
                        &emsp;<button className="nav-link" onClick={()=> navigate('/Admin')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</button>
                    </div>
                </nav>
            </div>
            <div className="row" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className="col-lg-9 mt-2 mb-2">
                    <input
                        className="form-control-search"
                        type="search"
                        placeholder="Search users"
                        onChange={handleSearchArea}
                        style={{width:"300px",marginLeft:"150px" ,marginTop:"20px"}}
                    />
                </div>
                <div className="col-lg-3 mt-2 mb-2" style={{ textAlign: 'center' }}>
    <p style={{
        marginTop:"40px",
        border: 'none',
        color: 'black',
        padding: '10px 15px',
        textDecoration: 'none',
        fontSize: '16px',
        borderRadius: '10px',
        cursor: 'pointer',
        width:"200px",
        fontWeight:"bold"
    }}>
        Available Users: {dataList.length}
    </p>
</div>

               
            </div>
            <br />
            <table id="user-table" className="ads-table table table-hover">
                <thead>
                    <tr style={{ textAlign: "center" }}>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {dataList.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td>{user.phoneNumber}</td>
                            <td>
                                <button 
                                    onClick={() => handleDelete(user.email)} // Pass user email to handleDelete function
                                    className="delete-btn" 
                                    style={{
                                        background: "red",
                                        borderRadius: "50px",
                                        width: "90px",
                                        marginLeft: "40px",
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="col-lg-3 mt-2 mb-2">
                    <button onClick={generatePDF} style={{ height: "50px", width: "200px", background: "green", marginTop: "20px", textAlign: "center",  marginLeft:"315%" }} className="btn btn-primary">Generate PDF</button>
                </div>
            <br /><br />
        </div>
    );
}

export default AdminPanel;
