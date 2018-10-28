var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

var indexRouter       = require('./routes/index');
var authRouter        = require('./routes/authenticationController');
var verifyAccessToken = require('./repositories/authenticationRepository');
var staffRouter       = require('./routes/staffController');
var customerRouter    = require('./routes/customerController');
var receiverRouter    = require('./routes/receiverController');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors());

// app.use('/', indexRouter);
app.use('/',authRouter);
app.use('/staff', verifyAccessToken.verifyAccessToken, verifyAccessToken.roleStaff, staffRouter);
app.use('/customer', verifyAccessToken.verifyAccessToken, verifyAccessToken.roleCustomer, customerRouter);
app.use('/receiver', verifyAccessToken.verifyAccessToken, verifyAccessToken.roleReceiver, receiverRouter);

module.exports = app;
