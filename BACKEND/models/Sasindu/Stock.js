const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StockSchema =new Schema({
    productCode:{
        type: String,
        required:true
    },
    productCategory:{
        type: String,
        required:true
    },
    product:{
        type: String,
        required:true
    },
    description:{
        type:String,
    },
    supplyCompany:{
        type:String,
    },
    dateReceived:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    unitPrice:{
        type:Number,
        required:true
    }

})
const Stock = mongoose.model("Stock",StockSchema);

module.exports =Stock;