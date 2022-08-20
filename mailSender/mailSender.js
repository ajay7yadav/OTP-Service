const emailSender = require('nodemailer');

module.exports = emailSender.createTransport({
    service : "gmail",
    auth : {
        user : "ajay7yadav95@gmail.com",
        pass : "akbvweqfericltsa"
    }
});

// let SMTPConnection = emailSender.createTransport({
//     service : "gmail",
//     auth : {
//         user : "ajay7yadav95@gmail.com",
//         pass : "akbvweqfericltsa"
//     }
// });

// let mailObj = {
//     from : "no-reply-@gmail.com",
//     to : "ajay7yadav95@gmail.com",
//     subject : "test nodemailer",
//     text : "yah its successful experiment"
// };

// SMTPConnection.sendMail(mailObj,(err,info)=>{
//     if(err){
//         console.log("Error ",err.message);
//     }
//     if(info){
//         console.log("email sent successfull...");
//     }
// });