const express = require('express')
const cookieParser = require('cookie-parser')
const sessions = require('express-session')
const path = require('path')
const bodyParser = require('body-parser')
const methodOverride = require('method-override') // use PUT, Delete,...
const orderRouter = require('./routers/receiptRoutes');

let app = express()

const oneDay = 1800 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisIsMySecretKeyOlalalala~~~",
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave: false
}))

// Parsing incoming data
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// serving public file
app.use(express.static(__dirname));
// Set up cookie parser
app.use(cookieParser());

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))


app.use(methodOverride('_method'))

app.use('/', orderRouter)

module.exports = app
