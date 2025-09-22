const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const repairSchema =new Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    repairType:{
        type:String,
        required:true
      
    },
    description:{
        type:String,
        required:true
    },
    

})
const repair = mongoose.model("repair",repairSchema);

module.exports =repair;