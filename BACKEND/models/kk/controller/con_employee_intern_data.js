const { response } = require('express');
const Employee_intern = require('../models/model_emp_intern_data');
const getEmployee_intern = (req, res, next) =>{
    Employee_intern.find()
        .then(response => {
            res.json({response})
        })
        .catch(error => {
            res.json({error})
        });
};

const addEmployee_intern = (req,res,next) => {
    const intern = new Employee_intern({
        name: req.body.name,
        nic:req.body.nic,
        age:req.body.age,
        email:req.body.email,
        wNumber:req.body.wNumber,
        cNumber:req.body.cNumber,
        type:req.body.type,
        password:req.body.password,
    });
    intern.save()
        .then(response => {
            res.json({response})
        })
        .catch(error => {
            res.json({error})
        });
}

const updateEmployee_intern = (req, res, next) => {
    const { name, nic, age, email, wNumber, cNumber, password } = req.body;
    const updateObject = {
        $set: {
            name: name,
            nic: nic,
            age: age,
            email: email,
            wNumber: wNumber, 
            cNumber: cNumber,
            password: password
        }
    };

    Employee_intern.updateOne({ /* your query to identify the document */ }, updateObject)
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.json({ error });
        });
};




const deleteEmployee_intern = async (req, res) => {
    const nic = req.params.nic; // Extract NIC from URL parameter
    try {
        // Delete the employee based on NIC
        await Employee_intern.deleteOne({ nic: nic });
        res.status(200).json({ status: "Employee deleted" });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ status: "Error deleting employee" });
    }
};
// controller/con_employee_intern_data.js

const getEmployeeById_intern = (req, res) => {
    const { nic } = req.params;
    Employee_intern.findOne({ nic: nic }) // Use findOne instead of findById for non-objectId fields
        .then(employee => {
            if (!employee) {
                return res.status(404).json({ error: 'Employee not found' });
            }
            res.json(employee); // Send the employee data directly
        })
        .catch(error => {
            console.error('Error fetching employee details:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
};

module.exports = {
    getEmployeeById_intern,
    getEmployee_intern,
    addEmployee_intern,
    updateEmployee_intern,
    deleteEmployee_intern
};