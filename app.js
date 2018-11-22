var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
// var config = require('./config/config')
var passport = require('passport');
require('./config/passport.js')(passport);
mongoose.Promise = global.Promise;
var databaseConfig = require('./config/database');
// var router = require('./app/routes');

 
mongoose.connect(databaseConfig.url,{ useNewUrlParser: true });
 

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

//Chatbot Stuff


//  Adding all .routes.js files 
require('./app/routes/auth.routes.js')(app);
require('./app/routes/questions.routes.js')(app);




app.listen(port = process.env.PORT || 8000,()=>{
    console.log(`Listening on port ${port}`);
});


/* var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
// var config = require('./config/config')
var passport = require('passport');
require('./config/passport.js')(passport);
mongoose.Promise = global.Promise;
var databaseConfig = require('./config/database');
// var router = require('./app/routes');
 
mongoose.connect(databaseConfig.url,{ useNewUrlParser: true });
 

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

//  Add all .routes.js files you write here in such a manner
require('./app/routes/auth.routes.js')(app);
require('./app/routes/attendance.routes.js')(app);
require('./app/routes/doubt-portal.routes.js')(app);
require('./app/routes/gpa-predictor.routes.js')(app);
require('./app/routes/project-planner.routes.js')(app);
require('./app/routes/time-table.routes.js')(app);


app.listen(port = process.env.PORT || 8080,()=>{
    console.log(`Listening on port ${port}`);
});
 */
