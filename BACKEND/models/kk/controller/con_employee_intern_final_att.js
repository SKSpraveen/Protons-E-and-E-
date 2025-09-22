const { response } = require('express');
const Employee_intern_att = require('../models/model_emp_att_final_intern');
const getEmployee_final_att = (req, res, next) =>{
    Employee_intern_att.find()
        .then(response => {
            res.json({response})
        })
        .catch(error => {
            res.json({error})
        });
};

const addEmployee_final_att = (req,res,next) => {
    const intern = new Employee_intern_att({
        nic:req.body.nic,
        name: req.body.name,
        att:req.body.att,
        ot:req.body.ot,
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

const deleteEmployee_final_att = async (req, res) => {
    //const id = req.params.id; // Extract NIC from URL parameter
    try {
        // Delete the employee based on NIC
        await Employee_intern_att.deleteMany({});
        res.status(200).json({ status: "Employee deleted" });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ status: "Error deleting employee" });
    }
};

module.exports = {
   getEmployee_final_att,
   addEmployee_final_att,
   deleteEmployee_final_att
};