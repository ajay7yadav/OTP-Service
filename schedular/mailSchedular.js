const mailSender = require('../mailSender/mailSender');
const Notification = require('../models/notification');

exports.schedul = ()=>{
    setInterval(async()=>{
        const notifi = await Notification.find({status : "UNSENT"});
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
                    console.log("email sent successfull");
                }
            });
            data.status = "SENT";
            data.save();
        });
    },10000);
}