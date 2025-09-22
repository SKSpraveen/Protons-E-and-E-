const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdvertisementSchema =new Schema({
    type:{
        type: String,
    },
    item:{
        type: String,
        required:true
    },
    description:{
        type: String,
    },
    photo:{
        type:String,
        required:true
    },
    discount:{
        type:Number,
    },
    price:{
        type:Number,
        required:true
    },
    availability:{
        type:String
    }

})
const Advertisement = mongoose.model("Advertisement",AdvertisementSchema);

module.exports =Advertisement;