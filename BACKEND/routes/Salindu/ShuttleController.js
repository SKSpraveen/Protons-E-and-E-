// controller.js

const { response } = require('./app');
const ShuttleRequest = require('../../models/Salindu/ShuttleRequest');

const getShuttleRequest = (req, res) => {
    ShuttleRequest.find()
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
};

const addShuttleRequest = (req, res) => {   
    const { Remail, Employeename, Reason, RvehicleType, Work } = req.body;
    const newShuttleRequest = new ShuttleRequest({
        Remail: Remail,
        Employeename: Employeename,
        Reason: Reason,
        RvehicleType: RvehicleType,
        Work: Work,
    });


    newShuttleRequest.save()
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });

     
};

const updateShuttleRequest = async (req, res) => {
    const { Remail,Employeename,Reason,RvehicleType,Work } = req.body;
    Vehicle.updateOne({ Remail }, { Employeename,Reason,RvehicleType,Work })
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
};

const deleteShuttleRequest = async (req, res) => {
    const { Remail: Remail } = req.body;
    ShuttleRequest.deleteOne({ Remail: Remail })
        .then(response => {
            res.json({ message: "delete successfully", response });
        })
        .catch(error => {
            res.status(500).json({ message: "delete unsuccessfully", response });
        });
};

module.exports = {
    getShuttleRequest,
    addShuttleRequest,
    updateShuttleRequest,
    deleteShuttleRequest
};
