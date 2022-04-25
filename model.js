const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
        fullname: { type: String },
        email: { type: String },
        subscriber:{type:Boolean},
        phoneno: {type:String},
        service: {type:String},
        no_of_retry:{type:Number}
  })


mongoose.model('User', userSchema);