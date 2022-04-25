const express = require("express");
var cron = require('node-cron');
const mongoose = require('mongoose');
require('./model');
const User = mongoose.model('User');
const http=require('http');
const app=express();
const useservice = require('./service');

connectDatabase('Users-inventory');

var db_option = {
    reconnectTries: 30,
    reconnectInterval: 1000,
    autoReconnect:true,
    poolSize: 20,
    useNewUrlParser: true,
    connectTimeoutMS: 30000,
    keepAlive: 300000,
}

function connectDatabase(name) {
  mongoose.connect('mongodb://localhost:27017/' + name, db_option)
    .then(() => {
      logger.info(`MongoDB Connected! for "${name}" database`);
    })
    .catch((err) => {
      logger.error(`MongoDB connection failed!- ${err}- ${new Error().stack}`);
    })
}


//Here notifications are sent at 7:30:00 AM daily
cron.schedule('0 30 7 * * *', () => {
    //fetching inventory of users, currently there is one user detail in database.
    User.find().then(list=>{
       for (let i = 0; i < list.length; i++) {
           //send notifications only if user subscribes 
           if(list[i].subscriber == true){
               useservice.useservice(list[i].service,list[i],list[i].no_of_retry);
           }  
       }
    }).catch(err=>{
        console.log('error in fetching list');
    });
  });



const port = 5000;
app.set("port",port)
const server=http.createServer(app);
server.listen(port);


