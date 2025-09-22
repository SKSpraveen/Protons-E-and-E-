import React, { useEffect, useState } from 'react';
import FAQAdmin from "./FAQAdmin";
import Accordion from './Accordion';
import Axios from "axios";
import { Box } from "@mui/material";

const FAQs = () => {
    const [faq, setFaqs] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        getFaqs();
    }, []);

    const getFaqs = () => {
        Axios.get('http://localhost:8070/api/faqs')
             .then(response => {
                setFaqs(response.data?.response || []);
             })
             .catch(error => {
                console.error("Axios Error : ", error);
             });
    }

    const addFaqs = (data) => {
        setSubmitted(true);

        Axios.post('http://localhost:8070/api/createfaqs', data)
        .then(response => {
            setFaqs([...faq, response.data.response]); 
            setSubmitted(false);
            setIsEdit(false);
        })
        .catch(error => {
            console.error("Axios Error : ", error);
        });
    }

    const updateFaqs = (data) => {
      setSubmitted(true);
  
      Axios.post('http://localhost:8070/api/updatefaqs', data)
          .then(response => {
              const updatedFaq = response.data.response;
              if (updatedFaq) {
                  const updatedFaqs = faq.map(f => f._id === updatedFaq._id ? updatedFaq : f);
                  setFaqs(updatedFaqs);
                  setSubmitted(false);
                  setIsEdit(false);
                  setFormData({}); 
              } else {
                  console.error("No updated FAQ data received");
              }
          })
          .catch(error => {
              console.error("Axios Error : ", error);
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

    return (
        <Box>
            <FAQAdmin
                addFaqs={addFaqs}
                updateFaqs={updateFaqs}
                submitted={submitted}
                data={formData}
                isEdit={isEdit}
            />

            <Accordion 
                rows={faq}
                selectedFaqs={(data) => {
                    setIsEdit(true);
                    setFormData(data); 
                }}
                deleteFaqs={deleteFaqs}
            />
        </Box>
    );
}

export default FAQs;
