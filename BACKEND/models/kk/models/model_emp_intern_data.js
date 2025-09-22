const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Employee_internSchema = new Schema({
    name: String,
    nic:Number,
    age:Number,
    email:String,
    wNumber:Number,
    type:String,
    cNumber:Number,
    password:String,
});

const Employee_intern_data = mongoose.model('Employee_intern', Employee_internSchema  );

module.exports = Employee_intern_data;