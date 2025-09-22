const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Employee_intern_salarySchema = new Schema({
    name:String,
    nic:Number,
    email:String,
    salary:Number,
    month:String,
});

const Employee_salary = mongoose.model('Employee_salary', Employee_intern_salarySchema  );

module.exports = Employee_salary;
