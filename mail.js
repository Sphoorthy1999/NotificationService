const nodemailer = require("nodemailer");
const useservice = require('./service');
require('./model');
const mongoose = require('mongoose');
const User = mongoose.model('User');

let transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"sphoorthytest@gmail.com",
        pass:"test@1234"
    }
});

exports.sendEmail = function (to_address,no_of_retry) {
    user={email:to_address};
    transporter.sendMail(
        {
            from:"sphoorthytest@gmail.com",
            to:to_address,
            subject:"NOTIFICATION",
            text:"Hi!!! Good morning"
        },
        function(err,success){
            if(err){
                console.log("err");
                User.updateOne({email:to_address},{$inc:{no_of_retry:1}});
                useservice.useservice("email",user,no_of_retry+1)
            }
            else{
                console.log("email sent successfully");
            }
        }
    )
  }
 