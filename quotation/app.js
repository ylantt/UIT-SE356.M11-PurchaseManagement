const express = require('express')
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const path = require('path')
const bodyParser = require('body-parser')
const providerRouter = require('./routes/quotationRouter');

let app = express()
const oneDay = 1000 * 60 * 60 * 24;
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(sessions({
    secret: "secret-key",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
app.use('/', quotationRouter);

module.exports = app