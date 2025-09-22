import React, { useState, useEffect } from 'react';
import Usertableuser from './Usertableuser';
import RatingCal from './RatingCal';
import './userTable.css';
import { Box, Button } from '@mui/material';
import Axios from "axios";
import { jsPDF } from 'jspdf';
import { useNavigate } from "react-router-dom";

function Nonregfeedback() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalCardContainers, setTotalCardContainers] = useState(0);
    const [ratingsCount, setRatingsCount] = useState({});

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        Axios.get('http://localhost:8070/api/users')
             .then(response => {
                const feedData = response.data?.response || [];
                setUsers(feedData);
                setTotalCardContainers(feedData.length);
                calculateRatingsCount(feedData); // Calculate ratings count
                setLoading(false);
             })
             .catch(error => {
                console.error("Axios Error : ", error);
                setLoading(false);
             });
    }

    const calculateRatingsCount = (data) => {
        // Initialize counts
        let count5Star = 0;
        let count4Star = 0;
        let count3Star = 0;
        let count2Star = 0;
        let count1Star = 0;

        // Loop through the data to count ratings
        data.forEach(row => {
            switch (row.selectedStarCount) {
                case 5:
                    count5Star++;
                    break;
                case 4:
                    count4Star++;
                    break;
                case 3:
                    count3Star++;
                    break;
                case 2:
                    count2Star++;
                    break;
                case 1:
                    count1Star++;
                    break;
                default:
                    break;
            }
        });

        // Set the counts in state
        setRatingsCount({
            count5Star,
            count4Star,
            count3Star,
            count2Star,
            count1Star
        });
    }

    // Function to handle generating PDF report
    const generatePDFReport = () => {
        const doc = new jsPDF();

        // Define table content
        const tableContent = [
            ['Star Rating', 'Count'],
            ['5 Star', ratingsCount.count5Star],
            ['4 Star', ratingsCount.count4Star],
            ['3 Star', ratingsCount.count3Star],
            ['2 Star', ratingsCount.count2Star],
            ['1 Star', ratingsCount.count1Star]
        ];

        // Set header
        doc.text('Feedback Summary', 10, 10);

        // Add table
        doc.autoTable({
            startY: 20,
            head: [tableContent[0]],
            body: tableContent.slice(1),
        });

        // Save PDF
        doc.save('feedback_summary.pdf');
    };

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
            <br /> <br /> <br />
            <RatingCal totalCardContainers={totalCardContainers} ratingsCount={ratingsCount} />
            <Button variant="contained" onClick={generatePDFReport} style={{ margin: '20px auto' }}>Generate PDF Report</Button>
            <Usertableuser rows={users} />
        </Box>
    );
}

export default Nonregfeedback;
