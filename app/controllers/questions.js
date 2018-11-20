var User = require("../models/user");
var Question = require("../models/question");

exports.addQuestion = async function(req,res,next){
    var email = req.user.email;
    var t_question = req.body.question;
    console.log(email);
    if(!t_task){
        return res.status(422).send({error: 'Task not entered'});
    }
    var user = await User.findOne({email:email});
    if(user){
        var userJSON = new Schedule({
            studentID : user['_id'],
            question : t_question,
            option1 : t_option1,
            option2 : t_option2,
            option3 : t_option3,
            option4 : t_option4,
            answer : t_answer
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

exports.getTasks = async function(req,res,next){
    var email = req.user.email;
    //var day = req.params.day;
    var month = req.params.month;
    var year = req.params.year;
    if(!month || !email){
        return res.status(422).send({error: 'Month/e-mail not entered'});
    }
    var user = await User.findOne({email:email});
    var allTasks = await Schedule.find({studentID:user['_id']});
    console.log(allTasks);
    if(user){
        var tasks = [];
        for(var i=0; i<allTasks.length; i++){
            var curr_date = allTasks[i].date;
            console.log(curr_date,typeof(curr_date));
            var curr_month = curr_date.getMonth()+1;
            var curr_year = curr_date.getFullYear();
            //var curr_day = curr_date.getDate();
            if(curr_month == month && curr_year == year){
                tasks.push(allTasks[i]);
            }
        }
        return res.status(200).json({tasks});
    }
    else{
        return res.status(422).send({error: 'No such user found'});
    }
}

exports.updateTask = async function(req,res,next){
    var email = req.user.email;
    var t_id = req.body.id;
    var t_task = req.body.task;
    var t_tag = req.body.tag;
    var t_date = req.body.date;
    var t_status = req.body.status;
    var t_startTime = req.body.startTime;
    var t_endTime = req.body.endTime;

    if(!email){
        return res.status(422).send({error: 'Email not entered'});
    }
    var user = await User.findOne({email:email});
    if(user){
        var dirtyTask = await Schedule.findOne({studentID:user['_id'],_id:t_id});
        if(t_task){
            dirtyTask['task'] = t_task;
        }
        if(t_date){
            dirtyTask['date'] = t_date;
        }
        if(t_tag){
            dirtyTask['tag'] = t_tag;
        }
        if(t_status != null){
            dirtyTask['status'] = t_status;
        }
        if(t_startTime){
            dirtyTask['startTime'] = t_startTime;
        }
        if(t_endTime){
            dirtyTask['endTime'] = t_endTime;
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
