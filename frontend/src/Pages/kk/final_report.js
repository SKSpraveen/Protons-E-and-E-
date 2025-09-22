import { Box } from "@mui/material";
import React,{useState} from "react";
import NavHead from "../../Components/kk/Components/navHead";
import Table_report_intern from "../../Components/kk/Components/table_report_intern";
import Table_report_permanent from "../../Components/kk/Components/table_report_permanent";
import Table_report_full from "../../Components/kk/Components/table_report_full";


const Final_report=({}) =>{
    
        
    const [activeButton, setActiveButton] = useState("Intern"); 

    // Function to handle button click
    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };


    const renderTableComponent = () => {
        switch (activeButton) {
            case "Intern":
                return <Table_report_intern />;
            case "Permanent":
                return <Table_report_permanent />;
            case "Full":
                return <Table_report_full />;
           
            
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

                <button
                    type="button"
                    className={`btn btn-primary ${activeButton === "Full" && "active"}`}
                    onClick={() => handleButtonClick("Full")}
                >
                    Full Report
                </button>
               
            </div>
            {renderTableComponent()}
        </Box>
    )
    
    
    
}

export default Final_report;