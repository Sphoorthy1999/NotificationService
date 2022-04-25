const accountSid = "AC*********"; //accountsid taken from twilio account
const authToken = "authtoken"; //authtoken taken from twilio account
const client = require('twilio')(accountSid, authToken);
require('./model');
const useservice = require('./service');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.sendSMS = function (to_phoneno,no_of_retry) {
    user={phoneno:to_phoneno}
    client.messages.create({
     body: 'Hi!!! Good morning',
     from: '9010268789',
     to: to_phoneno
   },
   function(err,success){
    if(err){
        console.log("err");
        User.updateOne({email:to_address},{$inc:{no_of_retry:1}});
        useservice.useservice("sms",user,no_of_retry+1)
    }
    else{
        console.log("sms sent successfully");
    }
   })
}