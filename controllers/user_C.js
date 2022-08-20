const User = require('../models/user_Schema');
const util = require('../utils/helper');
const bcrypt = util.bcrypt;
const jwt = util.jwt;
const key = util.key
const Notification = require('../models/notification');
const schedular = require('../schedular/mailSchedular');
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

exports.forgetPassword = async(req, res) =>{
    let mail = req.query.email;
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
        let newOTP = Math.floor(10000 + Math.random()*90000);
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
            message : ' please check your email and fill otp'
        });
    }catch(err){
        console.log(err.message);
        console.log(err);
        res.status(500).send({
            message : " Oops otp does not sent "
        });
    }
}

exports.matchOTP = async(req, res)=>{
    const otp = req.body.otp;
    let check = await Notification.find({otp : otp});
    
}