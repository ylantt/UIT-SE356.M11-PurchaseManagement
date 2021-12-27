const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const providerRouter = require('./routes/providerRoute');

let app = express()

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use('/', providerRouter);

module.exports = app