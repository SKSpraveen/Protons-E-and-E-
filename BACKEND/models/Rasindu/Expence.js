const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenceSchema =new Schema({
    title:{
        type: String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }
    

})
const Expence = mongoose.model("Expence",ExpenceSchema);

module.exports =Expence;