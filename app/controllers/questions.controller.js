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

exports.updateQuestion = async function(req,res,next){
    var email = req.user.email;
    var t_id = req.body.id;
    var t_question = req.body.question;
    var t_option1 = req.body.option1;
    var t_option2 = req.body.option2;
    var t_option3 = req.body.option3;
    var t_option4 = req.body.option4;
    var t_correctOption = req.body.correctOption;
    if(!email){
        return res.status(422).send({error: 'Email not entered'});
    }
    var user = await User.findOne({email:email});
    if(user){
        var dirtyTask = await Question.findOne({studentID:user['_id'],_id:t_id});
        if(t_task){
            dirtyTask['question'] = t_question;
        }
        if(t_option1){
            dirtyTask['option1'] = t_option1;
        }
        if(t_option2){
            dirtyTask['option2'] = t_option2;
        }
        if(t_option3){
            dirtyTask['option3'] = t_option3;
        }
        if(t_option4){
            dirtyTask['option4'] = t_option4;
        }
        if(t_correctOption){
            dirtyTask['correctOption'] = t_correctOption;
        }
        try{
            await dirtyTask.save();
        }catch(err){
            return res.status(422).send({error: err});
        }
        return res.status(200).json({dirtyTask});
    }
    else{
        return res.status(422).send({error: 'No such user found'});
    }

}

exports.deleteQuestion = async function(req, res, next){
    var email = req.user.email;
    var t_id = req.body.id;
    console.log(t_id);
    if(!email || !t_id){
        return res.status(422).send({error: 'Email | task_id not entered'});
    }
    var user = await User.findOne({email:email});
    if(user){
        try{
            await Question.findOneAndDelete({studentID:user['_id'],_id:t_id});
        }catch(err){
            return res.status(422).send({error: err});
        }
        return res.status(200).send({success : true});
    }
    else{
        return res.status(422).send({error: 'No such user found'});
    }
}

/* 

exports.deleteTask = async function(req,res,next){
    var email = req.user.email;
    var t_id = req.body.id;
    console.log(email);
    console.log(t_id);
    if(!email || !t_id){
        return res.status(422).send({error: 'Email | task_id not entered'});
    }
    var user = await User.findOne({email:email});
    if(user){
        try{
            await Schedule.findOneAndDelete({studentID:user['_id'],_id:t_id});
        }catch(err){
            return res.status(422).send({error: err});
        }
        return res.status(200).send({success : true});
    }
    else{
        return res.status(422).send({error: 'No such user found'});
    }
}
 */