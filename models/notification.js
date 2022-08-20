const mongoose = require('mongoose');
const util = require('../utils/otpBody');

const Notification = new mongoose.Schema({
    from : {
        type : String,
    },
    to : {
        type : String
    },
    subject : {
        type : String
    },
    text : {
        type : String
    },
    status : {
        type : String,
        default : util.status.unsent
    },
    otp : {
        type : Number,
    },
    createBy : {
        type : String
    },
    otpStatus : {
        type : String,
        default : util.otpStatus.unmatched
    }
});

module.exports = mongoose.model("notify",Notification);