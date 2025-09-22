import React, { useEffect, useState } from 'react';
import { Box } from "@mui/material";
import CompUserForm from "./CompUserForm";
import CompUserTable from "./CompUserTable";
import Axios from "axios";

const CompUser = () => {
    const [complaints, setComplaints] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [isEdit, setIsEdit] = useState(false);
   

    useEffect(() => {
        getComps();
    }, []);

    const getComps = () => {
        Axios.get('http://localhost:8070/api/complaints')
             .then(response => {
                setComplaints(response.data?.response || []);
             })
             .catch(error => {
                console.error("Axios Error : ", error);
             });
    }

    const addComps = (data) => {
        setSubmitted(true);
    
        const payload = {
            id: data.id,
            uname: data.uname,
            email: data.email,
            category: data.category,
            complaint: data.complaint,
        };
    
        Axios.post('http://localhost:8070/api/createcomps', payload)
        .then(() => {
            getComps();
            setSubmitted(false);
            setIsEdit(false); 
         })
         .catch(error => {
            console.error("Axios Error : ", error);
         });
    }
    
    const updateComps = (data) => {
        setSubmitted(true);
    
        const payload = {
            id: data.id, 
            uname: data.uname,
            email: data.email,
            category: data.category,
            complaint: data.complaint,
        };
    
        Axios.post('http://localhost:8070/api/updatecomps', payload)
        .then(() => {
            getComps();
            setSubmitted(false);
            setIsEdit(false); 
         })
         .catch(error => {
            console.error("Axios Error : ", error);
         });
    }
    

    const deleteComps = (id) => {
        Axios.post('http://localhost:8070/api/deletecomps', id)
        .then(() => {
            getComps();
        })
        .catch(error => {
            console.error("Axios Error : ", error);
        });
    }
    
    
    return(
        <Box>
            <CompUserForm 
               addComps={addComps}
               updateComps={updateComps}
               submitted={submitted}
               data={selectedUser}
               isEdit={isEdit}
            />
            <br />
            <CompUserTable 
            rows={complaints}
            selectedUser={data => {
                setSelectedUser(data)
                setIsEdit(true);
            }}
            
            deleteComps={data => window.confirm('Are sure you want to delete your complaint?') && deleteComps(data)}
          />
        </Box>
        
    );

}

export default CompUser;