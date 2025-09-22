import { Box } from "@mui/material";
import { useState, useEffect } from "react";


function Em_table_permanent_attendance () {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://sheetdb.io/api/v1/0hsfvo5wqhfw9')
            .then((response) => response.json())
            .then(data => {
                console.log("API Response Data:", data);
                const processedData = processAttendanceData(data);
                setData(processedData);
            })
            .catch(error => console.error("Error fetching data:", error));
    },[]);

    const processAttendanceData = (data) => {
        // Create a map to group entries by date and name
        const internData = data.filter(entry => entry.Type === 'permanent');
        
        const groupedData = new Map();
        console.log(data.type);
        

        internData.forEach(entry => {
            const key = `${entry.Date}_${entry.Name}`;
            if (groupedData.has(key)) {
                // If there's already an entry for the same date and name, add this as the "Off Time"
                groupedData.get(key).offTime = entry.Time;
            } else {
                // If it's the first entry for the date and name, add it to the map
                groupedData.set(key, { ...entry, offTime: null });
            }
        });
    
        // Convert map values back to array
        return Array.from(groupedData.values());
    };


    const calculateDuration = (onTime, offTime) => {
        const onTimeDate = new Date(`01/01/2000 ${onTime}`);
        const offTimeDate = new Date(`01/01/2000 ${offTime}`);
        const workTime = (32400000);
        const durationMs = (offTimeDate - onTimeDate)-workTime;
        const durationHours = durationMs / (1000 * 60 * 60);
        if(durationHours<1){
            return 0;
        }else{
            if(durationHours%1<0.45){
                return durationHours.toFixed(0);
            }else{
                return Math.ceil(durationHours)
            }
         
        }
    };



    return(
        <Box>
            <div className="rtable-possition">
                {data.length ? (
                    <table className="rtable-fill">
                        <thead>
                            <tr>
                                <th className="text-left rthTable">NIC</th>
                                <th className="text-left rthTable">Name</th>
                                <th className="text-left rthTable">Date</th>
                                <th className="text-left rthTable">On Time</th>
                                <th className="text-left rthTable">Off Time</th>
                                <th className="text-left rthTable">OT</th>
                            </tr>
                        </thead>
                        <tbody className="table-hover">
                            {data.map((row, index) => (
                                <tr key={index}>
                                    <td className="text-left rtdTable">{row.Nic}</td>
                                    <td className="text-left rtdTable">{row.Name}</td>
                                    <td className="text-left rtdTable">{row.Date}</td>
                                    <td className="text-left rtdTable">{row.Time}</td>
                                    <td className="text-left rtdTable">{row.offTime}</td>
                                    <td className="text-left rtdTable">
                                        {row.Time && row.offTime ? 
                                            `${calculateDuration(row.Time, row.offTime)} hours` 
                                            : null
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : null}
            </div>
        </Box>
    );
}

export default Em_table_permanent_attendance;