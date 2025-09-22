import React, { useState } from 'react';
import "./accordian.css";
import Footer from '../../../Components/Footer'; 
import pencilImage from '../../../Images/pencil.png';
import deleteImage from '../../../Images/delete.png';
import Axios from 'axios';

const Accordion = ({ rows, selectedFaqs, deleteFaqs}) => {
    const [visibleIndex, setVisibleIndex] = useState(null);

    const toggleAccordion = (index) => {
        setVisibleIndex(index === visibleIndex ? null : index);
    };

    const handleEditClick = (row) => {
        selectedFaqs(row); 
    };

    const handleDeleteClick = (id) => {
        if (window.confirm('Are you sure you want to delete this FAQ?')) {
            Axios.post('http://localhost:8070/api/deletefaqs', { id })
                .then(() => {
                    deleteFaqs(id);
                })
                .catch(error => {
                    console.error("Axios Error : ", error);
                });
        }
    };

    return (
        <div>
            <div>
            <div className="accordion">
                {rows.map((row, index) => (
                    <div className="cardnuw" key={index}>
                        <div className="itemnuw" onClick={() => toggleAccordion(index)}>
                            <p className="textnuw">{row.faqquestion}</p>
                           
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className={`icon ${visibleIndex === index ? "rotate" : ""}`}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>
                        {visibleIndex === index && (
                            <div className="hidden-box active-box">
                                <p>{row.faqanswer}</p>
                            </div>
                        )}
                        <div className="cardnuw-icons">
                            <button className="icon-link" onClick={() => handleEditClick(row)} aria-label="Edit">
                                <img className="pencil-icon" src={pencilImage} alt="Edit" />
                            </button>
                            <button className="icon-link" onClick={() => handleDeleteClick(row._id)} aria-label="Delete">
                                <img className="bin-icon" src={deleteImage} alt="Delete" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
          
            </div>
           
        </div>
       
    );
    
};

export default Accordion;
