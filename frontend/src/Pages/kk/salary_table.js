import React, { useState,useEffect } from "react"; // Import useState from React
import { Box } from "@mui/material";
import NavHead from "../../Components/kk/Components/navHead";
import '../../Components/kk/css/navigation2.css'
import Table_salary_intern from "../../Components/kk/Components/table_salary_intern";
import Table_salary_permanent from "../../Components/kk/Components/table_salary_permanent";
import { getEmployee_intern } from "../../Components/kk/api/addEmployeeInternDataApi";
import { getEmployee_salary } from "../../Components/kk/api/addEmplloyeeSalaryApi";



const Salary_table=({}) =>{
    console.log('start sal table')
    const [activeButton, setActiveButton] = useState("Intern"); // State to track active button
    const [employee_table, setEmployeeTable] = useState([]);
    const [employee_salary, setSalaryTable] = useState([]);

    useEffect(() => {
        fetchDataIntern();
        fetchSalaryIntern();
    }, []);

    const fetchDataIntern = () => {
        getEmployee_intern()
            .then(data => {
                setEmployeeTable(data);
            })
            .catch(error => {
                console.error("Error fetching intern data:", error);
            });
    };

    const fetchSalaryIntern =() =>{
        getEmployee_intern()
            .then(data3 => {
                setSalaryTable(data3);
            })
            .catch(error => {
                console.error("Error fetching intern data:", error);
            });
    };

    

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName); // Set the active button
    };

    

    const renderTableComponent = () => {
        switch (activeButton) {
            case "Intern":
                return <Table_salary_intern rows={employee_salary} />;
            case "Permanent":
                return <Table_salary_permanent />;
            
        }
    };

    return (
        <Box className='body1'>
            <NavHead />
            <br/>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button
                    type="button"
                    className={`btn btn-primary ${activeButton === "Intern" && "active"}`}
                    onClick={() => handleButtonClick("Intern")}
                >
                    Intern
                </button>
                <button
                    type="button"
                    className={`btn btn-primary ${activeButton === "Permanent" && "active"}`}
                    onClick={() => handleButtonClick("Permanent")}
                >
                    Permanent
                </button>
               
            </div>
            {renderTableComponent()}
        </Box>
    );
}

export default Salary_table;