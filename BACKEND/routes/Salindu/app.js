const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();


// Security: remove Express version disclosure
app.disable('x-powered-by');



app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/vehicleDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const vehicleSchema = new mongoose.Schema({
    Email: String,
    Vehicletype: String,
    VehicleNo: String,
    Telephoneno: String,
    Work: String
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

// GET all vehicles
app.get('/vehicle', (req, res) => {
    Vehicle.find((err, vehicles) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(vehicles);
        }
    });
});

// POST a new vehicle
app.post('/createvehicle', (req, res) => {
    const newVehicle = new Vehicle(req.body);
    newVehicle.save((err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send("Vehicle added successfully!");
        }
    });
});

// DELETE a vehicle
app.delete('/deletevehicle', (req, res) => {
    Vehicle.deleteOne({ Email: req.body.Email }, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send("Vehicle deleted successfully!");
        }
    });
});

// UPDATE a vehicle
app.put('/updatevehicle', (req, res) => {
    Vehicle.updateOne({ Email: req.body.Email }, {$set: req.body}, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send("Vehicle updated successfully!");
        }
    });
});

const port = 8070;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});