import React, { useState } from 'react';
import Header from '../include/_header'; 
import Footer from '../include/_footer'; 
import FAQAdmin from './FAQAdmin';
import Accordion from './Accordion';

const FAQPage = () => {
    const [submittedFAQs, setSubmittedFAQs] = useState([]);

    const addFaq = (question, answer) => {
        setSubmittedFAQs([...submittedFAQs, { question, answer }]);
    };

    const updateFaq = (id, question, answer) => {
       
    };

    return (
        <div>
            <Header /> 
            <FAQAdmin addFaq={addFaq} updateFaq={updateFaq} submittedFAQs={submittedFAQs} />
            {/* Display submitted FAQs in Accordion */}
            {submittedFAQs.map((faq, index) => (
                <Accordion key={index} question={faq.question} answer={faq.answer} />
            ))}
             <Footer />
        </div>
    );
}

export default FAQPage;
