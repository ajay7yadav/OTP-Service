const User = require('../models/user_Schema');
const util = require('../utils/helper');
const bcrypt = util.bcrypt;
const jwt = util.jwt;
const key = util.key
const Notification = require('../models/notification');
const otpBody = require('../utils/otpBody');

// Handler for signup
exports.signUp = async(req, res)=>{

    const userBody = {
        username : req.body.username,
        phone : req.body.phone,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password,8)  // 8 level of hashing security
    };

    try{

        const users = await User.create(userBody);
        res.status(201).send({
            message : "Registration Successful",
            username : users.username,
            email : users.email
        });

    }catch(err){
        res.status(500).send({
            message : "internal error !"
        });
    }
}

// Handler for signin
exports.signIn = async(req, res)=>{
    const Email = req.body.email;
    const Phone = req.body.phone;

    let users;
    try{
        // login with email
        if(Email){
            users = await User.findOne({ email : Email });
        }
        // Or login with phone
        else if(Phone){
            users = await User.findOne({ phone : Phone});
        }
    
        if(!users){
            res.status(404).send({
                message : 'invalid email or phone !'
            });
            return;
        }
        let pass = bcrypt.compareSync(req.body.password, users.password);
        if(!pass){
            res.status(401).send({
                message : "password is not valid"
            })
            return;
        }
        // JWT :                header         key     valid time
        let token = jwt.sign({_id : users._id},key,{expiresIn : 200});

        res.status(200).send({
            message : "welcome "+ users.username +" </>",
            accessToken : token
        });
    }catch(err){
        res.status(500).send({
            message : " Oops something is wrong "
        });
    }
}

// Handler for forget and generate OTP by pass email in query parameter
// /forget?gamil=ajay7yadav@gmail.com

exports.forgetPassword = async(req, res) =>{
    
    let mail = req.query.email;
    if(!mail){
        return res.status(401).send({message : "invalid query email !"});
    }
    try{
        // Check user is avaible or not in our database
        let users = await User.findOne({email : mail});
        if(!users){
            return res.status(400).send({
                message : ' Please check email, email is not found !'
            });
        }
        // Check user has already make otp or not
        let check = await Notification.find({createBy : mail});
        if(check){
            await Notification.deleteOne({createBy : mail});
        }
        // random OTP
        let newOTP = Math.floor(10000 + Math.random()*90000);
        // notification body
        const notiObj = {
            from : otpBody.from,
            to : users.email,
            subject : otpBody.subject,
            text : otpBody.text+newOTP,
            createBy : mail,
            otp : newOTP
        };
        let notification = await Notification.create(notiObj);
        res.status(201).send({
            message : ' OTP sent in your email'
        });
    }catch(err){
        console.log(err.message);
        console.log(err);
        res.status(500).send({
            message : " Oops otp does not sent "
        });
    }
}

// Handler for match OTP
// enter OTP in body
exports.matchOTP = async(req, res)=>{
    if(!req.body.otp){
        return res.status(401).send({message : "Please enter OTP !"});
    }
    const otp = req.body.otp;

    try {
        // find OTP in database
        let matchOTP = await Notification.findOne({otp : otp});

        if(!matchOTP){
            return res.status(401).send({
                message : ' OTP not matched ! please try again...'
            });
        }
        // set to matched for future
        matchOTP.otpStatus = otpBody.otpStatus.matched;
        await matchOTP.save();
        res.status(200).send({
            message : ' OTP Matched ',
            nextStep : "Go -> /authentication/v1/users/newpass "
        });

    }catch(err){
        res.status(500).send({
            message : " Internal error while matching OTP "
        });
    }
}

// Handler for change password
exports.changePassword = async(req, res)=>{
    // user give her email
    // user new password
    if(!req.body.email){
        return res.status(401).send({message : "invalid field email !"});
    }
    const mail = req.body.email;
    try {
        // already present or not
        const user = await User.findOne({email : mail});
        if(!user){
            return res.status(400).send({message : `'${mail}', email does not exits !`});
        }
        
        let checkOtp = await Notification.findOne({createBy : mail});
        // OTP matched or requested for changing password or not
        if(!checkOtp || checkOtp.otpStatus == otpBody.otpStatus.unmatched){
            return res.status(400).send({
                message : ' Please forget the password once, you can not change dirrectly !'
            });
        }
        // taking new password
        if(!req.body.password){
            return res.status(401).send({message : "invalid field password !"});
        }
        
        const pass = bcrypt.hashSync(req.body.password,8);
        user.password = pass;
        await user.save();   
        res.status(200).send({
            message : " Password has been changed "
        });

    }catch(err){
        console.log(err.message);
        console.log(err);
        res.status(500).send({
            message : " Error while updating password ! "
        });
    }
}