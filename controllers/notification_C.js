const Notification = require('../models/notification');
exports.createNotification = async(req, res)=>{
    const notiObj = {
        from : req.body.from,
        to : req.body.to,
        subject : req.body.subject,
        text : req.body.text
    };
    try {
        const notifications = await Notification.create(notiObj);
        res.status(201).send(notifications);
    }catch(error){
        res.status(500).send({
            message : "Internal Error !"
        });
    }
}

exports.getNotification = async(req, res)=>{
    const byId = req.params.id;
    try {
        const notification = await Notification.findOne({_id : byId});
        res.status(200).send(notification);
    } catch(error){
        res.status(500).send({
            message : "Internal Error while fetching !"
        });
    }
}