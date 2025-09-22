import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import NavHead from "../../Components/kk/Components/navHead";
import Table_employee_intern from "../../Components/kk/Components/table_empolee_intern";
import '../../Components/kk/css/navigation2.css'
import { useNavigate } from "react-router-dom";
import Em_table_intern_attendance from "../../Components/kk/Components/em_table_intern_attendance";
import Table_employee_permanent from "../../Components/kk/Components/table_employee_permanent";
import Em_table_permanent_attendance from "../../Components/kk/Components/em_table_permanent_attandance";
import { getEmployee_intern } from "../../Components/kk/api/addEmployeeInternDataApi";
import { getEmployee_permanent } from "../../Components/kk/api/addEmployeePermanentDataApi";




const EmployeeTable = () => {
    const Navigate = useNavigate();

    const [employee_table, setEmployeeTable] = useState([]);
    const [employee_table2, setEmployeeTable2] = useState([]);

   

   //Intern data retrieve from data base
    const fetchDataIntern = () => {
        getEmployee_intern().then(data => {
            setEmployeeTable(data);
        }).catch(error => {
            console.error("Error fetching intern data:", error);
        });
    };


    //Permanent data retrieve from data base
    const fetchDataPermanent = () => {
        getEmployee_permanent().then(data => {
            setEmployeeTable2(data);
        }).catch(error => {
            console.error("Error fetching intern data:", error);
        });
    };

  
   
    useEffect(() => {
        getEmployee_intern().then(data => {
            setEmployeeTable(data);
        });
    }, []);

    const addEmployee = () => {
        Navigate('/addEmp');
    };

    useEffect(() => {
        getEmployee_permanent().then(data => {
            setEmployeeTable2(data);
        });
    }, []);

    
    
    

    const [activeButton, setActiveButton] = useState("Intern");
    const [activeButton2, setActiveButton2] = useState("InternAtt");

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    const handleButtonClick2 = (buttonName) => {
        setActiveButton2(buttonName);
    };
    

    //Employee attendance tables

    const renderAttendanceTable = () => {
        switch (activeButton2) {
            case "InternAtt":
                return <Em_table_intern_attendance />;
            case "PermanentAtt":
                return <Em_table_permanent_attendance />;
            default:
                return null;
        }
    };


//Inside the attendance
    const renderTableComponent = () => {
        switch (activeButton) {
            case "Intern":
                return <Table_employee_intern rows={employee_table} fetchData={fetchDataIntern}/>;
            case "Permanent":
                return <Table_employee_permanent rows2={employee_table2} fetchData={fetchDataPermanent}/>;

            case "Attendance":
                return (
                    <Box>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button
                                type="button"
                                className={`btn btn-primary ${activeButton2 === "InternAtt" && "active"}`}
                                onClick={() => handleButtonClick2("InternAtt")}
                            >
                                Intern
                            </button>
                            <button
                                type="button"
                                className={`btn btn-primary ${activeButton2 === "PermanentAtt" && "active"}`}
                                onClick={() => handleButtonClick2("PermanentAtt")}
                            >
                                Permanent
                            </button>
                        </div>
                        {renderAttendanceTable()}
                    </Box>
                );
            default:
                return null;
        }
    };


    //main nav (intern, permanent, Attendance)
    return (
        <Box className='body1'>
            <NavHead />
            <br/>
            <div className="button_cont">
                <button type="button" className="button-42" onClick={addEmployee}>ADD New Employee</button>
            </div>
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
                <button
                    type="button"
                    className={`btn btn-primary ${activeButton === "Attendance" && "active"}`}
                    onClick={() => handleButtonClick("Attendance")}
                >
                    Attendance
                </button>
            </div>
            {renderTableComponent()}
        </Box>
    );
};

export default EmployeeTable;
