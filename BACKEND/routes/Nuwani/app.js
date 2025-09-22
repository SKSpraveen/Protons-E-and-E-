const express = require('express');
const app = express();
const cors = require('cors');
const controller = require('../../routes/Nuwani/controller');

app.use(cors());

app.use(
    express.urlencoded({
       extended:true,
    })
);

app.use(express.json());

app.get('/users',(req,res) =>{
    
    controller.getUsers((req, res, next) => {
        res.send();
    });

    
});

app.post('/createuser', (req,res) => {
    
    controller.addUser(req.body, (callback) => {
        res.send();
    });
});

app.post('/updateuser', (req,res) => {
    
    controller.updateUser(req.body, (callback) => {
        res.send(callback);
    });
});

app.post('/deleteuser', (req,res) => {
    
    controller.deleteUser(req.body, (callback) => {
        res.send(callback);
    });
});

app.get('/faqs',(req,res) =>{
    
    controller.getFaqs((req, res, next) => {
        res.send();
    });

    
});
app.post('/createfaqs', (req,res) => {
    
    controller.addFaqs(req.body, (callback) => {
        res.send();
    });
});

app.post('/updatefaqs', (req,res) => {
    
    controller.updateFaqs(req.body, (callback) => {
        res.send(callback);
    });
});

app.post('/deletefaqs', (req,res) => {
    
    controller.deleteFaqs(req.body, (callback) => {
        res.send(callback);
    });
});



app.get('/complaints',(req,res) =>{
    
    controller.getComps((req, res, next) => {
        res.send();
    });

    
});
app.post('/createcomps', (req,res) => {
    
    controller.addComps(req.body, (callback) => {
        res.send();
    });
});

app.post('/updatecomps', (req,res) => {
    
    controller.updateComps(req.body, (callback) => {
        res.send(callback);
    });
});

app.post('/deletecomps', (req,res) => {
    
    controller.deleteComps(req.body, (callback) => {
        res.send(callback);
    });
});


module.exports = app;