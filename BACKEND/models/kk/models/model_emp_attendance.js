const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Employee_attendanceSchema = new Schema({
    name:String,
    nic:Number,
    date:String,
    onTime:String,
    offTime:String,
    ot:Number,
    type:String,
});

const Employee_attendance_data = mongoose.model('Employee_attendance',Employee_attendanceSchema);

module.exports = Employee_attendance_data;