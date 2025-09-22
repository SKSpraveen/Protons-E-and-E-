import { Box, MenuItem, Select } from "@mui/material";
import * as React from "react";
import { useState, useEffect } from "react";
import { getEmployee_attendance } from "../api/employeeAttendanceApi";
import { getEmployee_intern } from "../api/addEmployeeInternDataApi"; 
import {addEmployee_salary, deleteEmployee_salary, getEmployee_salary} from "../api/addEmplloyeeSalaryApi"

const Table_salary = () => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [attendance, setAttendance] = useState([]);
    const [details, setDetails] = useState([]);
    const [commonNic, setCommenNic] = useState([]);
    const [commonData, setCommenData] = useState([]);
    const [commonAtt, setCommenAtt] = useState([]);

    const getData = () => {
        const commonDetails = [];
        
        for (let i = 0; i < details.length; i++) {
            const row = details[i];
            
            for (let j = 0; j < commonNic.length; j++) {
                if (row.nic === commonNic[j]) {
                    commonDetails.push(row);
                    break;
                }
            }
        }
        
        setCommenData(commonDetails);
    };
    
    const getOt = () => {
        const attForOt = [];
        
        for (let i = 0; i < attendance.length; i++) {
            const row = attendance[i];
            
            for (let j = 0; j < commonNic.length; j++) {
                if (row.nic === commonNic[j]) {
                    attForOt.push(row);
                    break;
                }
            }
        }
        
        setCommenAtt(attForOt);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [existingData, rowsData] = await Promise.all([
                    getEmployee_attendance(),
                    getEmployee_intern()
                ]);
                
                setAttendance(existingData);
                setDetails(rowsData);
                
                const commonNics = findCommonNics(rowsData, existingData);
                setCommenNic(commonNics);
                
                getData();
                getOt();
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [getData, getOt]);

   const addDatabase = async () => {
    try {
        const getDetails = await getEmployee_salary();
        const entriesToDelete = {};

        // Iterate over each entry in the database
        for (const entry of getDetails) {
            console.log('Existing entry month:', entry.month);

            // Check if the existing entry month matches the selected month
            if (entry.month === selectedMonth) {
                // Store the NIC and month combination as the key to be deleted
                entriesToDelete[entry.nic + '_' + entry.month] = true;
                console.log(`Marked entry for NIC ${entry.nic} to be deleted for month ${selectedMonth}`);
            }
        }

        // Delete entries for the selected month based on the NICs and months stored
        for (const key of Object.keys(entriesToDelete)) {
            const [nic, month] = key.split('_');
            await deleteEmployee_salary(nic,month);
            console.log(`Deleted entry for NIC ${nic} and month ${month}`);
        }

        // Add new entries for the selected month
        commonData.forEach(row => {
            const newRow = {
                name: row.name,
                nic: row.nic,
                email: row.email,
                salary: calSal(row.nic),
                month: selectedMonth
            };

            console.log('Adding new entry:', newRow);
            addEmployee_salary(newRow);
        });
    } catch (error) {
        console.error("Error fetching or processing employee salary data:", error);
    }
};

    
    
    
    
    
    
    
/*
    const addDatabase = async () => {
        try {
            const getDetails = await getEmployee_salary();
            for(let i = 0; i < getDetails.length; ++i) {
                console.log('get Data', getDetails[i].month);
                if (getDetails[i].month===selectedMonth){
                    deleteEmployee_salary(getDetails[i].nic);
                }
            }
            
            commonData.forEach(row => {
                const newRow = {
                    name: row.name,
                    nic: row.nic,
                    email: row.email,
                    salary: calSal(row.nic),
                    month: selectedMonth
                };
    
                console.log('new Row', newRow);
                addEmployee_salary(newRow);
            });
        } catch (error) {
            console.error("Error fetching employee salary data:", error);
        }
    };
    
    

    const addDatabase = ()=>{
        const getDetails = getEmployee_salary();
        for(let i = 0;i<getDetails.length;++i){
            console.log('get Data', getDetails[i].nic)
        }
        deleteEmployee_salary();
        commonData.forEach(row=>{
            const newRow={
                name:row.name,
                nic:row.nic,
                email:row.email,
                salary:calSal(row.nic),
                month:selectedMonth
            }

            console.log('new Row',newRow);
            addEmployee_salary(newRow);
        });
    };
*/
    const findCommonNics = (rowsData, existingData) => {
        const rowsNics = rowsData.map(row => row.nic);
        const existingNics = existingData.map(data => data.nic);
        return rowsNics.filter(nic => existingNics.includes(nic));
    };

    

    const totalOT = (nic) => {
        const selectedMonthIndex = parseMonth(selectedMonth);
    
        const filteredAttendance = commonAtt.filter(record => {
            const recordMonthIndex = parseDate(record.date).getMonth();
            return record.nic === nic && recordMonthIndex === selectedMonthIndex;
        });
    
        const totalOTHours = filteredAttendance.reduce((total, record) => {
            const overtimeHours = calculateDuration(record.onTime, record.offTime);
            return total + overtimeHours;
        }, 0);
    
        return totalOTHours;
    };

    const calculateDuration = (onTime, offTime) => {
        const onTimeDate = new Date(`01/01/2000 ${onTime}`);
        const offTimeDate = new Date(`01/01/2000 ${offTime}`);
        const workTime = 32400000;
        const durationMs = (offTimeDate - onTimeDate) - workTime;
        const durationHours = durationMs / (1000 * 60 * 60);

        if (durationHours < 1) {
            return 0;
        } else {
            if (durationHours % 1 < 0.45) {
                return Number(durationHours.toFixed(0));
            } else {
                return Math.ceil(durationHours);
            }
        }
    };

    const parseDate = (dateString) => {
        const parts = dateString.split('/');
        const month = parseInt(parts[0], 10);
        const day = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);
        return new Date(year, month - 1, day);
    };

    const parseMonth = (monthString) => {
        switch (monthString) {
            case 'January':
                return 0;
            case 'February':
                return 1;
            case 'March':
                return 2;
            case 'April':
                return 3;
            default:
                return -1;
        }
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const calSal = (nic) => {
        const basicSalary = 15000;
        const overtimeRate = 500;
        const totalOvertimeSalary = totalOT(nic, selectedMonth) * overtimeRate;
        const monthlySalary= basicSalary + totalOvertimeSalary;

        return monthlySalary;
    };


   

    return (
        <Box>
            <div>
                <Select value={selectedMonth} onChange={handleMonthChange}>
                    <MenuItem value="January">January</MenuItem>
                    <MenuItem value="February">February</MenuItem>
                    <MenuItem value="March">March</MenuItem>
                    <MenuItem value="April">April</MenuItem>
                </Select>
                <button onClick={addDatabase}>add</button>
            </div>

            <div className="rtable-possition">
                <table className="rtable-fill">
                    <thead>
                        <tr>
                            <th className="text-left rthTable">Name</th>
                            <th className="text-left rthTable">NIC</th>
                            <th className="text-left rthTable">Email</th>
                            <th className="text-left rthTable">Monthly Salary</th>
                        </tr>
                    </thead>
                    <tbody className="table-hover">
                        {commonData && commonData.length > 0 && commonData.map(row => (
                            <tr key={row.nic}>
                                <td className="text-left rtdTable">{row.name}</td>
                                <td className="text-left rtdTable">{row.nic}</td>
                                <td className="text-left rtdTable">{row.email}</td>
                                <td className="text-left rtdTable">{calSal(row.nic)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Box>
    );
}

export default Table_salary;
