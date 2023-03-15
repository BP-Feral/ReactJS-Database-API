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

// users router
const usersRouter = require('./routes/users')
app.use('/v1/users', usersRouter)

// forms router
const formsRouter = require('./routes/forms')
app.use('/v1/forms', formsRouter)

// home page
app.get("/", (req, res) => {
    res.send("API is active!")
});

app.listen(port, () => console.log('Server Started on localhost:' + port))