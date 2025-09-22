import { Box, MenuItem, Select } from "@mui/material";
import { useState, useEffect } from "react";
import * as React from 'react';
import { deleteEmployee_attendance, addEmployee_attendance, getEmployee_attendance } from "../api/employeeAttendanceApi";
import { addEmployee_final_att,deleteEmployee_final_att } from "../api/addEmployeeInternFinalAttApi";

function Em_table_intern_attendance() {
    const [data, setData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    

    const renderData = (dataToRender) => {
        dataToRender.forEach(row => {
            const formattedRow = {
                name: row.Name,
                nic: row.Nic,
                att: attCount(row.Nic, selectedMonth),
                ot: totalOT(row.Nic, selectedMonth),
                month: getMonthName(parseDate(row.Date).getMonth()), // Assuming getMonthName is a function to convert month number to month name
            }
            addEmployee_final_att(formattedRow);
            console.log('New Data', formattedRow);
        });
    };
    useEffect(() => {
        // Fetch existing data from the database
        getEmployee_attendance()
            .then(existingData => {
                const processedData = processAttendanceData(existingData);
                setData(processedData);
            })
            .catch(error => console.error("Error fetching existing data:", error));

        fetch('https://sheetdb.io/api/v1/0eyrhy1jq0zfn')
            .then(response => response.json())
            .then(newData => {
                console.log("API Response Data:", newData);
                const processedData = processAttendanceData(newData);
                setData(prevData => [...prevData, ...processedData]);
                renderData(data);
                deleteEmployee_attendance();

                // Add each row of data to the database
                processedData.forEach(row => {
                    const formattedRow = {
                        name: row.Name,
                        nic: row.Nic,
                        date: row.Date,
                        onTime: row.Time,
                        offTime: row.offTime,
                        ot: calculateDuration(row.Time, row.offTime) // Assuming calculateDuration returns OT
                    };

                    addEmployee_attendance(formattedRow);
                });
               

               
            })
            .catch(error => console.error("Error fetching new data:", error));
    }, []);


    
      
    const totalOT = (nic, month) => {
        // Filter the data for the given NIC and month
        const filteredData = data.filter(row => row.Nic === nic && parseDate(row.Date).getMonth() === parseMonth(month));
        // Calculate the total OT hours for the NIC and month
        const totalOTHours = filteredData.reduce((sum, row) => sum + calculateDuration(row.Time, row.offTime), 0);
        console.log(totalOTHours);
        return totalOTHours;
    }
    const getMonthName = (monthNumber) => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return months[monthNumber];
    };
    
    const attCount = (nic, month) => {
        // Filter the data for the given NIC and month
        const filteredData = data.filter(row => row.Nic === nic && parseDate(row.Date).getMonth() === parseMonth(month));
        // Get unique dates associated with the NIC and month
        const uniqueDates = new Set(filteredData.map(row => row.Date));
        // Return the count of unique dates
        return uniqueDates.size;
    }
    
    const processAttendanceData = (data) => {
        const internData = data.filter(entry => entry.Type === 'intern');
        const groupedData = new Map();

        internData.forEach(entry => {
            const key = `${entry.Date}_${entry.Name}`;
            if (groupedData.has(key)) {
                groupedData.get(key).offTime = entry.Time;
            } else {
                groupedData.set(key, { ...entry, offTime: null });
            }
        });

        return Array.from(groupedData.values());
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
    }

    const parseMonth = (monthString) => {
        // Add more cases as needed for other months
        switch (monthString) {
            case 'January':
                return 0;
            case 'February':
                return 1;
            case 'March':
                return 2;
            case 'April':
                return 3;
            // Add other months here
            default:
                return -1; // Invalid month
        }
    }

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    }

    return (
        <Box>
            <div>
            <Select value={selectedMonth} onChange={handleMonthChange}>
                    <MenuItem value="January">January</MenuItem>
                    <MenuItem value="February">February</MenuItem>
                    <MenuItem value="March">March</MenuItem>
                    <MenuItem value="April">April</MenuItem>

                    {/* Add more months as needed */}
                </Select>
            </div>
            <div className="rtable-possition">
                
                <table className="rtable-fill">
                    <thead>
                        <tr>
                            <th className="text-left rthTable">NIC</th>
                            <th className="text-left rthTable">Name</th>
                            <th className="text-left rthTable">Attendance</th>
                            <th className="text-left rthTable">OT</th>
                        </tr>
                    </thead>
                    
                    <tbody className="table-hover">
                        {Array.from(new Set(data.map(row => row.Nic))).map((nic, index) => {
                            const nicData = data.find(row => row.Nic === nic);
                            return (
                                <tr key={index}>
                                    <td className="text-left rtdTable">{nic}</td>
                                    <td className="text-left rtdTable">{nicData.Name}</td>
                                    <td className="text-left rtdTable">{attCount(nic, selectedMonth)}</td>
                                    <td className="text-left rtdTable">{totalOT(nic, selectedMonth)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Box>
    );
}

export default Em_table_intern_attendance;
