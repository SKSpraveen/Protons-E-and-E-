
const express = require('express');
const app = express();
const cors = require('cors');
const ShuttleController = require('./ShuttleController');



app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ 
    verify: (req, res, buf) => {
        console.log("Raw request body:", buf.toString());
    }
}));


app.get('/ShuttleRequest', ShuttleController.getShuttleRequest);

app.post('/createShuttleRequest', (req, res) => {
    ShuttleController.addShuttleRequest(req, res);
});

app.put('/updateShuttleRequest', (req, res) => {
    ShuttleController.updateShuttleRequest(req, res);
});

app.delete('/deleteShuttleRequest', (req, res) => {
    ShuttleController.deleteShuttleRequest(req, res);
});



module.exports = shuttle;