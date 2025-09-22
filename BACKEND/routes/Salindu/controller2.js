const Vehicle = require('../../models/Salindu/vehicle');

const getvehicle = (req, res) => {
    Vehicle.find()
        .then(vehicles => {
            res.json(vehicles);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
};

const addvehicle = (req, res) => {  
    const { Email, VehicleNo, Telephoneno, Vehicletype, Work } = req.body;
    const newVehicle = new Vehicle({
        Email,
        Vehicletype,
        VehicleNo,
        Telephoneno,
        Work
    });

    newVehicle.save()
        .then(vehicle => {
            res.json(vehicle);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
};

const updatevehicle = async (req, res) => {
    const { Email, Vehicletype, VehicleNo, Telephoneno, Work } = req.body;
    Vehicle.updateOne({ Email }, { Email, Vehicletype, VehicleNo, Telephoneno, Work })
        .then(() => {
            res.json({ message: "Vehicle updated successfully" });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
};

const deletevehicle = async (req, res) => {
    const { Email } = req.body;
    Vehicle.deleteOne({ Email })
        .then(() => {
            res.json({ message: "Vehicle deleted successfully" });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
};

module.exports = {
    getvehicle,
    addvehicle,
    updatevehicle,
    deletevehicle
};
