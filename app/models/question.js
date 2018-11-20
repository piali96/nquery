var mongoose = require('mongoose');

var questionJSON = new mongoose.Schema({
    studentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    question : {
        type: String,
        required: true
    },
    option1 : {
        type: String,
        required: true
    },
    option2 : {
        type: String,
        required: true
    },
    option3 : {
        type: String,
        required: true
    },
    option4 : {
        type: String,
        required: true
    },
    correctOption : {
        type: Number,
        required: true
    } 

});
var questionSchema = questionJSON;
module.exports = mongoose.model('Question',questionSchema);

