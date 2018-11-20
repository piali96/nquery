var User = require("../models/user");
var Question = require("../models/question");

exports.addQuestion = async function(req,res,next){
    var email = req.user.email;
    var t_question = req.body.question;
    var t_option1 = req.body.option1;
    var t_option2 = req.body.option2;
    var t_option3 = req.body.option3;
    var t_option4 = req.body.option4;
    var t_correctOption = req.body.correctOption;

    console.log(email);
    if(!t_question){
        return res.status(422).send({error: 'Question not entered'});
    }
    var user = await User.findOne({email:email});
    if(user){
        var userJSON = new Question({
            studentID : user['_id'],
            question : t_question,
            option1 : t_option1,
            option2 : t_option2,
            option3 : t_option3,
            option4 : t_option4,
            correctOption : t_correctOption
        });
        try{
            await userJSON.save();
        }catch(err){
            return res.status(422).send({error: err});
        }
       try{
            await user.save();
        }catch(err){
            return res.status(422).send({error: err});
        }
        
        res.status(200).json({success : true})
    }
    else{
        return res.status(422).send({error: 'No such user found'});
    }
}
exports.getQuestions = async function(req, res, next){
    var questions = await Question.find();
    return res.status(201).send(questions);
}
