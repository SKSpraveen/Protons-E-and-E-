

const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const ShuttleRequestSchema = new Schema({ 
    Remail: {
        type: String,
    },
    Employeename: {
        type: String,
    },
    Reason: {
        type: String,
    },
    RvehicleType: {
        type: String,
    },
    Work: {
        type: String,
    },
});





const ShuttleRequest = mongoose.model("ShuttleRequest", ShuttleRequestSchema);

module.exports = ShuttleRequest; // Exporting the Vehicle model
