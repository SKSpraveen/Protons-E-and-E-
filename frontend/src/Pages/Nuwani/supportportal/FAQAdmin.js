import React, { useState, useEffect } from 'react';
import Header from '../../../Components/Header'; 
//import Footer from '../include/_footer'; 
import './adminfaq.css';
import { useNavigate } from "react-router-dom";

const FAQAdmin = ({ addFaqs, updateFaqs, submitted, data, isEdit }) => {
    const navigate = useNavigate();
    const [faqquestion, setFaqQuestion] = useState("");
    const [faqanswer, setFaqAnswer] = useState("");
    const [submitButtonNamefaq, setSubmitButtonNamefaq] = useState("Submit My FAQ");
    const [faqQuestionError, setFaqQuestionError] = useState("");
    const [faqAnswerError, setFaqAnswerError] = useState("");
    
    useEffect(() => {
        if (!submitted) {
            setFaqQuestion('');
            setFaqAnswer('');
        }
    }, [submitted]);
  
    useEffect(() => {
        if (isEdit) {
            setSubmitButtonNamefaq("Update My FAQ");
            setFaqQuestion(data.faqquestion);
            setFaqAnswer(data.faqanswer);
        } else {
            setSubmitButtonNamefaq("Submit My FAQ");
        }
    }, [isEdit, data]);

    const handleFaqQChange = (event) => {
        const value = event.target.value;
        setFaqQuestion(value);
        if (value.trim() === "") {
            setFaqQuestionError("Question is required");
        } else {
            setFaqQuestionError("");
        }
    };
  
    const handleFaqAChange = (event) => {
        const value = event.target.value;
        setFaqAnswer(value);
        if (value.trim() === "") {
            setFaqAnswerError("Answer is required");
        } else {
            setFaqAnswerError("");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!faqquestion.trim()) {
            setFaqQuestionError("Question is required");
            return;
        } else {
            setFaqQuestionError("");
        }

        if (!faqanswer.trim()) {
            setFaqAnswerError("Answer is required");
            return;
        } else {
            setFaqAnswerError("");
        }

        if (isEdit) {
            updateFaqs({
                id: data._id,
                faqquestion,
                faqanswer,
            });
        } else {
            addFaqs({
                id: data._id,
                faqquestion,
                faqanswer,
            });
        }
        setFaqQuestion("");
        setFaqAnswer("");
    };

    return (
        <div className='body1'>
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
            <div className="form-container1">
                <div id="popupsmart-feedback">
                    <form onSubmit={handleSubmit}>
                        <label class="labelnuw" htmlFor="faqquestion">Question:</label><br />
                        <textarea id="faqquestion" name="faqquestion" value={faqquestion} onChange={handleFaqQChange} placeholder="Your question"></textarea>
                        {faqQuestionError && <span className="error">{faqQuestionError}</span>}<br />
      
                        <label class="labelnuw" htmlFor="faqanswer">Answer:</label><br />
                        <textarea id="faqanswer" name="faqanswer" value={faqanswer} onChange={handleFaqAChange} placeholder="Your answer"></textarea>
                        {faqAnswerError && <span className="error">{faqAnswerError}</span>}<br />
                
                        <input class="inputfeedback" type="submit" value={submitButtonNamefaq} />
                    </form>
                </div>
            </div>
            <br></br><br></br><br></br>
        </div>
    );
}

export default FAQAdmin;
