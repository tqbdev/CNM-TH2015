const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const socketIO = require('socket.io') 
const http = require('http')

const {sequelize} = require('./models')
const config = require('./config/config')

const adminRoute = require('./routes/adminRoute')
const driverRoute = require('./routes/driverRoute')
const userRoute = require('./routes/userRoute')

const app = express()
const server = http.Server(app)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(cors())

app.use('/admin', adminRoute)
app.use('/driver', driverRoute)
app.use('/api/user',userRoute)

require('./passport')

const io = socketIO(server)

require('./sockets')(io)

sequelize.sync({force: false})
  .then(() => {
    server.listen(config.PORT)
    console.log(`Server started on port ${config.PORT}`)
  })

module.exports = app;
