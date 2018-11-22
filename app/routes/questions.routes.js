var questionsController = require('../controllers/questions.controller'),
    express = require('express')
    // passportService = require('../../config/auth');
    // passport = require('passport');

var requireAuth = passport.authenticate('jwt',{session: false});
// var requireLogin = passport.authenticate('local', {session:false});

module.exports = (app) => {
    app.post('/question/addQuestion',requireAuth,questionsController.addQuestion); //Tested
    app.get('/question/getQuestions',requireAuth,questionsController.getQuestions); //Tested
    app.post('/question/updateQuestion',requireAuth,questionsController.updateQuestion);
    app.post('/question/deleteQuestion',requireAuth,questionsController.deleteQuestion);
}
