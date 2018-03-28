express = require('express');
__root = __dirname;
_ = require('underscore');
path = require('path');
favicon = require('serve-favicon');
logger = require('morgan');
mongoose = require('mongoose');
cookieParser = require('cookie-parser');
bodyParser = require('body-parser');
moment = require('moment-timezone');
config = require('./config');
qs = require('qs');
bcrypt = require('bcrypt');
cryptoJs = require("crypto-js");
async = require('async');
multer  = require('multer');
fs = require('fs');
cors = require('cors');

var routes = require('./routes/index');
var users = require('./routes/users');
var finances = require('./routes/finance');
var account = require('./routes/account');
var admin = require('./routes/admin');
var product = require('./routes/product');
var app = express();

appModels = require('./app-models');
appHelpers = require('./app-helpers')
appControllers = require('./app-controllers');

__PUBLIC_AUTH = 0; // public user
__GUEST_AUTH = 100; // guest user
__USER_AUTH = 300; // uweser with subscribed services
__SALES_AUTH = 400; // management control over a pool of selected users
__INVENTORY_AUTH = 410; // management control over a pool of selected users
__FINANCE_AUTH = 420; // management control over a pool of selected users
__MANAGER_AUTH = 430; // management control over a pool of selected users
__ENTERPRISE_ADMIN_AUTH = 440; // enterprise management control over all users belonging to enterprise
__ENTERPRISE_SYS_ADMIN_AUTH = 450; // enterprise system management with higher CRUD control over all users belonging to enterprise
__ADMIN_AUTH = 490; // AST admin with all CRUD control over all users in the system
__SYS_ADMIN_AUTH = 500; // AST system management with highest of all CRUD control over all users in the system

console.log('Connecting to ' + config.mongo.host + ":" + 
            config.mongo.port + "/" + 
            config.mongo.db);

mainConn = mongoHelper.formatConnString(config.mongo);
mongodb = mongoose.connect(mainConn);

db = mongoose.connection;

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
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
app.use(function (req,res,next) {
  console.log('set cors header');
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, HEAD");
  res.setHeader("Access-Control-Allow-Headers", "X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Max-Age", "1728000");
  console.log(res.getHeaders());
  next();
});
*/
app.use('/', routes);
app.use('/users', users);
app.use('/finances', finances);
app.use('/accounts', account);
app.use('/admin', admin);
app.use('/products', product);

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
