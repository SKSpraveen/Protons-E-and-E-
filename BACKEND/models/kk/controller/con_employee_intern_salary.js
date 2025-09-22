const { response } = require('express');
const Employee_salary = require('../models/model_emp_salary');
const getEmployee_salary = (req, res, next) =>{
    Employee_salary.find()
        .then(response => {
            res.json({response})
        })
        .catch(error => {
            res.json({error})
        });
};

const addEmployee_salary = (req,res,next) => {
    const intern = new Employee_salary({
        name: req.body.name,
        nic:req.body.nic,
        email:req.body.email,
        salary:req.body.salary,
        month:req.body.month,
    });
    intern.save()
        .then(response => {
            res.json({response})
        })
        .catch(error => {
            res.json({error})
        });
}

const updateEmployee_salary = (req, res, next) => {
    const { name, nic, email, salary} = req.body;
    const updateObject = {
        $set: {
            name: name,
            nic: nic,
            email: email,
            salary: salary,
        }
    };

    Employee_salary.updateOne({ /* your query to identify the document */ }, updateObject)
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.json({ error });
        });
};



const deleteEmployee_salary = async (req, res) => {
    const nic = req.params.nic; // Extract NIC from URL parameter
    const month = req.params.month;
    try {
        // Delete the employee based on NIC
        await Employee_salary.deleteOne({nic,month});
        res.status(200).json({ status: "Employee deleted" });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ status: "Error deleting employee" });
    }
};
exports.getEmployee_salary = getEmployee_salary;
exports.addEmployee_salary = addEmployee_salary;
exports.updateEmployee_salary = updateEmployee_salary;
exports.deleteEmployee_salary = deleteEmployee_salary;
