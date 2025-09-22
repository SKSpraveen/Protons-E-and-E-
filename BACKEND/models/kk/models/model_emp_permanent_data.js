const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Employee_permanentSchema = new Schema({
    name: String,
    nic:Number,
    age:Number,
    email:String,
    wNumber:Number,
    cNumber:Number,
    type:String,
    password:String,
});

const Employee_permanent_data = mongoose.model('Employee_permanent', Employee_permanentSchema  );

module.exports = Employee_permanent_data;