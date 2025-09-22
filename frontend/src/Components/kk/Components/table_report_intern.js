import { Box, MenuItem, Select } from "@mui/material";
import { getEmployee_intern_final_att } from "../api/addEmployeeInternFinalAttApi";
import { getEmployee_salary } from "../api/addEmplloyeeSalaryApi";
import { useEffect, useState } from "react";
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const TableReportIntern = () => {
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);

    const [selectedMonth, setSelectedMonth] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getEmployee_intern_final_att();
                setData(result);
                const result2 = await getEmployee_salary();
                setData2(result2);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const renderSalary = (nic, month) => {
        console.log('render Salary');
        const salaryDataForNICAndMonth = data2.find(row => row.nic === nic && row.month === month);
        if (salaryDataForNICAndMonth) {
            console.log('salary', salaryDataForNICAndMonth.salary);
            return salaryDataForNICAndMonth.salary;
        } else {
            return 15000; // Or any default value if salary data is not found
        }
    }
    

    const generatePDF = async () => {
        const filteredData = data.filter(row => row.month === selectedMonth);

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([500, 400]);
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

        const { width, height } = page.getSize();

        // Add table headers
        let y = height - 20;
        page.drawText('Name', { x: 50, y, font: helveticaFont, size: 12, color: rgb(0, 0, 0) });
        page.drawText('NIC', { x: 150, y, font: helveticaFont, size: 12, color: rgb(0, 0, 0) });
        page.drawText('Attendance', { x: 250, y, font: helveticaFont, size: 12, color: rgb(0, 0, 0) });
        page.drawText('OT hours', { x: 350, y, font: helveticaFont, size: 12, color: rgb(0, 0, 0) });
        page.drawText('Salary', { x: 450, y, font: helveticaFont, size: 12, color: rgb(0, 0, 0) });

        y -= 20;

        // Add table data
        filteredData.forEach((row, index) => {
            const rowY = y - (index + 1) * 20;
            page.drawText(row.name, { x: 50, y: rowY, font: helveticaFont, size: 12, color: rgb(0, 0, 0) });
            page.drawText(row.nic.toString(), { x: 150, y: rowY, font: helveticaFont, size: 12, color: rgb(0, 0, 0) });
            page.drawText(row.att.toString(), { x: 250, y: rowY, font: helveticaFont, size: 12, color: rgb(0, 0, 0) });
            page.drawText(row.ot.toString(), { x: 350, y: rowY, font: helveticaFont, size: 12, color: rgb(0, 0, 0) });
            page.drawText(renderSalary(row.nic,selectedMonth).toString(), { x: 450, y: rowY, font: helveticaFont, size: 12, color: rgb(0, 0, 0) });
        });

        const pdfBytes = await pdfDoc.save();

        // Download the PDF
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${selectedMonth}_report.pdf`;
        link.click();
    };

    // Store unique NIC entries
    const uniqueNic = [...new Set(data.map(row => row.nic))];

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
                            <th className="text-left rthTable">Name</th>
                            <th className="text-left rthTable">NIC</th>
                            <th className="text-left rthTable">Attendance</th>
                            <th className="text-left rthTable">OT hours</th>
                            <th className="text-left rthTable">Monthly Salary</th>
                        </tr>
                    </thead>
                    <tbody className="table-hover">
                        {uniqueNic.map((nic, index) => {
                            const rowDataForNIC = data.filter(row => row.nic === nic);
                            const rowDataForSelectedMonth = rowDataForNIC.find(row => row.month === selectedMonth);
                            return (
                                <tr key={index}>
                                    <td className="text-left rtdTable">{rowDataForNIC.length > 0 ? rowDataForNIC[0].name : ''}</td>
                                    <td className="text-left rtdTable">{nic}</td>
                                    <td className="text-left rtdTable">{rowDataForSelectedMonth ? rowDataForSelectedMonth.att : '0'}</td>
                                    <td className="text-left rtdTable">{rowDataForSelectedMonth ? rowDataForSelectedMonth.ot : '0'}</td>
                                    <td className="text-left rtdTable">{renderSalary(nic,selectedMonth)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <button onClick={generatePDF}>Generate PDF for Selected Month</button>
        </Box>
    );
};

export default TableReportIntern;
