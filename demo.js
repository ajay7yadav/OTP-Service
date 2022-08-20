function makeOTP(){
    let newOTP = Math.floor(10000 + Math.random()*90000);
    return newOTP;
}
let digit = makeOTP();
const otpBody = {
    from : "no-reply-@gmail.com",
    subject : " OTP Service ",
    text : `hey please make sure not share your OTP ${digit}`,
    otp : digit
}

module.exports = otpBody;

console.log(otpBody.otp)
console.log(otpBody.text);
console.log(otpBody.from);