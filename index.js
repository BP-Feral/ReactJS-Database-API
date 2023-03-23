require('dotenv').config()

const express = require('express')
const port = process.env.PORT || 3000
const app = express()
const mongoose = require('mongoose')

// connect to mongo
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization")
      next()
    })

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

// users router
const usersRouter = require('./routes/usersBase')
app.use('/v1/users', usersRouter)

// forms router
const formsRouter = require('./routes/formsBase')
app.use('/v1/forms', formsRouter)

// users manager
const usersRouterManager = require('./routes/usersManager')
app.use('/v1/users/get', usersRouterManager)

// forms manager
const formsRouterManager = require('./routes/formsManager')
app.use('/v1/forms/get', formsRouterManager)

// home page
app.use(express.static(__dirname + '/public'));
app.get("/", (req, res) => {
    //res.send("API is active!")
    res.render("home")
})

app.listen(port, () => console.log('Server Started on localhost:' + port))