const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Employee_intern_final_attSchema = new Schema({
    nic:Number,
    name:String,
    att:Number,
    ot:Number,
    month:String,
});


const Employee_intern_att = mongoose.model('Employee_att_intern', Employee_intern_final_attSchema  );

module.exports = Employee_intern_att;
