const mailSender = require('../mailSender/mailSender');
const Notification = require('../models/notification');
const util = require('../utils/otpBody');

exports.schedul = ()=>{
    // it check every 10 sec in database
    setInterval(async()=>{
        const notifi = await Notification.find({status : util.status.unsent});
        notifi.forEach((data)=>{
            let mailObj = {
                from : data.from,
                to : data.to,
                subject : data.subject,
                text : data.text
            }
            mailSender.sendMail(mailObj,(err,info)=>{
                if(err){
                    console.log("Error !");
                }
                else{
                    console.log(`email sent successfull`);
                }
            });
            data.status = util.status.sent;
            data.save();
        });
    },10000);
}