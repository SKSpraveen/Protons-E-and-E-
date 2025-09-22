import React, { useState, useEffect } from 'react';
import Header from '../../../Components/Header';
import CompAdminTable from './CompAdminTable';
import { Box, TextField } from '@mui/material';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function ComplaintAdmin() {
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredComplaints, setFilteredComplaints] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        getComplaints();
    }, []);

    const getComplaints = () => {
        Axios.get('http://localhost:8070/api/complaints')
            .then(response => {
                const feedData = response.data?.response || [];
                setComplaints(feedData);
                setFilteredComplaints(feedData);
                setLoading(false);
            })
            .catch(error => {
                console.error("Axios Error : ", error);
                setLoading(false);
            });
    }

    const handleSearch = (keyword) => {
        setSearchKeyword(keyword);
        const filtered = keyword.trim() !== '' ? complaints.filter(compItem =>
            compItem.id && compItem.id.toString().toLowerCase().includes(keyword.toLowerCase())
        ) : complaints;
        setFilteredComplaints(filtered);
    }
    

    return (
        <Box className="body1" style={{ textAlign: 'center' }}>
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
            <br /> <br />
            <TextField
    label={<span style={{ fontWeight: 'bold' }}>Search by ID</span>}
    variant="outlined"
    value={searchKeyword}
    onChange={(e) => handleSearch(e.target.value)}
    InputProps={{
        style: { textAlign: 'center' } 
    }}
    style={{ margin: '0 auto', marginBottom: '20px', display: 'block', maxWidth: '200px' }}
/>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <CompAdminTable
                rows={filteredComplaints}
                searchKeyword={searchKeyword} // Pass the searchKeyword state
              />
              
            )}
        </Box>
    );
}

export default ComplaintAdmin;
