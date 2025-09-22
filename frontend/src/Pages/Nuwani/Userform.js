import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import './App.css';

const UserForm = ({ addUser, updateUser, submitted, data, isEdit }) => {
  const [service, setService] = useState("Repairing");
  const [fname, setFname] = useState("");
  const [feedback, setFeedback] = useState("");
  const [selectedStarCount, setselectedStarCount] = useState(0);
  const [selectedHoverStarCount, setselectedHoverStarCount] = useState(0);
  const [submitButtonName, setSubmitButtonName] = useState("Submit My Feedback");
  const [feedbackError, setFeedbackError] = useState("");
  const [serviceError, setServiceError] = useState("");
  const [fnameError, setFnameError] = useState("");

  useEffect(() => {
    if (!submitted) {
      setService('');
      setFname('');
      setFeedback('');
      setselectedStarCount(0);
    }
  }, [submitted]);

  useEffect(() => {
    if (data?.id && data.id !== 0) {
      setService(data.service);
      setFname(data.fname);
      setFeedback(data.feedback);
      setselectedStarCount(data.selectedStarCount);
    }
  }, [data]);

  useEffect(() => {
    if (isEdit) {
      setSubmitButtonName("Update My Feedback");
    } else {
      setSubmitButtonName("Submit My Feedback");
    }
  }, [isEdit]);

  const handleServiceChange = (event) => {
    setService(event.target.value);
    setServiceError("");
  };

  const handleFnameChange = (event) => {
    setFname(event.target.value);
    setFnameError("");
  };

  const handleFeedbackChange = (event) => {
    const value = event.target.value;
    if (value.length <= 50) {
      setFeedback(value);
      setFeedbackError("");
    } else {
      setFeedbackError("Feedback cannot exceed 50 characters");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!service) {
      setServiceError("Service type is required");
      return;
    } else {
      setServiceError("");
    }

    if (!fname) {
      setFnameError("Name is required");
      return;
    } else {
      setFnameError("");
    }

    if (!feedback) {
      setFeedbackError("Feedback is required");
      return;
    } else {
      setFeedbackError("");
    }

    if (isEdit) {
      updateUser({
        id: data.id,
        service: service,
        fname: fname,
        feedback: feedback,
        selectedStarCount: selectedStarCount,
      });
    } else {
      addUser({
        id: Date.now(),
        service: service,
        fname: fname,
        feedback: feedback,
        selectedStarCount: selectedStarCount,
      });
    }
    setService("Repairing");
    setFname("");
    setFeedback("");
    setselectedStarCount(0);
  };

  return (
    <div>
      <Header /> 
      <br /><br />
      <div style={{backgroundColor:"rgba(16, 16, 16, 0.926)",height:"56px"}}>
                <h1 style={{fontSize:"35px",padding:"4px"}}>Provide Us Your Feedback</h1>
            </div>
            <br />
      <div className="form-container1">
        <div id="popupsmart-feedback">
          <br />
          <h2 class="h2nuw">We appreciate your feedback!</h2>
          <p class="pnuw">We are always looking for ways to improve your experience. 
            Please take a moment to evaluate and tell us what you think.</p>
          
          <div className='stars'>
            {[...Array(5)].map((_, index) => (
              <span 
                key={index}
                className={`${index + 1 <= selectedStarCount ? 'selected' : ''} ${index + 1 <= selectedHoverStarCount ? 'selected' : ''}`}
                onMouseOver={() => {
                  setselectedHoverStarCount(index + 1);
                }}
                onMouseOut={() => {
                  setselectedHoverStarCount(0);
                }}
                onClick={() => {
                  setselectedStarCount(index + 1);
                }}
              >
                &#9733;
              </span>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <label class="labelnuw" htmlFor="service">Service type</label>
            <select id="service" name="service" value={service} onChange={handleServiceChange}>
              <option value="">Select a service</option>
              <option value="Installation">Installation</option>
              <option value="Repairing">Repairing</option>
            </select>
            {serviceError && <span className="error">{serviceError}</span>}

            <label class="labelnuw" htmlFor="fname">Username:</label>
                        <input type="text" id="fname" name="fname" value={fname} onChange={handleFnameChange}/><br /><br />
                        {fnameError && <span className="error">{fnameError}</span>}
            
            <label class="labelnuw" htmlFor="feedback">Your feedback:</label><br />
            <textarea class="textareafeed" id="feedback" name="feedback" value={feedback} onChange={handleFeedbackChange} placeholder="What can we do to improve your experience." maxLength={50}></textarea><br />
            {feedbackError && <span className="error">{feedbackError}</span>}
            
            <input class="inputfeedback" type="submit" value={submitButtonName} />
          </form>
        </div>
      </div>
      <br></br><br></br><br></br>
      <Footer />
    </div>
  );
}

export default UserForm;
