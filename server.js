const express = require('express')
const cors = require('cors')
const connectToDB = require('./connectToDB')
const path = require('path')
require('dotenv').config()

const apiRoutes = require('./routes/apiRoutes.routes')
const app = express()

// Cross Origin Resource Sharing
app.use(cors())

// Body Parsing
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serving Static Files
app.use(express.static(path.join(__dirname,'public')))

// Setting up Routes
app.use('/api',apiRoutes);

// Setting EJS as View engine
app.set('view engine','ejs')

app.get('/', (req, res) => {
    res.render('home.ejs')
})
app.listen(process.env.PORT, (err) => {
    connectToDB(process.env.MONGODB_URL)
    if (err) throw Error(err)
    console.log(`☑️  Server Started on http://localhost:${process.env.PORT}`)
}) 