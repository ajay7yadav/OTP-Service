const controller = require('../controllers/user_C');
const validation = require('../middlewares/validation_user');
const verifyToken = require('../middlewares/verifyJWT');

module.exports = (ap)=>{

    ap.post('/authentication/v1/users/signup',controller.signUp);

    ap.post('/authentication/v1/users/signin',controller.signIn);

    ap.post('/authentication/v1/users/forget',controller.forgetPassword);

    ap.post('/authentication/v1/users/fillotp',controller.matchOTP);

    ap.post('/authentication/v1/users/newpass',controller.changePassword);


}