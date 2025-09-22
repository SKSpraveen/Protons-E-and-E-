import React, { useState } from 'react';
import "./accordian.css";
import Footer from '../../../Components/Footer'; 


const Accordionuser = ({ rows, selectedFaqs, deleteFaqs }) => {
    const [visibleIndex, setVisibleIndex] = useState(null);

    const toggleAccordion = (index) => {
        setVisibleIndex(index === visibleIndex ? null : index);
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
                     
                    </div>
                ))}
            </div>
            
          
            </div>
            <Footer />
        </div>
       
    );
    
};

export default Accordionuser;
