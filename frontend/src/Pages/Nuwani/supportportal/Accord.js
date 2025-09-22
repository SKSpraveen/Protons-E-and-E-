import React, { useState, useEffect } from 'react';
import Header from '../../../Components/Header';
import Accordionuser from './Accordionuser';
import "./accordian.css";
import SupportEngine from '../SupportEngine';
import { Box, TextField } from '@mui/material';
import Axios from "axios";

function Accord() {
    const [faq, setFaqs] = useState([]);
    const [filteredFaqs, setFilteredFaqs] = useState([]); 
    const [searchKeyword, setSearchKeyword] = useState('');
    const [loading, setLoading] = useState(true); 
   
    useEffect(() => {
        getFaqs();
    }, []);

    const getFaqs = () => {
        Axios.get('http://localhost:8070/api/faqs')
             .then(response => {
                const faqData = response.data?.response || [];
                setFaqs(faqData);
                setFilteredFaqs(faqData); 
                setLoading(false); 
             })
             .catch(error => {
                console.error("Axios Error : ", error);
                setLoading(false); 
             });
    }

    const deleteFaqs = (id) => {
        Axios.post('http://localhost:8070/api/deletefaqs', { id })
        .then(() => {
            getFaqs();
        })
        .catch(error => {
            console.error("Axios Error : ", error);
        });
    }

    const handleSearch = (keyword) => {
        setSearchKeyword(keyword); 
       
        const filtered = keyword.trim() !== '' ? faq.filter(faqItem => 
            faqItem.faqquestion && faqItem.faqquestion.toLowerCase().includes(keyword.toLowerCase())
        ) : faq;
        setFilteredFaqs(filtered); 
    }

    return (
        <Box>
            <Header />
            <TextField
    label={<span style={{ fontWeight: 'bold' }}>Search</span>}
    variant="outlined"
    value={searchKeyword}
    onChange={(e) => handleSearch(e.target.value)}
    style={{ margin: '0 auto', marginBottom: '20px', display: 'block', maxWidth: '300px' }}
    InputProps={{
        style: {
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            borderWidth: '10px',
            borderColor: 'black',
        },
    }}
/>


            {loading ? (
                <div>Loading...</div>
            ) : (
                <Accordionuser 
                    rows={filteredFaqs} 
                    deleteFaqs={deleteFaqs}
                />
            )}
            <SupportEngine />
        </Box>
    );
}

export default Accord;
