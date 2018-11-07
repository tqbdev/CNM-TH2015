const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const {sequelize} = require('./models')
const config = require('./config/config')

const adminRoute = require('./routes/adminRoute')
const driverRoute = require('./routes/driverRoute')

// var indexRouter       = require('./routes/index');
// var authRouter        = require('./routes/authenticationController');
// var verifyAccessToken = require('./repositories/authenticationRepository');
// var staffRouter       = require('./routes/staffController');
// var customerRouter    = require('./routes/customerController');
// var receiverRouter    = require('./routes/receiverController');

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(cors())

// app.use('/', indexRouter);
// app.use('/',authRouter);
// app.use('/staff', verifyAccessToken.verifyAccessToken, verifyAccessToken.roleStaff, staffRouter);
// app.use('/customer', verifyAccessToken.verifyAccessToken, verifyAccessToken.roleCustomer, customerRouter);
// app.use('/receiver', verifyAccessToken.verifyAccessToken, verifyAccessToken.roleReceiver, receiverRouter);
app.use('/admin', adminRoute)
app.use('/driver', driverRoute)

sequelize.sync({force: false})
  .then(() => {
    app.listen(config.PORT)
    console.log(`Server started on port ${config.PORT}`)
  })

module.exports = app;
