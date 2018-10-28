var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

var indexRouter       = require('./routes/index');
var usersRouter       = require('./routes/users');
var authRouter        = require('./routes/authenticationController');
var verifyAccessToken = require('./repositories/authenticationRepository').verifyAccessToken;
var testRouter        = require('./routes/testController');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors());

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/',authRouter);
app.use('/test', verifyAccessToken, testRouter);

module.exports = app;
