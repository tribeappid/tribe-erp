var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');

var routes = require('./routes/index');
var users = require('./routes/users');
var finances = require('./routes/finance');
var account = require('./routes/account');
var app = express();

mongoose.connect('mongodb://' + 
    config.mongo.dbUser + ":" + 
    config.mongo.password + "@" + 
    config.mongo.host + ":" +
    config.mongo.port + "/" +
    config.mongo.db + 
    "?authSource=" + config.mongo.db);

var db = mongoose.connection;
//mongoose.Promise = global.Promise;    

// Set Log Level
//console.log(server_config.LOG_LEVEL);

console.log('Connecting to ' + config.mongo.host + ":" + 
            config.mongo.port + "/" + 
            config.mongo.db);

db.on('connected', function () {  
  console.log('Mongoose connected to ' + config.mongo.host);
});

db.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});

db.on('disconnected',function () {
  console.log('Mongoose disconnected');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/finances', finances);
app.use('/accounts', account);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
