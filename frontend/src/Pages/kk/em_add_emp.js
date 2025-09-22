import * as React from "react";
import '../../Components/kk/css/navigation2.css';
import Em_add_empIntern_form from "../../Components/kk/Components/em_add_empIntern_form";
import Em_add_empPermanent_form from "../../Components/kk/Components/em_add_empPermanent_form";
import { addEmployee_intern } from '../../Components/kk/api/addEmployeeInternDataApi';
import { addEmployee_permanent } from "../../Components/kk/api/addEmployeePermanentDataApi";
import { useNavigate } from 'react-router-dom';

import { Box, Button } from "@mui/material";

function useEmployeeInternNavigation() {
    const navigate = useNavigate();

    const handleEmpIntern = (data) => {
        addEmployee_intern(data)
            .then(() => {
                navigate('/empTable');
            })
            .catch(error => {
                console.error("Axios error:", error);
            });
    };

    return {handleEmpIntern};
};

function useEmployeePermanentNavigation() {
    const navigate = useNavigate();

   
    const handleEmpPermanent = (data) => {
        addEmployee_permanent(data)
            .then(() => {
                navigate('/empTable');
            })
            .catch(error => {
                console.error("Axios error:", error);
            });
    };

    return {handleEmpPermanent};
};


function Em_add_emp() {
    const handleEmpIntern = useEmployeeInternNavigation();
    const handleEmpPermanent = useEmployeePermanentNavigation();
    const [formType, setFormType] = React.useState('Intern');
    const [activeButton,setActiveButton] = React.useState('Intern');


    const handleFormTypeChange = (type) => {
        setFormType(type);
        setActiveButton(type)
    };

    return (
        <Box className="body1">
            <br/>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button
                    type="button"
                    className={`btn btn-primary ${activeButton === 'Intern' ? 'active' : ''}`} // Apply active class based on activeButton state
                    onClick={() => handleFormTypeChange('Intern')}
                >
                    Intern
                </button>
                
                <button
                    type="button"
                    className={`btn btn-primary ${activeButton === 'Permanent' ? 'active' : ''}`}                    
                    onClick={() => handleFormTypeChange('Permanent')}
                >
                    Permanent
                </button>
            </div>

            <div>
                {formType === 'Intern' ? (
                    <Em_add_empIntern_form 
                        formType="Intern"
                        addEmployee_intern={handleEmpIntern}
                    />
                ) : null}

                {formType === 'Permanent' ? (
                    <Em_add_empPermanent_form 
                        formType="Permanent"
                        addEmployee_permanent={handleEmpPermanent}
                    />
                ) : null}
            </div>
        </Box>
    );
}

export default Em_add_emp;
