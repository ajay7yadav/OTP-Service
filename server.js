const express = require('express');
const app  = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const mongoose = require('mongoose');
const DB = require('./configs/db.config');

mongoose.connect(DB.DB_URL,()=>{
    console.log("DATABASE CONNECTED");
});

require('./routes/user_API')(app);

require('./schedular/mailSchedular').schedul();

app.listen(8080,()=>{
    console.log("Server Starts...");
});