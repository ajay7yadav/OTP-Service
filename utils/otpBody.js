// 6 digit otp generate

const otpBody = {
    from : "no-reply-@gmail.com",
    subject : " OTP Service ",
    text : `hey please make sure not share your OTP `,
    otpStatus : {
        matched : "MATCH",
        unmatched : "UNMATCH"
    },
    status : {
        sent : "SENT",
        unsent : "UNSENT"
    }
}

module.exports = otpBody;


// console.log(otpBody.text);
// console.log(otpBody.from);