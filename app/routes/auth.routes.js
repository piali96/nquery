var authController = require('../controllers/auth.controller'),
    express = require('express'),
    passportService = require('../../config/auth');
    passport = require('passport');
    var bodyParser = require('body-parser');
    var Pusher = require('pusher');
    require('dotenv').config();
    var shortId = require('shortid');
    var dialogFlow = require('dialogflow')
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    
    var pusher = new Pusher({
      appId: '655545',
      key: '15e3ba0ca4b906df2c44',
      secret: '8595fd90b3334215ae58',
      cluster: 'ap2',
      encrypted: true
    });

var requireAuth = passport.authenticate('jwt',{session: false});
var requireLogin = passport.authenticate('local', {session:false});
module.exports = (app) => {
   app.post('/register',authController.register);
   app.post('/login',requireLogin,authController.login);
   app.post('/message', async (req, res) => {
    // simulate actual db save with id and createdAt added
    console.log(req.body);
    var chat = {
      ...req.body,
      id: shortId.generate(),
      createdAt: new Date().toISOString()
    } 
    //update pusher listeners
    pusher.trigger('chat-bot', 'chat', chat)
  
    var message = chat.message;
    var response = await dialogFlow.send(message);
    // trigger this update to our pushers listeners
    pusher.trigger('chat-bot', 'chat', {
      message: `${response.data.result.fulfillment.speech}`,
      type : 'bot',
      createdAt : new Date().toISOString(),
      id: shortId.generate()
    })
    res.send(chat)
  })
   app.get('/security', requireAuth, function(req,res){
       res.send({content: "SUCCESS"});
   });
   app.get('/',function(req,res){
       res.render('../views/test/index')
   })
   app.get('/login', function(req,res){
       res.render("../views/test/login");
   })
   app.get('/register', function(req,res){
       res.render('../views/test/register')
   })
   app.get('/dummy',function(req,res){
       res.send("Yay")
   })
  app.get('/message',function(req,res){
        res.render('../views/test/message');
  })
}
