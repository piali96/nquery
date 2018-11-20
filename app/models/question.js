var mongoose = require('mongoose');

var optionJSON = {
    option : String,
    correct: Boolean,
    number : Number 
}

var questionJSON = new mongoose.Schema({
    studentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    question : {
        type: String,
        required: true
    },
    options : [optionJSON]

});
var questionSchema = questionJSON;
module.exports = mongoose.model('Question',questionSchema);

