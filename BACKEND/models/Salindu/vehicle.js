const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    Email: {
        type: String,
        required: true
    },
    Vehicletype: {
        type: String,
        required: true
    },
    VehicleNo: {
        type: String,
        required: true
    },
    Telephoneno: {
        type: String,
        required: true
    },
    Work: {
        type: String,
        required: true
    }
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
