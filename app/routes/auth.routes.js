var authController = require('../controllers/auth.controller'),
    express = require('express'),
    passportService = require('../../config/auth');
    passport = require('passport');

var requireAuth = passport.authenticate('jwt',{session: false});
var requireLogin = passport.authenticate('local', {session:false});
module.exports = (app) => {
   app.post('/register',authController.register);
   app.post('/login',requireLogin,authController.login);
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
}
