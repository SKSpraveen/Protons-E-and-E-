const { response } = require('express');
const Employee_attendance = require('../models/model_emp_attendance');
const getEmployee_attendance = (req, res, next) =>{
    Employee_attendance.find()
        .then(response => {
            res.json({response})
        })
        .catch(error => {
            res.json({error})
        });
};

const addEmployee_attendance = (req,res,next) => {
    const attendance = new Employee_attendance({
        name: req.body.name,
        nic:req.body.nic,
        date:req.body.date,
        onTime:req.body.onTime,
        offTime:req.body.offTime,
        ot:req.body.ot,
        type:req.body.type,
    });
    attendance.save()
        .then(response => {
            res.json({response})
        }) 
        .catch(error => {
            res.json({error})
        });
}
const updateEmployee_attendance = async (req, res) => {
    try {
        const { name, nic, date, onTime, offTime, ot } = req.body;
        const updateObject = {
            $set: {
                name: name,
                nic: nic,
                date: date,
                onTime: onTime,
                offTime: offTime,
                ot: ot
            }
        };
        await Employee_attendance.updateMany({}, updateObject); // Update all records in the table
        res.json({ message: "Employee attendance table updated successfully" });
    } catch (error) {
        console.error("Error updating employee attendance table:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};




const deleteEmployee_attendance = async (req, res) => {
    //const id = req.params.id; // Extract NIC from URL parameter
    try {
        // Delete the employee based on NIC
        await Employee_attendance.deleteMany({});
        res.status(200).json({ status: "Employee deleted" });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ status: "Error deleting employee" });
    }
};
// controller/con_employee_attendance_data.js

const getEmployeeById_attendance = (req, res) => {
    const { nic } = req.params;
    Employee_attendance.findOne({ nic: nic }) // Use findOne instead of findById for non-objectId fields
        .then(employee => {
            if (!employee) {
                return res.status(404).json({ error: 'Employee not found' });
            }
            res.json(employee); // Send the employee data directly
        })
        .catch(error => {
            console.error('Error fetching employee details:', error);
            res.status(500).json({ error: 'internal server error' });
        });
};

module.exports = {
    getEmployeeById_attendance,
    getEmployee_attendance,
    addEmployee_attendance,
    updateEmployee_attendance,
    deleteEmployee_attendance
};