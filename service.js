const Email = require('./mail');
const SMS = require('./sms');

exports.useservice = function(service,user,no_of_retry){
    if(no_of_retry<=5){
        switch (service) {
            case "email":
                Email.sendEmail(user.email,no_of_retry);
                break;
            case "sms":
                SMS.sendSMS(user.phoneno,no_of_retry);
                 break;
            default:
                break;
        }
      }
}