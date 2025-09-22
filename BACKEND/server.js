const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const host = 'localhost';
const router=require('../BACKEND/routes/Anjana/router.js')
const router2=require('../BACKEND/routes/KK/router.js')
const routerN=require('../BACKEND/routes/Nuwani/router.js')
const mainRouter=require('../BACKEND/routes/Salindu/router.js')

require('dotenv').config();
const dotenv = require("dotenv");

const PORT = process.env.PORT || 8070

app.use(cors())
app.use(bodyParser.json())

const uri ='mongodb+srv://mynamesasindu:sasindu123@protonsdb.zcrftue.mongodb.net/protonsDB?retryWrites=true&w=majority';

const connect = async () =>{
    try{
        await mongoose.connect(uri);
        console.log('Connected to mongoDB !!..');
    }
    catch(error) {
        console.log('MongoDB Error: ', error);
    }
};
connect();
app.use('/api', router);
app.use('/api', router2);
app.use('/',mainRouter);


const server =app.listen(PORT,host,()=>{

    console.log(`Node server is listening to ${server.address().port}`)
    
});
const advertisementRouter = require("./routes/Sasindu/Advertisement.js");
app.use("/Advertisement",advertisementRouter);

const stockRouter = require("./routes/Sasindu/Stock.js");
app.use("/Stock",stockRouter);

const repairtRouter = require("./routes/Samidi/repair.js");
app.use("/repair",repairtRouter);

const cartRouter = require("./routes/Samidi/Cart.js");
app.use("/Cart",cartRouter);

const ExpencesRouter = require("./routes/Rasindu/Expence.js");
app.use("/Expence",ExpencesRouter);

const userRoute =require('./routes/Kavishka/userRoute')
app.use('/api/auth',userRoute);

const user =require('./routes/Kavishka/user')
app.use("/api/auth",user);

const staff =require('./routes/Kavishka/staff')
app.use("/api/auth",staff);

const staffRoute =require('./routes/Kavishka/staffRoute')
app.use("/api/auth", staffRoute);

//Nuwani
app.use('/api', routerN);
