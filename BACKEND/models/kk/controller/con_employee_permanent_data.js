const { response } = require('express');
const Employee_permanent_data = require('../models/model_emp_permanent_data');
const getEmployee_permanent = (req, res, next) =>{
    Employee_permanent_data.find()
        .then(response => {
            res.json({response})
        })
        .catch(error => {
            res.json({error})
        });
};

const addEmployee_permanent = (req,res,next) => {
    const intern = new Employee_permanent_data({
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

const updateEmployee_permanent = (req, res, next) => {
    const { name, nic, age, email, wNumber, cNumber, password } = req.body;
    const updateObject = {
        $set: {
            name: name,
            nic: nic,
            age: age,
            email: email,
            wNumber: wNumber,
            cNumber: cNumber,
            password: password,
        }
    };

    Employee_permanent_data.updateOne({ /* your query to identify the document */ }, updateObject)
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.json({ error });
        });
};



const deleteEmployee_permanent = async (req, res) => {
    const nic = req.params.nic; // Extract NIC from URL parameter
    try {
        // Delete the employee based on NIC
        await Employee_permanent_data.deleteOne({ nic: nic });
        res.status(200).json({ status: "Employee deleted" });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ status: "Error deleting employee" });
    }
};
exports.getEmployee_permanent = getEmployee_permanent;
exports.addEmployee_permanent = addEmployee_permanent;
exports.updateEmployee_permanent = updateEmployee_permanent;
exports.deleteEmployee_permanent = deleteEmployee_permanent;
