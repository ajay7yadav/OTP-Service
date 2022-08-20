const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    phone : {
        type : Number,
    },
    email : {
        type : String,
        unquie : true,
        required : true,
    },
    password : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('users',User);