var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

var indexRouter       = require('./routes/index');
var authRouter        = require('./routes/authenticationRouter');
var verifyAccessToken = require('./service/authenticationService');
var staffRouter       = require('./routes/staffRouter');
var customerRouter    = require('./routes/customerRouter');
var receiverRouter    = require('./routes/receiverRouter');

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
